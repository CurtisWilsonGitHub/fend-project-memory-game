/*
 * code related to the modal was modified from const modal = document.getElementById('winModal');
  */

const deck = document.getElementById('play_area');
const modal = document.getElementById('winModal');
const span = document.getElementsByClassName('close')[0];
let match_array = [];
let moves = 0;
let timerActive = false;
let sec = 0;
let minute = 0;


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

      card_one[0].parentElement.className="card match";
      card_two[0].parentElement.className="card match";
      correct_animation(match_array);

    } else{

      card_one[0].parentElement.className="card";
      card_two[0].parentElement.className="card";

    }
    match_array.length = 0;
  }
}

function updateMove(moves){
  document.getElementById('move').textContent = moves;
  updateScore(moves);
}

function updateScore(moves){
  let element = document.getElementById('starUl');
  let child = element.lastElementChild;

  if(moves === 20 || moves === 30){
    element.removeChild(child);
  }

}


/*
 *function that keeps tracks of time. Activated by startTimer function
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
  console.log(minute+":"+sec);
}

function startTimer(active){
  if(!active){
    setInterval(timer,1000);
  }
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click',function(e){
  if(e.target && e.target.matches("li.card")){
    startTimer(timerActive);
    timerActive = true;
    show_card();
    moves ++;
    updateMove(moves);
    setTimeout(function(){
      match_maker(e.target, match_array)
    },500);
  }
  modal.style.display="block";
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
