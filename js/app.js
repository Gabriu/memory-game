// variables
const deck = document.querySelector('.deck');
const star = document.querySelectorAll('.fa-star');
let card = document.querySelectorAll('.card');
let count = document.querySelector('.moves');
let timer = document.querySelector('.timer');
let rating = document.querySelector('.rating');
let totalMoves = document.querySelector('.totalMoves');
let stars = document.querySelector('.stars');
let popup = document.querySelector('.popup');
let endTime = document.querySelector('.endTime');
let replay = document.querySelector('.replay');
let restart= document.querySelector('.restart');

// variable, which creates an array of cards
let arrayOfCards = [...card];

// variable, which counts the number of moves
let moves = 0;

// variable, which counts the number of cards that were matched
let matchList = 0;

// array, which holds opened cards
let openCards = [];

// variables for timer
let second = 0;
let minute = 0;
let time;

// variable, which allows additional card clicks to be disabled during animations
let animated = true;

// targets restart icon at top right of screen or replay button shown on the popup
// and calls startGame function when restart or replay is clicked
restart.onclick = startGame;
replay.onclick = startGame;

// shuffles and displays cards face down when the game starts
document.body.onload = startGame;

// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// startGame function calls the shuffle function on the arrayOfCards, displays
// all cards face down, resets all variables and innerHTML and starts the timer
function startGame() {
    popup.style.display = 'none';
    arrayOfCards = shuffle(arrayOfCards);
    let temporaryArray = [];
    for (let i = 0; i < arrayOfCards.length; i++) {
        deck.innerHTML ='';
        temporaryArray.forEach.call(arrayOfCards, function(item){
        deck.appendChild(item);
    });
    arrayOfCards[i].classList.remove('show', 'open', 'match', 'unmatch');
    }
    moves = 0;
    matchList = 0;
    count.innerHTML = `Moves: ${moves}`;
    for (let i = 0; i < star.length; i++){
       star[i].style.visibility = 'visible';
    }
    endOfTime();
    minute = 0;
    second = 0;
    timer.innerHTML = `Time: 0:00`;
    endTime.innerHTML = '';
    totalMoves.innerHTML = '';
    rating.innerHTML = '';
    openCards = [];
    animated = false;
    popup.classList.remove('show');
    gameTimer();
}

// gameTimer function counts seconds, minutes and updates innerHTML of the timer
function gameTimer(){
    time = setInterval(function(){
        if (second < 10) {
          second = `0${second}`;
        }
        timer.innerHTML = `Time: ${minute}:${second}`;
        second++;
        if (second == 60){
            minute++;
            second = 0;
        }
    }, 1000);
}

// endOfTime function clears inverval of the time
function endOfTime(){
  clearInterval(time);
}

// operCard function opens the cards, pushes them into the array, checks that no
// more than 2 cards can be opened, compares cards, calls function whether or not
// they match and, finally, calls popup function to congratulate when the game is finished.
let openCard = function(){
    if(animated) return;
    this.classList.toggle('open');
    this.classList.toggle('show');
    openCards.push(this);
    let cardCount = openCards.length;
    if (cardCount === 2) {
        movesCounter();
        if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
            matchList++;
            for (let i = 0; i < 2; i++){
                openCards[i].classList.add('match');
                openCards[i].classList.remove('show', 'open');
            }
            openCards = [];
        } else {
            notMatch();
        }
    }
    congratulationsPopup();
}

// notMatch function sets timeout if cards don't match and then displays them face down
function notMatch(){
    animated = true;
    for (let i = 0; i < 2; i++){
    openCards[i].classList.add('unmatch');
    }
    setTimeout(function(){
        animated = false;
        for (let i = 0; i < openCards.length; i++){
            openCards[i].classList.remove('show', 'open', 'unmatch');
        }
        openCards = [];
    }, 900);
}

// for loops through the cards and adds click event listener
for (let i = 0; i < arrayOfCards.length; i++){
    arrayOfCards[i].addEventListener('click', openCard);
}

// movesCounter function adds 1 move each time 2 cards are clicked, updates the moves,
// and changes star rating accordingly
function movesCounter(){
    moves ++;
    count.innerHTML = `Moves: ${moves}`;
    if (moves > 15 && moves <= 25){
        star[2].style.visibility = 'collapse';
    } else if (moves > 25){
        star[1].style.visibility = 'collapse';
    }
}

// congratulations popup shows the information about the game when all cards are matched
function congratulationsPopup() {
    if (matchList === 8){
        endOfTime();
        endTime.innerHTML = timer.innerHTML;
        totalMoves.innerHTML = count.innerHTML;
        rating.innerHTML = `Rating: ${stars.innerHTML}`;
        popup.classList.add('show');
        popup.style.display = 'block';

        // If user clicks outside this popup, it will be closed
        window.onclick = function(event) {
          if (event.target == popup) {
            popup.style.display = 'none';
          }
        };
    }
}
