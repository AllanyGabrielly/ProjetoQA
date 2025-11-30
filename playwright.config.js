// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40_000,                    // um pouco mais de tempo pro BugBank carregar
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['html', { open: 'never' }], ['list']],

  // Configurações globais
  use: {
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  projects: [
    // BUGBANK NO CHROMIUM — O ÚNICO QUE VOCÊ PRECISA AGORA
    {
      name: 'chromium',
      testMatch: /e2e\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://bugbank.netlify.app',
        headless: false,                    // você vê tudo acontecendo
        slowMo: 400,                        // dá tempo de ver cada passo
        video: 'on',                        // grava tudo (útil pra entrega)
        screenshot: 'on',
        launchOptions: {
          args: ['--start-maximized']
        },
      },
    },

    // Mantive só por organização (pode deletar depois se quiser)
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.js/,
      use: {
        baseURL: 'https://bookstore.toolsqa.com',
      },
    },
  ],
});