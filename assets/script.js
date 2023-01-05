//global variables

const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
var words = ["France", "Ghana", "Monaco", "Jamaica", "Senegal", "Mongolia", "Macedonia", "Panama", "Uruguay", "Honduras", "Micronesia"];
let timerHolder = document.getElementById("timer");
let wordDisplay = document.getElementById("display");
const winHolder = document.getElementById("winholder");
const lossHolder = document.getElementById("lossholder");

var countDown = 10;
var victory = false;
var winCounter = 0;
var loseCounter = 0;
var numBlanks = 0;
var chosenWord = " ";
var timer;

var lettersinchosenWord = [];
var blanksLetters = [];

//this function ensures that on loading of the page Wins and Losses are both Zero
function init() {
    getWins();
    getLosses();
}

// This function starts the game and is triggered by an event listener on the startbtn
// it also resets the countdown, resets the victory condition to false and disables the start button
function startGame() {
    countDown = 10;
    victory = false;
    startBtn.disabled = true;
    wordHolder();
    startTimer();
}

// This function is triggered by the function startgame and selects a word from the words array (global)
// This coice is made by using the math.random property
// The chosenword is then taken and split into an array called lettersinchosenword
// it sets the variable numblanks to be the number of letters in the above array
// it resets the content of the blanksletters array (from previous rounds)
// a for loop then pushes an _ into the blanksletters array for each letter in the chosen word so that there are as many blanks as there were letters
// it then joins the blanksletters array back together into a string and displays it using textcontent in the wordDisplay variable (a div)
// (otherwise they would display with commas)
function wordHolder() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersinchosenWord = chosenWord.split("");
    numBlanks = lettersinchosenWord.length;
    blanksLetters = [];
    for (i = 0; i < numBlanks; i++) {
        blanksLetters.push("_");
    }
        wordDisplay.textContent = blanksLetters.join(" ");
}

// This starts the time ticking downward
// for ever 1000ms the global variable timer counts down one 1 from 10 (which is the beginning variable of countdown)
// It displays this number in the timerHolder variable (a div)
// it checks if to see if the countdown is still greater than equal to zero and if that is true it checks to see if the victory condition has been met
// if it has it clears the interval on the timer and calls the wingame function
// It also checks to see if the countDown has reached zero and if it has  it also clears the interval and runs the losegame function
function startTimer() {
    timer = setInterval(function() {
        countDown--;
        timerHolder.textContent = countDown;
        if (countDown >= 0) {
            if (victory && countDown > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (countDown === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

// this function displays the text "you win" in the word display element
// it increases the win counter and reenables the start button
// it then calls the function setwins
function winGame() {
    wordDisplay.textContent = "You Win!";
    winCounter++;
    startBtn.disabled = false;
    setWins();
}
// this is similar to the function described above with the caveat that the player has lost
function loseGame() {
    wordDisplay.textContent = "You Lost!";
    loseCounter++;
    startBtn.disabled = false;
    setLosses();
}

// This function increases the wincounter that displays in the winHolder element (a div)
// it also sets the item winCount in the local storage to be the variable of wincounter, thus saving the number of wins
function setWins() {
    winHolder.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
}

// this is similar to the function desribed above except for losses 
function setLosses() {
    lossHolder.textContent = loseCounter;
    localStorage.setItem("lossCount", loseCounter)
}

// this function retrieves the number of wins from the local storage
// if there is no data in the local storage it sets the counter to zero
// otherwise it makes the wincounter equal to the number in the local storage
// it then displays the number in the winHolder element (a div)
function getWins() {
    var storedWins = localStorage.getItem("winCount");
        if (storedWins === null) {
            winCounter = 0;
        } else {
            winCounter = storedWins;
        }
            winHolder.textContent = winCounter;
}

//this function is similar to the one described above except for losses
function getLosses() {
    var storedLosses = localStorage.getItem("lossCount");
    if (storedLosses === null) {
        loseCounter = 0; 
    } else {
        loseCounter = storedLosses;
    }
        lossHolder.textContent = loseCounter;
}

// this function checks if the chosen word is the same as the blankletters array when the contents of the array is removed and turned into a string using the join method
// if they are strictly equal the victory condition is changed from false to true
function checkVictory() {
    if (chosenWord === blanksLetters.join("")) {
        victory = true;
    }
}

// this function compares the input from the event listener function below to the variosu letters of the chosenword
// first it creates a new variable called letterinword and gives it the value false
// it then starts a for loop
// with each iteration it checks every character within the chosenword string to see if it is strictly equal to the input (here called letter)
// if this is true it changes the value of the letterinword variable to true
// once it determines there is a match it runs another for loop. 
// This time it makes j equal to the number of the letter from left to right in the chosen word as j increases by one in every iteration of the loop
// it then takes this character and inserts it back into the blankletters array in the correct place
// finally it displays the corrected blankletters array again in the Wordisplay element (a div)
function checkLetters(letter) {
    var letterinWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterinWord = true;
        }
    }
    if (letterinWord === true) {
        for (var j = 0; j < numBlanks; j++) {
            if (chosenWord[j] === letter) {
                blanksLetters[j] = letter;
                }
            }
    wordDisplay.textContent = blanksLetters.join(" ");
    }
}

// this adds the startgame function to the start button NOTE: NO brackets on startgame!
startBtn.addEventListener("click", startGame);

// This adds the event listener to the document on key down
// it will do nothing if the game is not active
// otherwise it sets the variable key to be equal to the event(here the keydown), to lowercase
// it then confirms validity by comparing it to ONLY possible alphanumeric characters
// if the key is confirmed to an alphanumeric character the letterGuesses variable is defined as the event.key
// the function then calls the checkletters function to compare it to the letters in the word
// it also checks to see if the victory condition has been satisfied
document.addEventListener("keydown", function(event) {
    if (countDown === 0) {
        return;
    }
    var key = event.key.toLowerCase();
    var alphanumericCharacters = "abcdefghijklmnopqrstuvwxyz1234567890 ".split("");
    if (alphanumericCharacters.includes(key)) {
        var letterGuessed = event.key;
        checkLetters(letterGuessed)
        checkVictory();
    }
});

// this adds an eventlistener to the the reset button that will call the resetGame function if clicked
resetBtn.addEventListener("click", resetGame);

// this function sets the wincounter and loss counter back to zero over-writing the values that might be stored in the local storage
// it then stores the value of zero back into the local storage.
function resetGame() {
    winCounter = 0;
    loseCounter = 0;
    setWins();
    setLosses();
}

// this calls the init function which is the only function that needs to run on loading of the page, rather than by being called by an event listener
init();
