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

    function checkGuess(guess, row) 
    {
        var thisInd;
        var guessArr = guess.split("")
        var wordArr = guessWord[0].split("")
        
        let col = 0;
        if(guess === guessWord[0]){
            guessArr.forEach(winning)
            function winning(item)
            {
                thisInd = "" + row + col;
                document.getElementById(thisInd).style.backgroundColor = "DarkGreen";
            }
            
        }
        else
        {
            guessArr.forEach(checkGreen)
            function checkGreen(item)
            {
                thisInd = "" + row + col;
                if(wordArr.includes(item))
                {
                    if(wordArr[col] == guessArr[col])
                    {
                        document.getElementById(thisInd).style.backgroundColor = "DarkGreen";
                        wordArr[col] = "0"

                    }
                    
                }
                col++;
                
            }

            col = 0;
            guessArr.forEach(checkYellow)
            function checkYellow(item)
            {
                thisInd = "" + row + col;
                if(wordArr.includes(item))
                {
                    document.getElementById(thisInd).style.backgroundColor = "GoldenRod";
                    wordArr[wordArr.indexOf(item)] = "0"

                }
                
                col++;
            }
                
        }
            
    }
}





