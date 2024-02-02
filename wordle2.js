
//word
var guessWord

//fetching a 5 letter word from API
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

//checking if the word exists in a separate API dictionary (some words are weird), if not keep searching for words until one is found
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
            getWord()

        })
    }
}



//calling method to get a valid word
getWord()


const squares = document.querySelectorAll('.square');
const keys = document.querySelectorAll('.key');

//making the board
const board = 
[['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', '']];

const alphabet = ["q","w","e","r","t","y","u","i","o","p","a","s",
                "d","f","g","h","j","k","l","Enter","z","x","c","v","b","n","m","Backspace"];

var keyClick;
var key;
let row = 0
let col = 0

//current guess of the user
let currGuess = ""

let currIndex;

//to determind the color of each square
const colorArr =
[['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', '']];

var rowOne = document.getElementById("1row");
var rowTwo = document.getElementById("2row");
var rowThree = document.getElementById("3row");

function makeKeyBoard()
{
    alphabet.forEach((element) => 
    {
        var newKey = document.createElement("div");
        newKey.textContent = element;
        newKey.className = "key";
        newKey.id = element;
        newKey.addEventListener('click', handleClick);

        
        if(alphabet.indexOf(element) <=9) {
            rowOne.appendChild(newKey);
        }
        else if(alphabet.indexOf(element) >= 10 && alphabet.indexOf(element) <= 18) {
            rowTwo.appendChild(newKey);
        }
        else {
            rowThree.appendChild(newKey);
        }

    })

}

makeKeyBoard();

function handleClick(event) {
    var clickedKey = event.target.textContent;
    updateBoard(clickedKey);
}

document.addEventListener('keydown', handleGame)


function handleGame(event)
{
    let key = event.key;
    updateBoard(key)

}

function updateBoard(letter) 
{

    if(letter === "Backspace" && col != 0){
        col-=1;
        board[row][col] = "";
        updateBoardUtil(true);   
        return;
    }

    else if(letter === "Enter" && col > 4){
        document.getElementById("" + row).classList.remove("row-shake")
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
                checkGuess(currGuess, row);
                row++;
                col = 0;
                return;
            }
            else throw new Error(res.status)
        })
        .catch((error) => {
            document.getElementById("" + row).classList.add("row-shake")
      
        })

        
    }
    
    else{
        if(alphabet.includes(letter) && letter != "Enter" && letter != "Backspace"){
            board[row][col] = letter;
            currIndex = "" + row + col;

            updateBoardUtil(false);   
            col++;
        }
        
    }

    function updateBoardUtil(isBack) {
        currIndex = "" + row + col;
        document.getElementById(currIndex).innerHTML = board[row][col];
        if(isBack)
        {
            document.getElementById(currIndex).style.borderColor = "dimgray";
            animatePop(currIndex, false)
        }
        else
        {
            document.getElementById(currIndex).style.borderColor =  "silver";
            animatePop(currIndex, true);
        }
            
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
                // document.getElementById(currIndex).style.backgroundColor = "DarkGreen";
                colorArr[row][i] = "gr"
                document.getElementById(currIndex).classList.add("winning-bounce");

            }
            endGameWin()
            
        }
        else
        {
            guessArr.forEach(checkGreen)
            function checkGreen(item)
            {
                currIndex = "" + row + col;
                if(wordArr.includes(item))
                {
                    if(wordArr[col] == guessArr[col])
                    { 
                        colorArr[row][col] = "gr"
                        wordArr[col] = "0"
                        guessArr[col] = "1"

                    }
                }
                col++;
                
            }

            col = 0;
            guessArr.forEach(checkYellow)
            function checkYellow(item)
            {
                currIndex = "" + row + col;
                if(wordArr.includes(item))
                {
                    colorArr[row][col] = "ye"
                    wordArr[wordArr.indexOf(item)] = "0"

                }
                col++;
            }

            if(row == 5)
            {
                endGameLoss()
            }
            
        }
        

        for(let i = 0; i <= 4; i++)
        {
            document.getElementById("" + row + i).classList.add("tile-flip")
            delay(row, i);
        }

        setTimeout(() => {
            for(let i = 0; i <= 4; i++)
            {
                if(colorArr[row][i] == "gr") {
                    document.getElementById(board[row][i]).style.backgroundColor = "DarkGreen";
                }
                else if(colorArr[row][i] == "ye") {
                    document.getElementById(board[row][i]).style.backgroundColor = "GoldenRod";
                }
                else {
                    document.getElementById(board[row][i]).style.backgroundColor = "Gray";
                }
            }
        }, 2000)
        
        
        

        
    }

    function delay(drow, i) {
        var item = colorArr[drow][i];
        setTimeout(() => {
            if (item === 'gr') {
                currIndex = "" + drow + i;
                
                document.getElementById(currIndex).style.backgroundColor = "DarkGreen";
                document.getElementById(currIndex).style.borderColor = "DarkGreen";
                
            }
            else if (item === 'ye') {
                currIndex = "" + drow + i;
                document.getElementById(currIndex).style.backgroundColor = "GoldenRod";
                document.getElementById(currIndex).style.borderColor = "GoldenRod";
            }
        }, 250 + 300 * i);

    }
}


function endGameWin()
{
    document.removeEventListener('keydown', handleGame)
    finalBounce(row)

}

function endGameLoss()
{
    document.removeEventListener('keydown', handleGame)
    setTimeout(function() {alert('Oh noes! Word was: ' + guessWord[0]);},1700)
}

function animatePop(ind, isAdd)
{
    if(isAdd)
        document.getElementById(ind).classList.add("square-pop")
    else
        document.getElementById(ind).classList.remove("square-pop")
}



function finalBounce(drow) {
    for(let i = 0; i <= 4; i++)
    {

        setTimeout(() => {
            document.getElementById("" + drow + i).classList.remove("tile-flip")
            document.getElementById("" + drow + i).classList.add("winning-bounce")

        }, 1800);
    }       
}