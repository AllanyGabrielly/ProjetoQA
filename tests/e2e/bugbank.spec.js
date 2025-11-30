// tests/e2e/bugbank.spec.js
import { test, expect } from '@playwright/test';

const PASSWORD = '123456';
const NOME = 'Letícia Luz';

function gerarEmailUnico() {
    return `leticia_${Date.now()}_${Math.floor(Math.random() * 9999)}@bugbank.com`;
}

// ========================================================
// FUNÇÃO AUXILIAR REUTILIZÁVEL – CADASTRO COM SALDO
// ========================================================
async function cadastrarComSaldo(page) {
    await page.goto('https://bugbank.netlify.app');

    await page.getByRole('button', { name: 'Registrar' }).click();

    const email = gerarEmailUnico();

    // Seletores robustos (não depende de ordem)
    await page.getByPlaceholder('E-mail').nth(1).fill(email);           // campo do formulário de registro
    await page.getByPlaceholder('Informe seu Nome').fill(NOME);
    await page.getByPlaceholder('Informe sua senha', { exact: true }).fill(PASSWORD);
    await page.getByPlaceholder('Confirme a senha').fill(PASSWORD);

    // Bug conhecido: só funciona clicando no texto
    await page.getByText('Criar conta com saldo').click();

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    // Valida modal de sucesso
    await expect(page.getByTestId('modalText')).toContainText('sucesso', { timeout: 15000 });
    await expect(page.getByTestId('modalText')).toContainText('criada com sucesso');

    const accountNumber = await page.getByTestId('modalText').innerText();
    const numeroConta = accountNumber.match(/(\d{4,}-\d)/)?.[1] || 'conta-criada';

    await page.getByRole('button', { name: 'Fechar' }).click();

    return { email, numeroConta };
}

// ========================================================
// FUNÇÃO AUXILIAR – LOGIN
// ========================================================
async function fazerLogin(page, email) {
    await page.getByPlaceholder('Informe seu e-mail').first().fill(email);
    await page.getByPlaceholder('Informe sua senha').first().fill(PASSWORD);
    await page.getByRole('button', { name: 'Acessar' }).click({ force: true });

    await expect(page.getByTestId('btnCloseModal')).toBeHidden({ timeout: 10000 });
}

// ========================================================
// TESTES LIMPOS E INDEPENDENTES
// ========================================================
test.describe('BugBank – Desafio Oficial (3 cenários obrigatórios)', () => {

    test('1 - Cadastro com sucesso e com saldo', async ({ page }) => {
        const { email, numeroConta } = await cadastrarComSaldo(page);

        // Faz login com a conta recém-criada
        await fazerLogin(page, email);

        await expect(page.getByTestId('texto-nome')).toHaveText(NOME);
        const saldoTexto = await page.getByTestId('texto-saldo').innerText();
        const saldo = Number(saldoTexto.replace(/\D/g, ''));
        expect(saldo).toBe(100000); // R$ 1.000,00 → 100000 centavos
    });

    test('2 - Login e validação de saldo inicial', async ({ page }) => {
        const { email } = await cadastrarComSaldo(page);
        await fazerLogin(page, email);

        await expect(page.getByTestId('texto-nome')).toHaveText(NOME);
        await expect(page.getByTestId('texto-saldo')).toContainText('1.000');
    });

    test('3 - Tentativa de transferência para conta inexistente', async ({ page }) => {
        const { email } = await cadastrarComSaldo(page);
        await fazerLogin(page, email);

        // Abre transferência
        await page.getByRole('button', { name: /transferência/i }).click();

        await page.getByPlaceholder('Número da conta').fill('999999');
        await page.getByPlaceholder('Dígito').fill('9');
        await page.getByPlaceholder('Valor da transferência').fill('100');
        await page.getByPlaceholder('Descrição').fill('conta inexistente');

        await page.getByRole('button', { name: 'Transferir' }).click({ force: true });

        await expect(page.getByTestId('modalText')).toContainText(/não encontrada|inválida|erro/i, { timeout: 15000 });
        await page.getByRole('button', { name: 'Fechar' }).click();

        // Saldo permanece o mesmo
        await expect(page.getByTestId('texto-saldo')).toContainText('1.000');
    });

});