# Projeto Final – Qualidade de Software (2025.2)  
Faculdade Alpha do Recife

**Autores:** Jefferson lins, Allany Gbrielly, Maria Claudia.
**Turma:** 2025.2
**Disciplina:** Qualidade de Software  
**Professor(a):** Tarciana Katter

### Objetivo do projeto

1. Testes de API REST – Bookstore (DemoQA) – 4 cenários obrigatórios  
2. Testes End-to-End – BugBank – 3 cenários oficiais do desafio

### Tecnologias utilizadas
- Node.js ≥ 18
- Playwright Test (última versão estável de 2025)
- JavaScript puro (sem TypeScript)

### Estrutura do repositório

projeto-final-qualidade-software/
├── bookstore-api/
│   └── tests/
│       └── bookstore.spec.js          ← 4 cenários de API (100% independentes)
├── bugbank-e2e/
│   └── tests/
│       └── bugbank.spec.js            ← 3 cenários E2E (100% DRY e independentes)
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md                              ← este arquivo

### Como instalar e executar (passo a passo completo)

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/projeto-final-qualidade-software.git
cd projeto-final-qualidade-software

Instale as dependências

Bashnpm install

Instale os navegadores do Playwright (executar apenas uma vez)

Bashnpx playwright install

Execute os testes

Todos os testes de uma vez
Bashnpx playwright test
Apenas testes de API
Bashnpx playwright test bookstore-api
Apenas testes do BugBank
Bashnpx playwright test bugbank-e2e
Modo headed (ver o navegador aberto)
Bashnpx playwright test --headed
Gerar e abrir relatório HTML bonito
Bashnpx playwright test && npx playwright show-report