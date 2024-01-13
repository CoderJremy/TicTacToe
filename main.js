const gameBoard = document.getElementById("board");
const turnDisplay = document.getElementById("turn");

class TicTacToeGame {
    constructor(squares = 9) {
        this.squares = squares;
        this.players = ["o", "x"];
        this.circlesTurn = true;
        this.currentPlayer = this.circlesTurn ? this.players[0] : this.players[1];
        this.everyWinningIdSequence = [
			[0, 1, 2],
			[0, 3, 6],
			[0, 4, 8],
			[1, 4, 7],
			[2, 4, 6],
			[2, 5, 8],
			[3, 4, 5],
			[6, 7, 8],
		];
        this.idsForO = [];
        this.idsForX = [];
        this.createBoard();
    }

    createBoard() {
        for(let i = 0; i < this.squares; i++) {
            const sqr = document.createElement("div");
            sqr.id = i;
            sqr.className = "square";
            sqr.style.width = "100px";
            sqr.style.height = "100px";
            gameBoard.append(sqr);

            sqr.addEventListener("click", (e) => {
                e.preventDefault();

                if(e.target.innerText === "") {
                    e.target.innerText = this.currentPlayer;

                    if(this.currentPlayer === this.players[0]) {
                        this.idsForO.push(e.target.id);
                    } else {
                        this.idsForX.push(e.target.id);
                    }

                    this.changePlayer();
                    this.checkForWinner(e);
                }
            });
        }
    }

    checkForWinner(e) {
        // I need to match the list of ids for o's & x's with the winning sequences...
        console.log(e.target.id, e.target.innerText);
    }

    changePlayer() {
        this.circlesTurn = !this.circlesTurn;

        if(this.circlesTurn) {
            this.currentPlayer = this.players[0];
            turnDisplay.innerText = this.players[0].toUpperCase();
        } else {
            this.currentPlayer = this.players[1];
            turnDisplay.innerText = this.players[1].toUpperCase();
        }
    }
}

const myGame = new TicTacToeGame();