# Projeto de Automação de Testes - Playwright

# 📋 Visão Geral

Este projeto contém uma suíte de testes automatizados desenvolvida com Playwright para validar dois sistemas críticos:

1. BookStore API - Sistema de gerenciamento de livraria digital
2. BugBank Digital - Internet banking com interface web

# ⚙️ Como Rodar

1. Clone o repositório

```bash
git clone <https://github.com/AllanyGabrielly/ProjetoQA.git>
cd <ProjetoQA>
```

2. Instale as dependências

```bash
npm install
```

3. Instale os browsers do Playwright

```bash
npx playwright install
```

# 📚 BookStore API

Base URL

```
https://bookstore.toolsqa.com
```

Cenários Implementados

1. Listar livros disponíveis - Valida retorno 200 e lista não vazia
2. Adicionar livro ao usuário - Fluxo completo: criar usuário → gerar token → adicionar livro
3. Verificar livros do usuário - Valida que livros foram corretamente associados
4. Remover livro do usuário - Remove livro e valida exclusão

Funções Auxiliares

· criarUsuarioEToken() - Cria usuário e gera token de autenticação
· pegarPrimeiroISBN() - Obtém primeiro ISBN disponível na livraria
· limparColecaoDoUsuario() - Remove todos os livros da coleção do usuário

# 🏦 BugBank Digital

URL da Aplicação

```
https://bugbank.netlify.app/
```

Cenários Implementados

1. Cadastro com sucesso e com saldo - Cria conta com saldo inicial de R$ 1.000,00
2. Login e validação de saldo inicial - Valida login e saldo correto
3. Tentativa de transferência para conta inexistente - Teste de fluxo de erro

Funções Auxiliares

· cadastrarComSaldo() - Cadastra novo usuário com conta saldo
· fazerLogin() - Realiza login na aplicação
· gerarEmailUnico() - Gera email único para evitar duplicidade

# ▶️ Executando os Testes

Executar todos os testes

```bash
npx playwright test
```

Executar testes específicos

```bash
# Apenas testes da API BookStore
npx playwright test tests/api/

# Apenas testes E2E do BugBank
npx playwright test tests/e2e/
```

Executar com interface gráfica

```bash
npx playwright test --ui
```

Executar em modo headed (com navegador visível)

```bash
npx playwright test --headed
```

Executar testes específicos por tag

```bash
npx playwright test --grep "Cadastro"
```
# Aplicação de Testes

Este projeto foi desenvolvido por:

- **Jefferson Lins**
- **Allany Gabrielly**
- **Maria Cláudia Florêncio**

