let guessWord

fetch('https://random-word-api.herokuapp.com/word?length=5')
    .then(response => {
        return response.json();
    })
    .then(data => {
        guessWord = data;
        console.log(guessWord)
    });


const squares = document.querySelectorAll('.square');

const board = 
[['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', '']];

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l",
                "m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var key;
let row = 0
let col = 0

let currGuess = ""

document.addEventListener('keydown', (event) => { 
    key = event.key;
    updateBoard(key)

   
})

function updateBoard(letter) 
{
    console.log(letter)

    if(letter === "Backspace" && col != 0){
        col-=1;
        board[row][col] = "";
        updateBoardUtil(true);   
        return;
    }

    else if(letter === "Enter" && col > 4){
        currGuess = ""
        board[row].forEach(addTo)
        function addTo(item){
            currGuess += item;
        }
        checkGuess(currGuess, row);
        row++;
        col = 0;
        return;
    }
    
    else{
        if(alphabet.includes(letter)){
            board[row][col] = letter;
            updateBoardUtil(false);   
            col++;
        }
        
    }

    function updateBoardUtil(isBack) {
        let currIndex = "" + row + col;
        document.getElementById(currIndex).innerHTML = board[row][col];
        if(isBack)
            document.getElementById(currIndex).style.borderColor = "gray";
        else
            document.getElementById(currIndex).style.borderColor =  "white";
    }

    function checkGuess(guess, row) {
        let col = 0;
        if(guess === guessWord[0]){
            console.log("Yayy!")
        }
        else{
            let guessArr = guess.split("")
            let wordArr = guessWord[0].split("")
            guessArr.forEach(check)
            function check(item)
            {
                var thisInd = "" + row + col;
                if(wordArr.includes(item))
                {
                    if(wordArr.indexOf(item) == guessArr.indexOf(item))
                    {
                        document.getElementById(thisInd).style.backgroundColor = "green";
                        //wordArr[col] = "0"

                    }
                    
                }
                col++;
            }
        }
    }
}




