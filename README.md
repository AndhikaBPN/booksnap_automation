# Playwright Automation Testing (TypeScript)

End-to-end (E2E) automation testing using **Playwright + TypeScript** with Page Object Model, environment-based configuration, and modern reporting.

---

## 🚀 Tech Stack

* Playwright
* TypeScript
* Node.js
* dotenv
* HTML Report (default)
* Allure Report (optional)

---

## 📁 Project Structure

```
.
├── pages/          # Page Object Model
├── tests/          # Test specs
├── utils/          # Helpers (random data, OTP, etc)
├── playwright.config.ts
├── tsconfig.json
├── .env.example
└── README.md
```

---

## ⚙️ Setup

```bash
npm install
npx playwright install
```

Create `.env` from `.env.example`:

```env
BASE_URL=https://stg.example.com
USER_EMAIL=test@example.com
USER_PASSWORD=Password123
USE_ALLURE=false
CI=false
RUN_TEST=file_name
```

---

## ▶️ Run Tests

Run all tests:

```bash
npx playwright test
```

Run single test:

```bash
npx playwright test tests/login.spec.ts
```

Run by name/tag:

```bash
npx playwright test --grep "login"
```

---

## 🔁 Retry Strategy

```ts
retries: process.env.CI ? 2 : 0
```

* Local: fail fast
* CI: retry flaky tests

---

## 🧩 Key Features

* Page Object Model (POM)
* Environment-based config
* Stable locator strategy
* OTP input handling
* Screenshot, video & trace on failure

---

## 📸 Debug & Artifacts

* Screenshot: on failure
* Video: retained on failure
* Trace: on first retry

Artifacts stored in `test-results/`.

---

## 📊 Reporting

HTML Report:

```bash
npx playwright show-report
```

Allure (optional):

```bash
USE_ALLURE=true 
npx playwright test
npx allure generate ./allure-results --clean
npx allure open
```

Generate Allure Report HTML File:

```bash
allure generate allure-results --clean --single-file
```

---

## 🚫 Out of Scope

* Reading real email inbox for OTP
* Third-party email UI automation

---

## 👤 Author

QA Automation Engineer