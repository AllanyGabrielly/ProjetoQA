# Playwright BugBank & Bookstore Tests

Este projeto contém testes automatizados para o BugBank (aplicação web) e Bookstore API, utilizando Playwright.

# 🚀 Instalação e Execução

1. Instalar dependências

npm install


2. Instalar os browsers do Playwright

npx playwright install


3. Executar os testes

Testes E2E do BugBank:

npx playwright test chromium


Testes de API da Bookstore:

npx playwright test api


Executar todos os testes:

npx playwright test

Executar em modo headed (com navegador visível):

npx playwright test --headed


# 🧪 Testes Implementados

BugBank (https://bugbank.netlify.app)

· ✅ Cadastro com sucesso e com saldo
· ✅ Login e validação de saldo inicial
· ✅ Tentativa de transferência para conta inexistente

Bookstore API (https://bookstore.toolsqa.com)

· ✅ Listar livros disponíveis
· ✅ Adicionar livro ao usuário
· ✅ Verificar livros do usuário
· ✅ Remover livro do usuário

# ⚙️ Configuração

O projeto está configurado para:

· Timeout de 40 segundos para testes
· Modo headed para visualização dos testes
· Slow motion (400ms) para acompanhar os passos
· Gravação de vídeo e screenshots em falhas
· Relatórios HTML e list

# 🛠 Dependências

· @playwright/test: Framework de testes
· uuid: Geração de IDs únicos
· @types/node: Tipos TypeScript para Node.js

# 📝 Notas

· Os testes do BugBank são executados em Chromium com navegador visível
· Os testes criam usuários com emails únicos automaticamente
· As credenciais padrão utilizadas são: senha 123456
