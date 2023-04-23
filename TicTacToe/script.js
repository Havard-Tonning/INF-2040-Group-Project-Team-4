let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let currentSymbol = "X"

function makeMove(row, col){
    if(board[row][col] === ""){
        board[row][col] = currentSymbol
        document.getElementsByClassName("row")[row].children[col].innerText = currentSymbol
    }
    
    if(isWinner()){
       
        alert(`Player ${currentSymbol} won`)
    }else if(boardIsFull()){
        alert("It's a tie")
    }
   
    if(currentSymbol === "X"){
        currentSymbol = "O"
    }else{
        currentSymbol = "X"
    }
}

function isWinner(){
    return (board[0][0] != "" && board[0][0] === board[0][1] && board[0][1] === board[0][2])
        || (board[1][0] != "" && board[1][0] === board[1][1] && board[1][1] === board[1][2])
        || (board[2][0] != "" && board[2][0] === board[2][1] && board[2][1] === board[2][2])
        || (board[0][0] != "" && board[0][0] === board[1][0] && board[1][0] === board[2][0])
        || (board[0][1] != "" && board[0][1] === board[1][1] && board[1][1] === board[2][1])
        || (board[0][2] != "" && board[0][2] === board[1][2] && board[1][2] === board[2][2])
        || (board[0][0] != "" && board[0][0] === board[1][1] && board[1][1] === board[2][2])
        || (board[0][2] != "" && board[0][2] === board[1][1] && board[1][1] === board[2][0])

}

for(let i = 0; i < 5; i++){
    gaaketeRagac
}

function boardIsFull(){

    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(board[i][j] === "") return false;
        }
    }

    return true;

    
}

function clearBoard(){
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            board[i][j] = ""
        }
    }

    let rows = document.getElementsByClassName("row")
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            rows[i].children[j].innerText = ""
        }
    }

    currentSymbol = "X"
}
