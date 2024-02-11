let playerBoards = {
  player1: [],
  player2: [],
  player3: [],
  player4: [],
};

let ArrayGlobal = createBingoArray();
let selectedNumnbers = [];
function iniciarBingo() {
  const startButton = document.getElementById("startButton");
  startButton.style.display = "none";
  const boardSizeSection = document.querySelector(".board-size");
  boardSizeSection.style.display = "block";
}

let player1Title = document.querySelectorAll(".player1-title");
let player2Title = document.querySelectorAll(".player2-title");
let player3Title = document.querySelectorAll(".player3-title");
let player4Title = document.querySelectorAll(".player4-title");
let player1Input;
let player2input;

// startButton.addEventListener('click', iniciarBingo);

function selectBoardSize(size) {
  let bingoContainer = document.querySelector(".bingo-container-init");
  bingoContainer.style.display = "none";
  createTable(1, size);
  createTable(2, size);
  createTable(3, size);
  createTable(4, size);
}

function createTable(playerId, size) {
  playerBoards["player" + playerId] = [...Array(size)].map(() =>
    [...Array(size)].map(() => null)
  ); // [ [null, null, null, null] <-- size ]
  const table = document.getElementById("tablePlayer" + playerId);
  const bingoArray = createBingoArray();
  const rows = [...Array(size)].map(() => {
    const row = document.createElement("tr");
    table.appendChild(row);
    return row;
  }); // Create rows and append to table
  rows.map((row, i) => {
    [...Array(size)].map((_, j) => {
      let cell = document.createElement("td");
      const selectedNumber = pickRandomFromBingoArray(bingoArray);
      cell.innerHTML = selectedNumber; // <td>{selecterNumber}</td>
      playerBoards["player" + playerId][i][j] = selectedNumber; // Insert selected number row (i) cell (j)
      row.appendChild(cell);
    });
  });
}

// function createRows(size) {
//   let rows = []
//   for(let i = 0; i < size; i++) {
//     rows.push(document.createElement('tr'))
//   }
//   return rows;
// }

function pickRandomFromBingoArray(array) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // Random beetween 0 and 1 * ( max number - min number) + minNumber;
  const randomElement = Math.floor(Math.random() * (array.length - 1) + 1);
  const selectedNumber = array.splice(randomElement, 1)[0]; // splice return array of deleted elements
  return selectedNumber;
}

function generateNumber() {
  let number = pickRandomFromBingoArray(ArrayGlobal);
  // 1. Marcar el numero en el carton del jugador (si existe) 
  // 2. Calcular puntajes 
  return number;
}

function calculateScores() {
  const size = playerBoards.player1.length; 
}

function createBingoArray() {
  return [...Array(50)].map((ele, index) => index + 1); // Crea un array con 50 numeros;
}

function restart() {
  ArrayGlobal = createBingoArray();
}
