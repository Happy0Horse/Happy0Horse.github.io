function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function startGame() {
    let playerName = prompt("Введіть ваше ім'я:");
    
    const minLength = 3;
    const maxLength = 20;

    while (playerName === null || playerName.length < minLength || playerName.length > maxLength) {
        alert(`Ім'я повинно бути від ${minLength} до ${maxLength} символів.`);
        playerName = prompt("Введіть ваше ім'я:");
    }

    document.getElementById("player-name").textContent = playerName;

    let playerScore = 0;
    let computerScore = 0;

    const maxWins = 3;

    const resultDisplay = document.getElementById("result");
    const playerScoreDisplay = document.getElementById("player-score-circle");
    const computerScoreDisplay = document.getElementById("computer-score-circle");

    const playerRoundScoreDisplay = document.getElementById("player-round-score");
    const computerRoundScoreDisplay = document.getElementById("computer-round-score");

    function updateScores() {
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
    }

    function playRound() {
        const playerNumber = generateRandomNumber();
        const computerNumber = generateRandomNumber();

        let roundResult = "";

        if (playerNumber > computerNumber) {
            playerScore++;
            roundResult = `Ви виграли цей раунд! (${playerNumber} > ${computerNumber})`;
        } else if (computerNumber > playerNumber) {
            computerScore++;
            roundResult = `Комп'ютер виграв цей раунд! (${computerNumber} > ${playerNumber})`;
        } else {
            roundResult = `Нічия! (${playerNumber} = ${computerNumber})`;
        }

        updateScores();
        resultDisplay.textContent = roundResult;

        playerRoundScoreDisplay.textContent = playerNumber;
        computerRoundScoreDisplay.textContent = computerNumber;

        if (playerScore === maxWins) {
            resultDisplay.textContent = `${playerName} виграв гру!`;
            disableGame();
        } else if (computerScore === maxWins) {
            resultDisplay.textContent = `Комп'ютер виграв гру!`;
            disableGame();
        }
    }

    function disableGame() {
        document.getElementById("start-button").disabled = true;
        document.getElementById("restart-button").style.display = 'block'; // Показать кнопку перезапуска
    }

    function restartGame() {
        playerScore = 0;
        computerScore = 0;
        resultDisplay.textContent = "";
        playerRoundScoreDisplay.textContent = "0";
        computerRoundScoreDisplay.textContent = "0";
        updateScores();
        document.getElementById("start-button").disabled = false;
        document.getElementById("restart-button").style.display = 'none'; // Скрыть кнопку перезапуска
    }

    function redirectToAnotherPage() {
        window.location.href = "https://happy0horse.github.io";
    }

    document.getElementById("start-button").addEventListener("click", playRound);
    document.getElementById("restart-button").addEventListener("click", restartGame);
    document.getElementById("redirect-button").addEventListener("click", redirectToAnotherPage);
}

startGame();
