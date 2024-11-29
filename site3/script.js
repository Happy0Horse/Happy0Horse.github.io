const API_URL = "https://deckofcardsapi.com/api/deck/";
let deckId;
let playerScore = 0;
let computerScore = 0;
let playerCards = [];
let computerCards = [];
let playerName = "";

const playerNameDisplay = document.getElementById("player-name");
const playerCardsContainer = document.getElementById("player-cards");
const computerCardsContainer = document.getElementById("computer-cards");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const startGameButton = document.getElementById("start-game");
const hitButton = document.getElementById("hit");
const standButton = document.getElementById("stand");
const resultDisplay = document.getElementById("result");
const redirectButton = document.getElementById("redirect");

window.onload = () => {
  while (true) {
    playerName = prompt("Введіть ваше им'я (від 3 до 20 символів):", "Player");
    if (playerName && playerName.length >= 3 && playerName.length <= 20) {
      break;
    }
    alert("Им'я має бути від 3 до 20 символів!");
  }
  playerNameDisplay.textContent = `Вітаю, ${playerName}, зіграємо?`;
};

startGameButton.addEventListener("click", startGame);

async function startGame() {
  const response = await fetch(`${API_URL}new/shuffle/?deck_count=1`);
  const data = await response.json();
  deckId = data.deck_id;

  playerScore = 0;
  computerScore = 0;
  playerCards = [];
  computerCards = [];

  playerCardsContainer.innerHTML = "";
  computerCardsContainer.innerHTML = "";
  resultDisplay.textContent = "";

  playerScoreDisplay.textContent = "Score: 0";
  computerScoreDisplay.textContent = "Score: 0";

  hitButton.disabled = false;
  standButton.disabled = false;

  drawCard("player");
  drawCard("computer");
}

async function drawCard(target) {
  const response = await fetch(`${API_URL}${deckId}/draw/?count=1`);
  const data = await response.json();
  const card = data.cards[0];

  const cardImg = document.createElement("img");
  cardImg.src = card.image;
  cardImg.classList.add("card");

  if (target === "player") {
    playerCards.push(card);
    playerCardsContainer.appendChild(cardImg);
    playerScore = calculateScore(playerCards);
    playerScoreDisplay.textContent = `Score: ${playerScore}`;
    if (playerScore > 21) endGame("Computer wins!");
  } else {
    computerCards.push(card);
    computerCardsContainer.appendChild(cardImg);
    computerScore = calculateScore(computerCards);
    computerScoreDisplay.textContent = `Score: ${computerScore}`;
  }
}

function calculateScore(cards) {
  let score = 0;
  let aces = 0;

  cards.forEach((card) => {
    if (card.value === "ACE") {
      aces += 1;
      score += 11;
    } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  });

  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
}

hitButton.addEventListener("click", () => drawCard("player"));

standButton.addEventListener("click", async () => {
  hitButton.disabled = true;
  standButton.disabled = true;

  while (computerScore < 17) {
    await drawCard("computer");
  }

  if (computerScore > 21 || playerScore > computerScore) {
    endGame(`${playerName} wins!`);
  } else if (computerScore === playerScore) {
    endGame("It's a tie!");
  } else {
    endGame("Computer wins!");
  }
});

function endGame(result) {
  resultDisplay.textContent = result;
  hitButton.disabled = true;
  standButton.disabled = true;
}

redirectButton.addEventListener("click", () => {
  window.location.href = "https://happy0horse.github.io";
});
