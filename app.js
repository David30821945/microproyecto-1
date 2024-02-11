// Globals
let playerBoards = {
  player1: [],
  player2: [],
  player3: [],
  player4: [],
};
let playerScores = {
  player1: 0,
  player2: 0,
  player3: 0,
  player4: 0,
};
let winScore = JSON.parse(localStorage.getItem("winScore"));

let ArrayGlobal = createBingoArray();
let selectedNumbers = [];


// ========================================

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
  let bingoGame = document.querySelector(".bingo-game");
  bingoContainer.style.display = "none";
  bingoGame.style.display = "block";

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
  selectedNumnbers.push(number);
  calculateScores();
  document.getElementById('selectedNumbers').innerHTML = selectedNumbers.toString();
  document.getElementById('turnCount').innerHTML = selectedNumbers.length;
}

function calculateScores() {
  let score = 0;
  let scorediagonal = 0;

  const size = playerBoards.player1.length;
  let rows =[];
  let columns = [];
  let diagonal1 = [];
  let diagonal2 = [];
  playerBoards.player1[0];
  for (let i = 0; i < size; i++) {
    diagonal1 = playerBoards.player1[i][i];
    diagonal2 = playerBoards.player1[i][size - 1 - i];
    rows.push(playerBoards.player1[i]); // | 1 , 2 , 3| | 4, 5, 6 | | 7, 8, 9 |
    for (let j = 0; j < size; j++) {
      columns[i] = [];
      columns[i].push(playerBoards.player1[j][i]);
    }
  }
  playerScores.player1 = 0;
  // Lineas
  rows.forEach((row) => {
    const hasLine = row.every((cell) => selectedNumbers.includes(cell)) // Every: si todos los elementos cumplen con la condicion devuelve true, sino false
    if(hasLine) playerScores.player1 += 1;
  });

  // Columnas
  columns.forEach((row) => {
    const hasLine = row.every((cell) => selectedNumbers.includes(cell));
    if(hasLine) playerScores.player1 += 1;
  });

  // Size * 2 Lleno todas las rows y todas las lineas.
  if(playerScores.player1 === (size * 2)){
    victoriaJugador(1);
  }

  // Diagonals
  [diagonal1, diagonal2].forEach((row) => {
    const hasLine = row.every((cell) => selectedNumbers.includes(cell));
    if(hasLine) playerScores.player1 += 3;
  });

}

function createBingoArray() {
  return [...Array(50)].map((ele, index) => index + 1); // Crea un array con 50 numeros;
}

function restart() {
  ArrayGlobal = createBingoArray();
}

function victoriaJugador(playerNumber) {
  const scores = JSON.parse(localStorage.getItem("winScore"));
  const playerId = document.getElementById('player' + playerNumber + 'Name').value;
  if(!scores[playerId]){
    scores[playerId] = 0;
  }
  scores[playerId] += 1;
  localStorage.setItem("winScore", JSON.stringify(scores));
  restart();
}
