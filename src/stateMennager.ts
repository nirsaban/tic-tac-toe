enum SymboleEnum {
    X = "X",
    O = "O"
}

export class Player{

    id : string ;
    symbole : SymboleEnum;
    currentPlayer : boolean;
    winner : boolean;
}

export type PlayerObject = Record<SymboleEnum, Player>;

export class Game {
    players : PlayerObject;
    end : boolean;
    start : boolean
}

export class StateMennager{


    private static playerX : Player;
    private static  playerO : Player;
    public static  game :  Game
    private static board : string[][] = [['', '', ''], ['', '', ''], ['', '', '']];

    static init (){
        if(!this.game && !this?.game?.players || this.game.end === true)
        this.game = {
            players : {

            } as PlayerObject,
            start  : false , 
            end : false
        }
    }


    static isValidStart(){
    
        if(Object.keys(this.game.players).length === 2){
            this.game.start = true;
            return true
        }
        return false
    }

    static setPlayer (socket){
        const player : Player =  {
            id : socket.id,
            symbole : this.getSymbole(),
            currentPlayer : true,
            winner : false
        }

        this.game.players[player.symbole] = player
    }

    static getPlayers(){
        return this.game.players
    }

    static getSymbole(){
        if(!this?.game?.players?.X) {
            return SymboleEnum.X
        }else if (!this?.game?.players?.O) {
            return SymboleEnum.O
        }
    }

    static getPlayerById(id : string){
        for(let player in this.game.players){
            if(this.game.players[player].id === id ){
                return this.game.players[player]
            }
        }
    }

    static setMove(col : number , row : number , player : Player) {
        this.board[row][col] = player.symbole;
        console.log(this.board)
        console.log(this.checkWinner())
    }

    static getTurn(symbole : SymboleEnum){
        return symbole === 'X' ? 'O' : 'X';
    }

    static checkWinner(){

    for (let row = 0; row < 3; row++) {
      if (this.board[row][0] !== '' && this.board[row][0] === this.board[row][1] && this.board[row][1] === this.board[row][2]) {
        return this.board[row][0];
      }
    }
  
    // check cols
    for (let col = 0; col < 3; col++) {
      if (this.board[0][col] !== '' && this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col]) {
        return this.board[0][col];
      }
    }
  
    // check diagonals
    if (this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      return this.board[0][0];
    }
    if (this.board[2][0] !== '' && this.board[2][0] === this.board[1][1] && this.board[1][1] === this.board[0][2]) {
      return this.board[2][0];
    }
    return null;
  };

}