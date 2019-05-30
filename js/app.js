let moveCount = 0;
let matchesFound;
let cardMatch = [];
let restart = document.querySelector(".restart");
restart.addEventListener("click", initialize);
let startTime;
let endTime;

function initialize() {

    matchesFound = 0;
    cardMatch.length = 0;
    startTime = performance.now();

    let cards = ["fa-anchor", "fa-anchor", "fa-bicycle", "fa-bicycle", "fa-bolt", "fa-bolt", "fa-bomb", "fa-bomb",
                "fa-cube", "fa-cube", "fa-diamond", "fa-diamond", "fa-leaf", "fa-leaf", "fa-paper-plane-o", "fa-paper-plane-o"];
    let stars = ["fa-star", "fa-star", "fa-star"];
    cards = shuffle(cards);
    updateMoveCounter("initialize");

    // Array​.prototype​.map()
    // MDN: The map() method creates a new array with the results of calling a provided function on every element in the calling array.
    let cardsHTML = cards.map(function(card) {
        return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
        });
    let starsHTML = stars.map(function(star) {
        return `<li><i class="fa ${star}"></i></li>`;
    });
    //console.log(starsHTML);

    // Array​.prototype​.join()
    // MDN: If separator is an empty string, all elements are joined without any characters in between them.
    let starbar = document.querySelector(".stars");
    starbar.innerHTML = starsHTML.join('');
    let deck = document.querySelector(".deck");
    deck.innerHTML = cardsHTML.join('');
    // using event delegation to use one eventlistener at the ul level instead of sixteen for all the li elements
    deck.addEventListener("click", cardClicked);

}
    
initialize();

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

    //increment move counter
    if (action == "initialize"){
        moveCount = 0;
    }
    else{
        moveCount += 1;
        }
    let moveCountClass = document.querySelector(".moves");
    moveCountClass.innerHTML = moveCount;
    // three stars for a perfect game of eight matches in eight moves
    if ((moveCount % 9 == 0) && (moveCount != 0) && (moveCount < 28)) {
        let element = document.querySelector(".fa-star"); 
        element.parentNode.removeChild(element);
    }
}

function cardClicked(evt) {
    //handles card clicks
    if (!evt.target.classList.contains("match") && !evt.target.classList.contains("open") && !evt.target.classList.contains("show")){
        if (cardMatch.length < 2){ //ignore clicks ulness there are less than two items in the array
            showCard(evt);
            //evt.target.classList.add("open", "show");
            let cardMatchCount = cardMatch.push(evt.target);
            //console.log(cardMatch, cardMatch.length, cardMatchCount);
            if (cardMatchCount > 1){
                checkMatch();
                evt.stopPropagation();
            }
        }
    }
 }

function showCard(evt){
     evt.target.classList.add("open", "show");
}

function winnerWinner(){
    endTime = performance.now();
    let winningTime = (endTime - startTime) / 1000;
    alert("Winner! Winner! Chicken Dinner! - Time: " + winningTime + " seconds.");
}

function checkMatch(){
    if (cardMatch[0].dataset.card == cardMatch[1].dataset.card) {

        cardMatch[0].classList.add("match");
        cardMatch[0].classList.remove("open", "show");
        cardMatch[1].classList.add("match");
        cardMatch[1].classList.remove("open", "show");
        matchesFound += 1;

        if (matchesFound == 8) {
            winnerWinner();
        }
        cardMatch.length = 0;
    }
    else {
        setTimeout(function () { clearUnmatchedCards(); }, 1000);
    }
    updateMoveCounter("increment");
}

//if the cards do not match, remove the cards from the list and hide the symbol
function clearUnmatchedCards(){
    let unmatchedCards = document.querySelectorAll("li.open", "li.show");
    for (let unmatchedCard of unmatchedCards) {
        //console.log(unmatchedCard);
        unmatchedCard.classList.remove("open", "show");
    }
    cardMatch.length = 0;
}
