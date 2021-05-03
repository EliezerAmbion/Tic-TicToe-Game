gameDesign = {
  boardSize: {
    width: 3,
    height: 3,
  },
  players: {
    player1: 'X',
    player2: 'O',
  },
  clicks: 0,
  gameIsLive: true,
};

let board = new Array();
let history = [];

let boardTable = document.querySelector('.board-grid');
let rowsAndColumns = '';

for (let row = 0; row < gameDesign.boardSize.height; row++) {
  board.push(new Array());
  rowsAndColumns += '<tr>';
  for (let column = 0; column < gameDesign.boardSize.width; column++) {
    board[row].push(new Array());
    rowsAndColumns += `<td id='box-${row}-${column}'></td>`;
  }
  rowsAndColumns += '</tr>';
}

boardTable.innerHTML = rowsAndColumns;

const boxClicked = function (elem) {
  if (gameDesign.gameIsLive) {
    let elementID = elem.target.id;
    let indexes = elementID.split('-').slice(1);
    console.log(history);

    if (board[indexes[0]][indexes[1]].length === 0) {
      gameDesign.clicks += 1;

      let lastPlayer =
        gameDesign.clicks > 0 && gameDesign.clicks % 2 === 0
          ? 'player2'
          : 'player1';
      board[indexes[0]][indexes[1]] = gameDesign.players[lastPlayer];
      document.getElementById(elementID).innerHTML =
        gameDesign.players[lastPlayer];

      if (history.length > 0) history[history.length - 1].presentState = false;

      history.push({
        boxCoordinates: indexes,
        player: lastPlayer,
        input: gameDesign.players[lastPlayer],
        presentState: true,
      });
      let winnerChecker = checkWinner(indexes, lastPlayer);
    }
  }
};

function checkWinner(indexes, player) {
  // player argument value is either 'player1' or 'player2'
  console.log(indexes);
  let checkFor = gameDesign.players[player]; // checkFor value is either 'X' or 'O'

  let columnArray = board[indexes[0]].filter(
    (value) => value.toString() == checkFor.toString()
  ); // check horizontally, for matches
  if (columnArray.length == 3) return { winner: player, ended: true };

  let rowArray = [];
  for (let i = 0; i < gameDesign.boardSize.height; i++) {
    rowArray.push(board[i][indexes[1]]);
  }

  if (
    rowArray.filter((value) => value.toString() == checkFor.toString())
      .length == gameDesign.boardSize.height
  )
    return { winner: player, ended: true }; // Check for vertical match

  let draw = false;
  for (let i = 0; i < gameDesign.boardSize.width; i++) {
    if (
      board[i].filter((value) => value.length > 0).length !=
      gameDesign.boardSize.width
    )
      break;

    if (i == gameDesign.boardSize.width - 1) draw = true;
  }

  return { ended: false, draw };
}
boardTable.addEventListener('click', boxClicked);
