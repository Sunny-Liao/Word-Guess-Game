var words = ["captainamerica", "hulk", "ironman", "thor", "blackwidow", "hawkeye", "blackpanther"];

var currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();  //random integer(隨即整數 o ~ word.length)

var guessesLeft = 10;     //This variable holds the number of guesses left

document.getElementById("guesses-left").innerHTML = guessesLeft;

var wins = 0;     //This varibale will count the number of times we won

document.getElementById("wins").innerHTML = wins;

var resetLetterGuessed = ""

var progressWord = [];  //This is an empty array that we will push our blanks

var mysteryWord = [];  //This is an array that we will push the letters from the current word, for comparison of whether the player's guess is correct or not
var i; //we use i as the variable for the for loop to iterate through
console.log("Current word is: " + currentWord);

for(i = 0; i < currentWord.length; i++) {     //  This is the code that will push out blank spacess for the letters fo the current word so the payer can see the word and begin to guess letters
    progressWord.push("__");
}

document.getElementById("word-guess").innerHTML = progressWord.join(" ");   //在 DOM 應用中相當的常見，用來取得頁面中特定 id 的元素值

function letterInWord(letter) {       //function evaluating the positions of the given letter in the currentWord string return  empty array in case of failure
    var positions = new Array();      //the array that will contain the char positions in the currentWord
    for(i = 0; i < currentWord.length; i++) {
        if(currentWord[i] === letter)
            positions.push(i);
    }
    return positions;   //searches the array for the specified tiem, and returns its position
}

function lettersToGuess() {          //return number of letters that is still not guessed
    var i;
    var toGuess = 0;
    for (i in progressWord) {
        if(progressWord[i] === "__")
            toGuess++;
    }
    return toGuess;
}

document.onkeyup = function(event) {     //These are the key events used to play and to document the letters in the answers
    var letter = event.key;
    var lettersGuessed = letter.toLocaleUpperCase();    
    var i;

    console.log("You have typed a letter: ".concat(letter));  //concat()方法被用來合併兩個或多個陣列
    
    var positions = letterInWord(lettersGuessed);

    if(lettersToGuess() == 0) {     //this is the code that alerts you when you've won the game, then it will reset the current word to begin another round
        var phrases = ["Divert power to chest RT!", "SMASH!", "I must go back to Asgard, but I give you my word. I will return for you.!", "Eyes on the road!", "Fury helped you when you joined the game!", "In times of crisis, the wise build bridges, while the foolish build barriers.!"]
        var nextRound = phrases[Math.floor(Math.random() * phrases.length)];
        alert(nextRound);

        guessesLeft = 10;     //reset guesses left
        document.getElementById("guesses-left").innerHTML = guessesLeft;

        document.getElementById("letters-guessed").innerHTML = resetLetterGuessed;

        currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();     //This code generates a new word to guess and then pushes out the blanks again

        progressWord = [];
        for(i = 0; i < currentWord.length; i++) {
            progressWord.push("__");  
        }

        document.getElementById("word-guess").innerHTML = progressWord.join(" ");
    
        wins++;     //Add to the win total
        document.getElementById("wins").innerHTML = wins;
    }

    if(guessesLeft === 0) {     //This code will tell the user the game is over along with a message about their win streak, then it will reset the game while quickly showing what the word was
        alert("Game Over!  You finished with a streak of " + wins + " wins!  The word was " + currentWord);
        location.reload()     //重新刷新頁面
    }

    if(positions.length) {     //This will alert correct and compare the letter guessed with the current word
        console.log("User has pressed a letter from word: " + letter);
            for(i = 0; i < positions.length; i++) {
                progressWord[positions[i]] = lettersGuessed;
            }

            document.getElementById("word-guess").innerHTML = progressWord.join(" ");  //replace preogress Word underscore with letter pressed
    }
    else {
        
        document.getElementById("letters-guessed".innerHTML += lettersGuessed + " ");     //alert"wrong
        
        guessesLeft--;     //subtract a point from guesses left
        document.getElementById("guesses-left").innerHTML = guessesLeft;
    } 
}

