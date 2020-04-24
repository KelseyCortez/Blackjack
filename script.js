
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function createCard(point, suit) {
    return { point, suit };
}
function createSuit(type) {
    let suit = [];
    // for (i = 1; i <= 13; i++) {
    //     suit.push(createCard(i, type));

    // }
    values.forEach(function (item){
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


dealButton.addEventListener('click', function (e) {
    const card1 = document.createElement('img');
    const card2 = document.createElement('img');
    const card3 = document.createElement('img');
    const card4 = document.createElement('img');
    card1.setAttribute('src', './images/5_of_hearts.png');
    card2.setAttribute('src', './images/king_of_spades.png');
    card3.setAttribute('src', './images/jack_of_diamonds.png');
    card4.setAttribute('src', './images/2_of_clubs.png');
    dealerHand.append(card1);
    dealerHand.append(card2);
    playerHand.append(card3);
    playerHand.append(card4);

})

hitButton.addEventListener('click', function (e) {
    const card = document.createElement('img');
    card.setAttribute('src', './images/6_of_clubs.png');
    playerHand.append(card);

})