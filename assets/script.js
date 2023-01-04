//global variables


// the user will start the game by clicking on a button
// sets gameCondition to true
// runs wordHolder Function?
// set interval timer? set timeout?
// this will start a timer that will call a function to end the game when the clock runs out
// timer starts at ten and counts down to zero - this will need a variable
// disables start button

//init()
// getwins()
//get losses()
// this calls the intial number that will appear on the screen for wins and losses e.g. zero at the beginning

// a big object that contains the several different words  with the letters saved in an array for each word.
// e.g. words 
// newGuinea [n, e, w, g, u, i, n, e, a]     
// France [f, r, a, n, c, e]
// .join method, .split method
// scrap this one array with all words and use split and join method

// if or switch statment to select a different property from the object e.g. if the math.random picks 1 choose this word from the object, if 2 choose this word etc. 
// check this source for grabbing a random property from an object https://bobbyhadz.com/blog/javascript-get-random-property-from-object

// wordHolder Function
// when the function starts it prints a number of _ _ _ as defined by the length of the array
// use a for loop e.g. for each iteration so long as i is less than France.length push "_" into word holder
// display word holder

//event listener key up on window
// if time is 0 return
// check to make sure it is a letter
//function that compares event.value from input to each value in the array
// e.g. var input = event.value
// for loop that compares input to i which moves along the array until it reaches the length of the array
// if they match the _ is spliced or removed from the array and the input value pushed into the correct location
// the word holder function is called

// when all of the letters have been guessed it will call function Winner()
// changes the contents of the wordHolder array to You Won!
// wins variable goes up by one and is stored as local variable 

// display total wins or losses
// function that stores wins/losses in local storage

// a reset score button that will reset the score by resetting local storage

// styling can be done by adding a class to the div that will hold the textContent