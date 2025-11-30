import { test, expect } from '@playwright/test';

// ======================================================
// FUNÇÕES AUXILIARES — tudo reutilizável e DRY
// ======================================================
async function criarUsuarioEToken(request) {
    const userName = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const password = 'Senha123!';

    // 1) Criar usuário
    const createRes = await request.post('/Account/v1/User', {
        data: { userName, password }
    });
    expect(createRes.status()).toBe(201);
    const { userID } = await createRes.json();

    // 2) Gerar token
    const tokenRes = await request.post('/Account/v1/GenerateToken', {
        data: { userName, password }
    });
    expect(tokenRes.ok()).toBeTruthy();
    const { token } = await tokenRes.json();

    return { userId: userID, token, userName, password };
}

async function pegarPrimeiroISBN(request) {
    const booksRes = await request.get('/BookStore/v1/Books');
    expect(booksRes.ok()).toBeTruthy();
    const { books } = await booksRes.json();
    expect(books.length).toBeGreaterThan(0);
    return books[0].isbn;
}

async function limparColecaoDoUsuario(request, userId, token) {
    const userRes = await request.get(`/Account/v1/User/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!userRes.ok()) return; // usuário já foi deletado ou algo deu errado

    const { books } = await userRes.json();
    for (const book of books) {
        await request.delete('/BookStore/v1/Book', {
            headers: { Authorization: `Bearer ${token}` },
            data: { userId, isbn: book.isbn }
        });
    }
}

// ======================================================
// TESTES TOTALMENTE INDEPENDENTES
// ======================================================
test.describe('Bookstore API - Cenários Obrigatórios', () => {

    test('Listar livros disponíveis', async ({ request }) => {
        const response = await request.get('/BookStore/v1/Books');
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(Array.isArray(body.books)).toBeTruthy();
        expect(body.books.length).toBeGreaterThan(0);
    });

    test('Adicionar livro ao usuário', async ({ request }) => {
        const { userId, token } = await criarUsuarioEToken(request);
        const isbn = await pegarPrimeiroISBN(request);

        const addRes = await request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${token}` },
            data: { userId, collectionOfIsbns: [{ isbn }] }
        });

        expect(addRes.ok()).toBeTruthy();
        const result = await addRes.json();
        expect(result.books).toBeDefined();
    });

    test('Verificar livros do usuário', async ({ request }) => {
        const { userId, token } = await criarUsuarioEToken(request);
        const isbn = await pegarPrimeiroISBN(request);

        // adiciona um livro primeiro
        await request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${token}` },
            data: { userId, collectionOfIsbns: [{ isbn }] }
        });

        // agora verifica
        const res = await request.get(`/Account/v1/User/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        expect(res.ok()).toBeTruthy();
        const userData = await res.json();

        expect(userData).toHaveProperty('username');
        expect(userData).toHaveProperty('books');
        expect(Array.isArray(userData.books)).toBeTruthy();
        expect(userData.books.length).toBeGreaterThan(0);
        expect(userData.books.some(book => book.isbn === isbn)).toBeTruthy();
    });

    test('Remover livro do usuário', async ({ request }) => {
        const { userId, token } = await criarUsuarioEToken(request);
        const isbn = await pegarPrimeiroISBN(request);

        // adiciona o livro
        await request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${token}` },
            data: { userId, collectionOfIsbns: [{ isbn }] }
        });

        // remove o livro
        const delRes = await request.delete('/BookStore/v1/Book', {
            headers: { Authorization: `Bearer ${token}` },
            data: { userId, isbn }
        });

        expect(delRes.ok()).toBeTruthy(); // 204 No Content é ok

        // verifica que foi removido
        const userRes = await request.get(`/Account/v1/User/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const { books } = await userRes.json();
        expect(books.some(book => book.isbn === isbn)).toBeFalsy();
    });

    // Opcional: limpa tudo no final (bom para não poluir a base entre runs)
    test.afterAll(async ({ request }) => {
        // Se quiser deletar os usuários criados, pode adicionar aqui
        // (a API não tem endpoint de delete user delete, então não tem problema deixar)
    });
});