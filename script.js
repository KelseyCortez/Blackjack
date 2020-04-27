
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

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


const dealerHand = document.querySelector('#dealer-hand');
const playerHand = document.querySelector('#player-hand');
const dealButton = document.querySelector('#deal-button');
const hitButton = document.querySelector('#hit-button');
const standButton = document.querySelector('#stand-button');

function randomCard() {
    let removeRandomCard = deck[Math.floor(Math.random() * Math.floor(deck.length))];
    deck = deck.filter(function (card) {
        return card != removeRandomCard
    })
const cardImage = document.createElement('img')
cardImage.setAttribute('src', `.images/${removeRandomCard.point}${removeRandomCard.suit}.png`);

console.log(cardImage);


    dealButton.addEventListener('click', function (e) {
        const card1 = randomCard();
        const card2 = randomCard();
        const card3 = randomCard();
        const card4 = randomCard();
        dealerHand.append(card1);
        dealerHand.append(card2);
        playerHand.append(card3);
        playerHand.append(card4);

    })

    hitButton.addEventListener('click', function (e) {
        const card = randomCard();
        playerHand.append(card);

    })


    function getCardImageUrl(card) {
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
        return '/images/' + cardName + '_of_' + card.suit + '.png';
    }

    function calculatePoints(cards) {
        cards = cards.slice(0);
        cards.sort(function (a, b) {
            return b.point - a.point;
        });

    }
    return cards.reduce(function (sum, card) {
        const point = card.point;
        if (point > 10) {
            point = 10;
        }
        if (point === 1 && sum < 11) {
            point = 11;
        }
        return sum + point;
    })

        ('#stand-button').click(function() {
            while (calculatePoints(dealerHand) < 17) {
                dealACard(dealerHand, '#dealer-hand');
            }
            // check for bust
            if (calculatePoints(dealerHand) > 21) {
                // dealer busts
                $('#messages').text('Dealer busts! You win!');
            } else if (calculatePoints(playerHand) > 21) {
                // player busts
                $('#messages').text('You bust!');
            } else {
                // determine winner
                const dealerPoints = calculatePoints(dealerHand);
                const playerPoints = calculatePoints(playerHand);
                const message = '';
                if (dealerPoints > playerPoints) {
                    message = 'You lose!';
                } else if (dealerPoints < playerPoints) {
                    message = 'You win!';
                } else {
                    message = 'Push.'
                }
                $('#messages').text(message);
            }
            gameOver();
        });



    function buttons() {
        $('#play-again').click(function () {
            $('#deal-button').show();
            $('#hit-button').show();
            $('#stand-button').show();
            $('#play-again').hide();
            $('#player-hand').html('');
            $('#dealer-hand').html('');
            $('#messages').text('');
            $('#player-points').text('');
            $('#dealer-points').text('');
            setupNewGame();
        });
    }

    function gameOver() {
        $('#hit-button').hide();
        $('#stand-button').hide();
        $('#play-again').show();
    }

    function updateScoreDisplay() {
        var dealerPoints = calculatePoints(dealerHand);
        $('#dealer-points').text(dealerPoints);
        var playerPoints = calculatePoints(playerHand);
        $('#player-points').text(playerPoints);
    }

    function dealACard(handArray, elementSelector) {
        card = deck.pop();
        handArray.push(card);
        cardUrl = getCardImageUrl(card);
        $(elementSelector).append(
            '<img src="' + cardUrl + '">'
        );
        updateScoreDisplay();
    }

    function setupNewGame() {
        deck = newDeck();
        deck = _.shuffle(deck);
        dealerHand = [];
        playerHand = [];
    }

};