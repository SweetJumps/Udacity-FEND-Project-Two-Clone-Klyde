
let moveCount = 0;
let cardMatch = [];

function initialize() {
    
    console.log ("init");
    //let moveCount = 0;
    //let cardMatch = [];

    let cards = ["fa-anchor", "fa-anchor", "fa-bicycle", "fa-bicycle", "fa-bolt", "fa-bolt", "fa-bomb", "fa-bomb",
                "fa-cube", "fa-cube", "fa-diamond", "fa-diamond", "fa-leaf", "fa-leaf", "fa-paper-plane-o", "fa-paper-plane-o"];

    cards = shuffle(cards);
    updateMoveCounter("initialize");
    /*
    for (let card of cards) {
        console.log(`Card ${card}`);
    }
    */

    // Array​.prototype​.map()
    // MDN: The map() method creates a new array with the results of calling a provided function on every element in the calling array.
    let cardsHTML = cards.map(function(card) {
        return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
        });

    // Array​.prototype​.join()
    // MDN: If separator is an empty string, all elements are joined without any characters in between them.
    let deck = document.querySelector(".deck");
    deck.innerHTML = cardsHTML.join('');
    // using event delegation to use one eventlistener at the ul level instead of sixteen for all the li elements
    deck.addEventListener("click", cardClicked);
    let restart = document.querySelector(".restart");
    restart.addEventListener("click", initialize);

}
    
initialize();
//  for (let cardHTML of cardsHTML) {
//    console.log(cardHTML);
//}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below ***DONE***
 *   - loop through each card and create its HTML ***DONE***
 *   - add each card's HTML to the page ***DONE***
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

function updateMoveCounter(action) {
    console.log("updateMoveCounter");
    //increment move counter
    if (action == "initialize"){
        console.log("init move counter");
        moveCount = 0;
    }
    else{
        console.log("increment");
        moveCount += 1;
        }
    let moveCountClass = document.querySelector(".moves");
    moveCountClass.innerHTML = moveCount;
    //if (moveCount % 5 == 0) && (moveCount != 0) {
    //    console.log("fifth mod move");
    //}
}

function cardClicked(evt) {
    //console.log('A card was clicked. ' + evt.target.classList);
    //evt.target.style.visibility = 'hidden';
    if (!evt.target.classList.contains("match") && !evt.target.classList.contains("open") && !evt.target.classList.contains("show")){
        if (cardMatch.length < 2){ //ignore clicks ulness there are less than two items in the array
            evt.target.classList.add("open", "show");
            let cardMatchCount = cardMatch.push(evt.target);
            console.log(cardMatch, cardMatch.length, cardMatchCount);
            if (cardMatchCount > 1){

                if (cardMatch[0].dataset.card == cardMatch[1].dataset.card ){
                    console.log("cards match");
                    cardMatch[0].classList.add("match");
                    cardMatch[0].classList.remove("open", "show");
                    cardMatch[1].classList.add("match");
                    cardMatch[1].classList.remove("open", "show");
                    //let matchedCards = document.querySelectorAll(cardMatch[0].dataset.card);
                    //for (let matchedCard of matchedCards) {
                    //    console.log(matchedCard);
                    //    matchedCard.classList.add("match");
                    //}
                    cardMatch.length = 0;
                }
                else{
                console.log("now clearing unmatched");
                

                setTimeout(function(){clearUnmatchedCards();},2000);
                }
                updateMoveCounter("increment");
                console.log("stop propogation");
                evt.stopPropagation();
                // cardMatch.forEach(element => {
                // });
            }
        }
    }
    // if (cardMatchCount > 1){
    //     setTimeout(function(){hideCard(evt);},2000);
    //     cardMatch.forEach(element => {
            
    //     });
    // }
 }

//if the cards do not match, remove the cards from the list and hide the card's symbol
function clearUnmatchedCards(){
    console.log("clearUnmatched");
    console.log(cardMatch);
    let unmatchedCards = document.querySelectorAll("li.open", "li.show");
    console.log(unmatchedCards);
    for (let unmatchedCard of unmatchedCards) {
        //console.log(unmatchedCard);
        unmatchedCard.classList.remove("open", "show");
    }
    cardMatch.length = 0;
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



// find and return a list of elements with the class "card"
/*let deckOfCards = document.querySelectorAll(".card");

deckOfCards.forEach(function(cardInDeck) {
    cardInDeck.addEventListener("click", respondToTheClick());
});
*/
