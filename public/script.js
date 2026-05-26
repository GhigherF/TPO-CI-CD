const form = document.getElementById('feedback-form');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  result.className = 'result';

  if (!name || !email || !message) {
    result.textContent = 'Заполните все поля формы.';
    result.classList.add('error');
    return;
  }

  result.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
  result.classList.add('success');
  form.reset();
});
