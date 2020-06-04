//sets values for cards
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
    dealACard(playerHand, playerField);
    dealACard(playerHand, playerField);
    dealACard(dealerHand, dealerField);
    dealACard(dealerHand, dealerField);


}));



//creates the deck
function createCard(point, suit) {
    return { point, suit };

}
function createSuit(type) {
    let suit = [];
    values.forEach(function (item) {
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
let hasStand = false;

//removes random card from the deck
function randomCard() {
    let removeRandomCard = deck[Math.floor(Math.random() * deck.length)];
    let cardIndex = deck.findIndex(card => {
        return card.point === removeRandomCard.point && card.suit === removeRandomCard.suit;
    });
    deck.splice(cardIndex, 1);
    return removeRandomCard;
}

//functioning hit button
hitButton.addEventListener('click', (function (e) {
    dealACard(playerHand, playerField);
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
    let dPoints = calculatePoints(dealerHand);
    dealerPoints.textContent = dPoints;
    let pPoints = calculatePoints(playerHand);
    playerPoints.textContent = pPoints;
    whoWins();
}

function getCardImageUrl(card) {
    let cardName;
    if (card.point === 1) {
        cardName = 'ace';
    } else if (card.point === 11) {
        cardName = 'jack';
    } else if (card.point === 12) {
        cardName = 'queen';
    } else if (card.point === 13) {
        cardName = 'king';
    } else {
        cardName = card.point;
    }
    return 'images/' + cardName + '_of_' + card.suit + '.png';
}

function dealACard(handArray, elementSelector) {
    card = randomCard();
    handArray.push(card);
    cardUrl = getCardImageUrl(card);
    const cardImage = document.createElement('img');
    cardImage.setAttribute('src', cardUrl);
    elementSelector.append(cardImage);
    updateScoreDisplay();
}

function calculatePoints(cards) {
    cards.sort(function (a, b) {
        return b.point - a.point;
    })
    let total = 0;
    for (let card of cards) {
        if (card.point > 1 && card.point < 10) {
            total += card.point;
        } else if (card.point >= 10) {
            total += 10;
        } else {
            if (total > 10) {
                total += 1;

            } else {
                total += 11
            }
        }
    }
    return total;
};
standButton.addEventListener('click', function (e) {
    while (calculatePoints(dealerHand) < 17) {
        dealACard(dealerHand, dealerField);
        
    }
    hasStand = true;
    whoWins();
});

function whoWins() {
if (calculatePoints(playerHand) > 21) {
    // player busts
    messages.textContent = 'You bust!';
 } else if (calculatePoints(dealerHand) > 21) {
        // dealer busts
        messages.textContent = 'Dealer busts! You win!';
    } else if(hasStand) {
        // determine winner
        let dealerPoints = calculatePoints(dealerHand);
        let playerPoints = calculatePoints(playerHand);
        let msg = '';
        if (dealerPoints > playerPoints) {
            msg = 'You lose!';
        } else if (dealerPoints < playerPoints) {
            msg = 'You win!';
        } else {
            msg = 'Push.'
        }
        messages.textContent = msg;
    }
}