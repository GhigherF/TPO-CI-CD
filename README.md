# Лабораторная работа 11 — CI/CD с GitHub Actions

## Описание

Проект содержит простую веб-страницу с формой обратной связи, автоматизированные UI-тесты на Selenium и настройку CI/CD через GitHub Actions.

## Стек

- HTML, CSS, JavaScript
- Node.js
- Jest
- Selenium WebDriver
- GitHub Actions
- GitHub Pages

## Структура

```text
11/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── tests/
│   └── ui.test.js
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── package.json
└── README.md
```

## Запуск локально

```bash
npm install
npm start
```

В другом терминале:

```bash
npm test
```

## CI

Файл `.github/workflows/ci.yml` запускает Selenium-тесты при `push` в ветки `main`, `dev`, `fix`, а также при `pull_request` в `main` и `dev`.

## CD

Файл `.github/workflows/deploy.yml` запускается только при `push` в ветку `main`. Сначала выполняются тесты, и только после их успешного прохождения приложение публикуется на GitHub Pages.

## Проверка падения тестов

Чтобы убедиться, что CI работает, можно временно изменить текст кнопки `Отправить` в `public/index.html`, например на `Отправка`. Тест `form has required fields and submit button` должен завершиться ошибкой.
