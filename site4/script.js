const images = [
  'cherry.png',
  'lemon.png',
  'seven.png',
  'grape.png',
  'diamond.png',
];

const maxSpins = 3;
let spinsLeft = maxSpins;
let playerName = "";

const playerNameDisplay = document.getElementById("player-name");
const spinButton = document.getElementById("spin-button");
const resultDisplay = document.getElementById("result");
const rows = [document.getElementById("row1"), document.getElementById("row2"), document.getElementById("row3")];
const attemptDisplay = document.getElementById("attempts");
const resetButton = document.getElementById("reset-button");
const goToSiteButton = document.getElementById("redirect-button");

window.onload = () => {
  while (true) {
    playerName = prompt("Введіть ваше ім'я (від 3 до 20 символів):", "Player");
    if (playerName && playerName.length >= 3 && playerName.length <= 20) {
      break;
    }
    alert("Ім'я має бути від 3 до 20 символів!");
  }
  playerNameDisplay.textContent = `Ласкаво просимо, ${playerName}!`;
  renderRandomSlot();
  updateAttempts();
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getUniqueRowImages() {
  const shuffledImages = shuffle([...images]);
  return shuffledImages.slice(0, 3);
}

function renderRandomSlot() {
  const rowImages = [getUniqueRowImages(), getUniqueRowImages(), getUniqueRowImages()];
  
  rows.forEach((row, i) => {
    row.innerHTML = "";

    rowImages[i].forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = `images/${image}`;
      row.appendChild(imgElement);
    });
  });
}


function updateAttempts() {
  attemptDisplay.textContent = `Залишилось спроб: ${spinsLeft}`;
}

spinButton.addEventListener("click", () => {
  if (spinsLeft <= 0) {
    resultDisplay.textContent = "Гра закінчена. Спробуйте ще раз!";
    spinButton.disabled = true;
    return;
  }

  resultDisplay.textContent = "";
  spinsLeft--;
  updateAttempts();

  renderRandomSlot();

  let win = false;
  for (let i = 0; i < 3; i++) {
        const img1 = rows[0].children[i].src;
        const img2 = rows[1].children[i].src;
        const img3 = rows[2].children[i].src;

        if (img1 === img2 && img2 === img3) {
            win = true;
            break;
        }
    }

  if (win) {
    resultDisplay.textContent = `Вітаємо, ${playerName}! Ви виграли!`;
    spinButton.disabled = true;
  } else if (spinsLeft === 0) {
    resultDisplay.textContent = "Нажаль, ви програли!";
    spinButton.disabled = true;
  }
});

resetButton.addEventListener("click", () => {
  spinsLeft = maxSpins;
  updateAttempts();
  resultDisplay.textContent = "";
  spinButton.disabled = false;
  renderRandomSlot();
});

goToSiteButton.addEventListener("click", () => {
  window.location.href = "https://happy0horse.github.io";
});
