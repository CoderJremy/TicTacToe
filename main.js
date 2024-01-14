const gameBoard = document.getElementById("board");
const turnDisplay = document.getElementById("turn");
const infoDisplay = document.getElementById("info");

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
        this.gameWon = false;
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

                    this.loopThroughSequence(e);
                    this.changePlayer();
                }
            });
        }
    }

    loopThroughSequence(e) {
        const currentPlayerIds = this.currentPlayer === this.players[0] ? this.idsForO : this.idsForX;
    
        this.everyWinningIdSequence.forEach((sequence) => {
            let count = 0;
    
            sequence.forEach((id) => {
                if (currentPlayerIds.includes(id.toString())) {
                    count++;
                }
            });
    
            if (count === 3) {
                this.gameWon = true;
            }
        });
    
        if (this.gameWon) {
            this.validateWinner(this.currentPlayer);
        }
    }    

    validateWinner(symbol) {
        infoDisplay.style.fontWeight = "bold";
        infoDisplay.style.fontSize = "1.5rem";
        infoDisplay.innerText = `${symbol.toUpperCase()}'s are the winners ...`;
    }

    changePlayer() {
        if(this.gameWon === false) {
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
}

const myGame = new TicTacToeGame();