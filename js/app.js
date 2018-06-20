const deck = document.getElementById('play_area');
let card_array = [];
/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function correct_animation(card_array){
  card_array[0].classList.toggle('match_correct');
  card_array[1].classList.toggle('match_correct');
}

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

function show_card(){
  event.target.className = "card open show";
}

function match_maker(card,card_array){
  card_array.push(card);
  if(card_array.length == 2){
    let card_one = card_array[0].children;
    let card_two = card_array[1].children;
    console.log(card_one[0].className);
    console.log(card_two[0].className);

    if(card_one[0].className == card_two[0].className){
      console.log('true');
      card_one[0].parentElement.className="card match";
      card_two[0].parentElement.className="card match";
      correct_animation(card_array);
    } else{
      console.log('false');
      card_one[0].parentElement.className="card";
      card_two[0].parentElement.className="card";
    }
    card_array.length = 0;
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
    show_card();
    setTimeout(function(){
      match_maker(e.target, card_array)
    },500);
  }
});
