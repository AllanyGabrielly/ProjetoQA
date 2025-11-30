# Projeto Final – Qualidade de Software (2025.2)
## Faculdade Alpha do Recife

**Autores:** Jefferson lins, Allany Gabrielly, Maria Cláudia
**Turma:** 2025.2
**Disciplina:** Qualidade de Software
**Professor(a):** Tarciana Katter

### Finalidade do projeto
Este repositório contém os dois projetos práticos finais entregues para a disciplina de Qualidade de Software:

1. **Testes de API REST** – Bookstore API[](https://bookstore.demoqa.com)
   Cobertura dos 4 cenários obrigatórios: Listar livros → Adicionar livro → Verificar coleção → Remover livro.

2. **Testes End-to-End (E2E)** – BugBank[](https://bugbank.netlify.app)
   Cobertura dos 3 cenários obrigatórios do desafio oficial: Cadastro com saldo → Login e validação de saldo → Transferência para conta inexistente.

Ambos os conjuntos de testes foram desenvolvidos com **Playwright Test** (versão mais recente em 2025) seguindo rigorosamente os critérios de avaliação da disciplina;

### Tecnologias utilizadas
- Node.js ≥ 18
- Playwright Test (versão mais recente)
- JavaScript (sem TypeScript para manter compatibilidade com a estrutura da disciplina)

### Estrutura do repositório

├── api-bookstore/
│   └── tests/
│       └── bookstore.spec.js          ← Testes de API (4 cenários)
├── e2e-bugbank/
│   └── tests/
│       └── bugbank.spec.js            ← Testes E2E (3 cenários)
├── playwright.config.js               ← Configuração global (compartilhada)
├── package.json
└── README.md

### Como instalar e executar (passo a passo completo)

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/projeto-final-qualidade-software.git
cd projeto-final-qualidade-software

2. Instale as dependências

Bashnpm install

3. Instale os navegadores do Playwright (executar apenas uma vez)

Bashnpx playwright install

4. Execute os testes

5. Todos os testes de uma vez
Bashnpx playwright test

6. Apenas testes de API
Bashnpx playwright test bookstore-api

7. Apenas testes do BugBank

Bashnpx playwright test bugbank-e2e

8. Modo headed (ver o navegador aberto)

Bashnpx playwright test --headed

9. Gerar e abrir relatório HTML bonito

Bashnpx playwright test && npx playwright show-report