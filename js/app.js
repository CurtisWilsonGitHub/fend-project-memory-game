/*
 * code related to the modal was modified from https://www.w3schools.com/howto/howto_css_modals.asp
 */

const deck = document.getElementById('play_area');
const modal = document.getElementById('winModal');
const span = document.getElementsByClassName('close')[0];
const resetButton = document.getElementById('reset');
const redoButton = document.getElementById('redo');
let match_array = [];
let moves = 0;
let timerActive = false;
let sec = 0;
let minute = 0;
let matches = 0;
let stopwatch;


/*
 * Create a list that holds all of your cards
 */

 const cards_array = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"
  ];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976



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

/*
 * Takes cards_array and create a play area by creating a new 'li' element
 * and 'i' element with the appropriate class name taken from the class_array
 */

function board_maker(cards){
  for (let i = 0; i < cards.length; i++){
    let class_name = cards[i];
    let card_node = document.createElement("li");
    card_node.className="card";
    let card_face = document.createElement("i");
    card_face.className = cards[i];
    card_node.appendChild(card_face);
    document.getElementById('play_area').appendChild(card_node);
  }
}

function deleteBoard(){
  while(deck.firstChild){
    deck.removeChild(deck.firstChild);
  }
}


function show_card(){
  event.target.className = "card open show";
}


/*
 * function that takes an array of two cards and see if class matches
 */

function match_maker(card,match_array){
  match_array.push(card);
  if(match_array.length == 2){

    let card_one = match_array[0].children;
    let card_two = match_array[1].children;

    if(card_one[0].className == card_two[0].className){
      matchSucced(card_one,card_two);
      correct_animation(match_array);
      matches ++;
    } else{
     matchFail(card_one,card_two);
    }
    match_array.length = 0;
  }
  if(matches === 8){
    winCondition(matches);
    timerActive = false;
    matches = 0;
  }
}

function matchSucced(card_one,card_two){
  card_one[0].parentElement.className="card match";
  card_two[0].parentElement.className="card match";
}

function matchFail(card_one,card_two){
  card_one[0].parentElement.className="card";
  card_two[0].parentElement.className="card";
}

function updateMove(){
  document.getElementById('move').textContent = moves;
  updateScore(moves);
}

function updateScore(){
  if(moves === 20){
    document.getElementById('threeStar').style.display = 'none';
  }
  if(moves === 30){
    document.getElementById('twoStar').style.display = 'none';
  }
}

function finalScore(){
  if(moves >= 20){
    document.getElementById('thirdStar').style.display = 'none';
    if(moves >= 30){
      document.getElementById('secondStar').style.display = 'none';
    }
  }
}

function resetScore(){
  moves = 0;
  document.getElementById('thirdStar').style.display = 'block';
  document.getElementById('secondStar').style.display = 'block';
  document.getElementById('twoStar').style.display = 'block';
  document.getElementById('threeStar').style.display = 'block';
  document.getElementById('move').textContent = moves;
  document.getElementById('timer').textContent = "Timer: 00:00";
}

function winCondition(){
    modal.style.display="block";
    finalScore(moves);
    printFinalTime();
    timerStop();
}

/*
 *function that keeps tracks of time. Activated by timeControll function
 */

function timer(){
  if( sec === 60){
    minute += 1;
    sec = 0;
  }
  else{
    sec += 1;
  }
  document.getElementById('timer').textContent = "Timer:    " + minute + ":" + sec;
}

function timerStart(active){
  if(!active){
    stopWatch = setInterval(timer,1000);
  }
}

function timerStop(){
  clearInterval(stopWatch);
  minutes = 0;
  sec = 0;
}

function printFinalTime(){
  document.getElementById('finalTime').textContent = minute + ":" + sec;
}


/*
 * Event Listeners
 */

deck.addEventListener('click',function(e){
  if(e.target && e.target.matches("li.card")){
    timerStart(timerActive);
    timerActive = true;
    show_card();
    moves ++;
    updateMove();
    setTimeout(function(){
      match_maker(e.target, match_array)
    },500);e
  }
});

resetButton.addEventListener('click',function(e){
  deleteBoard();
  board_maker(shuffle(cards_array));
  resetScore();
  modal.style.display = "none";
});

redoButton.addEventListener('click',function(e){
  deleteBoard();
  board_maker(shuffle(cards_array));
  resetScore();
  modal.style.display = "none";
  timerActive = false;
  timerStop();
  match_array = [];
  matches = 0;
});

span.onclick= function(){
  modal.style.display = "none";
}


/*
 * animation functions
 */

 function correct_animation(match_array){
   match_array[0].classList.toggle('match_correct');
   match_array[1].classList.toggle('match_correct');
 }


 /*
  * initial board setup
  */

  board_maker(shuffle(cards_array));
