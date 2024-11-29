const answers = [
    "Підтверджую", "Хибне рішення", "Під великим питанням", "Спробуйте ще раз",
    "Присутня ймовірність", "Рішення виглядає сумнівним", "Залишайтеся спокійними",
    "Підтверджено корпоративними інструкціями", "Маю чітке підтвердження", "Слід відкласти"
];

const container = document.createElement('div');
container.id = 'container';

const questionInput = document.createElement('input');
questionInput.type = 'text';
questionInput.id = 'question';
questionInput.placeholder = 'Введіть ваше запитання';
container.appendChild(questionInput);

const magicBall = document.createElement('div');
magicBall.id = 'magic-ball';

const answerDiv = document.createElement('div');
answerDiv.id = 'answer';
answerDiv.textContent = 'Питайте';
magicBall.appendChild(answerDiv);
container.appendChild(magicBall);

const askButton = document.createElement('button');
askButton.id = 'ask-button';
askButton.textContent = 'Задати питання';
container.appendChild(askButton);

document.body.appendChild(container);

askButton.addEventListener("click", () => {
        const question = questionInput.value.trim();

        if (question.length < 5) {
            answer.textContent = "Ваше питання занадто коротке";
            answer.style.color = "orange";
            return;
        }

        if (!question.endsWith("?")) {
            answer.textContent = "Ваше питання повинно закінчуватись знаком питання";
            answer.style.color = "orange";
            return;
        }

        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        answer.textContent = randomAnswer;
        answer.style.color = "#0ff";
	});
	
const redirectButton = document.createElement("button");
    redirectButton.id = "redirect-button";
    redirectButton.textContent = "Повернутися";
    container.appendChild(redirectButton);

    redirectButton.addEventListener("click", () => {
        window.location.href = "https://happy0horse.github.io";
    });