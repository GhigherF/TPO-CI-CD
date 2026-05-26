const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const APP_URL = process.env.APP_URL || 'http://127.0.0.1:3000';

jest.setTimeout(60000);

let driver;

beforeAll(async () => {
  const options = new chrome.Options();
  options.addArguments('--headless=new');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1280,720');

  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
});

afterAll(async () => {
  if (driver) {
    await driver.quit();
  }
});

describe('UI tests for feedback form', () => {
  beforeEach(async () => {
    await driver.get(APP_URL);
  });

  test('page title is displayed', async () => {
    const title = await driver.findElement(By.id('page-title')).getText();
    expect(title).toBe('Форма обратной связи');
  });

  test('form has required fields and submit button', async () => {
    const name = await driver.findElement(By.id('name'));
    const email = await driver.findElement(By.id('email'));
    const message = await driver.findElement(By.id('message'));
    const button = await driver.findElement(By.id('submit-button'));

    expect(await name.getAttribute('required')).toBe('true');
    expect(await email.getAttribute('type')).toBe('email');
    expect(await message.getAttribute('required')).toBe('true');
    expect(await button.getText()).toBe('Отправить');
  });

  test('successful form submission shows success message', async () => {
    await driver.findElement(By.id('name')).sendKeys('Иван');
    await driver.findElement(By.id('email')).sendKeys('ivan@example.com');
    await driver.findElement(By.id('message')).sendKeys('Тестовое сообщение');
    await driver.findElement(By.id('submit-button')).click();

    const result = await driver.wait(until.elementLocated(By.id('result')), 3000);
    await driver.wait(async () => (await result.getText()).includes('Спасибо, Иван!'), 3000);

    expect(await result.getText()).toBe('Спасибо, Иван! Сообщение отправлено.');
    expect(await result.getAttribute('class')).toContain('success');
  });

  test('HTML5 validation blocks invalid email', async () => {
    await driver.findElement(By.id('name')).sendKeys('Иван');
    await driver.findElement(By.id('email')).sendKeys('invalid-email');
    await driver.findElement(By.id('message')).sendKeys('Тестовое сообщение');
    await driver.findElement(By.id('submit-button')).click();

    const email = await driver.findElement(By.id('email'));
    const isValid = await driver.executeScript('return arguments[0].checkValidity();', email);
    const resultText = await driver.findElement(By.id('result')).getText();

    expect(isValid).toBe(false);
    expect(resultText).toBe('');
  });
});
