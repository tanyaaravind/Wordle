
var guessWord
/*
function getWord ()
{
    fetch('https://random-word-api.herokuapp.com/word?length=5')
    .then(response => {
        return response.json();
    })
    .then(data => {
        guessWord = data;
        console.log(guessWord)
        wordExists(guessWord)
    });


    function wordExists(word)
    {

        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word[0])
        .then((res) => {
            if(res.ok)
            {
                guessWord = word
            }
            else throw new Error(res.status)
        })
        .catch((error) => {
            console.log("works!")
            getWord()

        })
    }
}




getWord()

*/

guessWord = ["fuggy"]
console.log(guessWord)

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
let currIndex

document.addEventListener('keydown', handleGame)

function handleGame(event)
{
    let key = event.key;
    updateBoard(key)

}

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

        currGuess = currGuess.slice(0, 5)

        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + currGuess)
        .then((res) => {
            if(res.ok)
            {
                console.log("works?")
                checkGuess(currGuess, row);
                row++;
                col = 0;
                return;
            }
            else throw new Error(res.status)
        })
        .catch((error) => {
            console.log("works2! + Invalid Word")
      
        })

        
    }
    
    else{
        if(alphabet.includes(letter)){
            currIndex = "" + row + col;
            board[row][col] = letter;
            document.getElementById(currIndex).classList.add('square-bounce');
            document.getElement
            updateBoardUtil(false);   
            col++;
        }
        
    }

    function updateBoardUtil(isBack) {
        currIndex = "" + row + col;
        document.getElementById(currIndex).innerHTML = board[row][col];
        if(isBack)
            document.getElementById(currIndex).style.borderColor = "gray";
        else
            document.getElementById(currIndex).style.borderColor =  "white";
    }

    function checkGuess(guess, row) 
    {
        var guessArr = guess.split("")
        var wordArr = guessWord[0].split("")
        
        let col = 0;
        if(guess === guessWord[0]){
            for(var i = 0; i <= 4; i++)
            {
                currIndex = "" + row + i
                document.getElementById(currIndex).style.backgroundColor = "DarkGreen";
            }
            endGame()
            
        }
        else
        {
            guessArr.forEach(checkGreen)
            function checkGreen(item)
            {
                console.log("yes1")
                currIndex = "" + row + col;
                console.log("currIndex " + currIndex)
                if(wordArr.includes(item))
                {
                    console.log("yes2")
                    if(wordArr[col] == guessArr[col])
                    {
                        console.log("yes3")
                        document.getElementById(currIndex).style.backgroundColor = "DarkGreen";
                        wordArr[col] = "0"
                        console.log(wordArr + " wr")
                        guessArr[col] = "1"
                        console.log(guessArr + " gr")

                    }
                    console.log("yes4")
                }
                col++;
                console.log("yes5")
                
            }

            col = 0;
            guessArr.forEach(checkYellow)
            function checkYellow(item)
            {
                currIndex = "" + row + col;
                if(wordArr.includes(item))
                {
                    document.getElementById(currIndex).style.backgroundColor = "GoldenRod";
                    wordArr[wordArr.indexOf(item)] = "0"

                }
                else
                {
                    document.getElementById(currIndex).style.backgroundColor = "DimGray";
                }
                
                col++;
            }
                
        }
            
    }
}



function endGame()
{
    document.removeEventListener('keydown', handleGame)

}