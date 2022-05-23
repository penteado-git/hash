const cellElements = document.querySelectorAll("[data-cell]"); //Seleciona as celulas no html
const board = document.querySelector("[data-board]"); //Seleciona a classe data-board para colocar o X ou bolinha na celula
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  /*variavel de combinações de vitoria*/ [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

/*Exibe a mensagem do resultado*/
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Jogo empatou!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "Jogador Bolinha Venceu!"
      : "Jogador X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    //Verifica se é a vez do jogador bolinha ou X
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  //Ilustra a imagem da bolinha ou do x na celula
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  //Quando clica em uma celula muda para X ou Bolinha
  // Colocar a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  /* Verificar por vitória por meio da varial winningCOmbinations */
  const isWin = checkForWin(classToAdd);

  /* Verificar por empate */
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    /* Muda o simbolo com base no resultado */
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
