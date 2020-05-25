//sets values for cards
const values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

//sets query selectors 
let dealerPoints = document.querySelector('#dealer-points');
let playerPoints = document.querySelector('#player-points');
let messages = document.querySelector('#messages');

const dealerField = document.querySelector('#dealer-hand');
const playerField = document.querySelector('#player-hand');
const dealButton = document.querySelector('#deal-button');
const hitButton = document.querySelector('#hit-button');
const standButton = document.querySelector('#stand-button');


//functional deal button
dealButton.addEventListener('click', (function (e) {
    const card1 = randomCard();
    const card2 = randomCard();
    const card3 = randomCard();
    const card4 = randomCard();
    dealerField.append(card1);
    dealerField.append(card2);
    playerField.append(card3);
    playerField.append(card4);

}));



//creates the deck
function createCard(point, suit) {
    return { point, suit };

}
function createSuit(type) {
    let suit = [];
    values.forEach(function(item) {
        suit.push(createCard(item, type))
    })
    return suit;
}

function createDeck() {
    let deck = [];
    let hearts = createSuit('Hearts');
    let spades = createSuit('Spades');
    let diamonds = createSuit('Diamonds');
    let clubs = createSuit('Clubs');


    return deck.concat(hearts, spades, diamonds, clubs);
}
console.log(createDeck());

let deck = createDeck();
let dealerHand = [];
let playerHand = [];

//removes random card from the deck
function randomCard() {
    let removeRandomCard = deck[Math.floor(Math.random() * Math.floor(deck.length))];
    deck = deck.filter(function (card) {
        return card != removeRandomCard;
    })
    const cardImage = document.createElement('img');
    cardImage.setAttribute('src', `./images/${removeRandomCard.point}_of_${removeRandomCard.suit}.png`);
    console.log(cardImage);
    return cardImage
}

//functioning hit button
hitButton.addEventListener('click', (function (e) {
    const card = randomCard();
    playerField.append(card);

}));
//creates a score

function renderScore(point) {
    return `
    <div class="points">
    ${point}
    </div>`
};
// check for bust
function updateScoreDisplay() {
    let dealerPoints = calculatePoints(dealerHand);
    $('#dealer-points').text(dealerPoints);
    let playerPoints = calculatePoints(playerHand);
    $('#player-points').text(playerPoints);
}

// function dealDeck(deck){
//     messages.innerHTML = "";
//     dealerHand = [];
//     playerHand = [];

// }
function getCardImageUrl(card) {
    if (cardName = 'ace') {
        card.point === 1;
    } else if (cardName = 'jack') {
        card.point === 11;
    } else if (cardName = 'queen') {
        card.point === 12;
    } else if (cardName = 'king') {
        card.point === 13;
    } else {
        cardName = card.point;
    }
    return 'images/' + cardName + '_of_' + card.suit + '.png';
}

function dealACard(handArray, elementSelector) {
    card = deck.pop();
    handArray.push(card);
    cardUrl = getCardImageUrl(card);
    $(elementSelector).append(
        '<img src="' + cardUrl + '"/>'
    );
    updateScoreDisplay();
}

function calculatePoints(cards) {
    cards = cards.slice(0);
    cards.sort(function (a, b) {
        return b.point - a.point;
    });

};
standButton.click(function(e) {
    while (calculatePoints(dealerField) < 17) {
        dealACard(dealerField, '#dealer-hand');

    }
    // function gameOver() {
    //     $('#hit-button').hide();
    //     $('#stand-button').hide();
    //     $('#play-again').show();
    // }

    //check for busts

    if (calculatePoints(dealerHand) > 21) {
        // dealer busts
        $('#messages').text('Dealer busts! You win!');
    } else if (calculatePoints(playerHand) > 21) {
        // player busts
        $('#messages').text('You bust!');
    } else {
        // determine winner
        let dealerPoints = calculatePoints(dealerField);
        let playerPoints = calculatePoints(playerField);
        let messages = '';
        if (dealerPoints > playerPoints) {
            messages = 'You lose!';
        } else if (dealerPoints < playerPoints) {
            messages = 'You win!';
        } else {
            messages = 'Push.'
        }
        $('#messages').text(messages);
    }
    gameOver();
});


// return cards.reduce(function (sum, card) {
//     const point = card.point;
//     if (point > 10) {
//         point = 10;
//     }
//     if (point === 1 && sum < 11) {
//         point = 11;
//     }
//     return sum + point;
// }, 0);