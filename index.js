const baseUrl = "https://apis.scrimba.com/deckofcards/api/deck/"
const cardsContainer = document.getElementById("cards-img-container")
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
const winnerTitle = document.getElementById("winner-title")
let deckId

function handleClick() {
    fetch(`${baseUrl}new/shuffle/`)
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
        })
}

newDeckBtn.addEventListener("click", handleClick)

function drawCards() {
    fetch(`${baseUrl}${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            determineCardWinner(data.cards[0].value, data.cards[1].value)
            cardsContainer.children[0].innerHTML = `
                            <img src="${data.cards[0].image}" class="card"></img>
                        `
            cardsContainer.children[1].innerHTML = `
                            <img src="${data.cards[1].image}" class="card"></img>
                        `
        })
}

drawCardsBtn.addEventListener("click", drawCards)


function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const card1ValueIndex = valueOptions.indexOf(card1)
    const card2ValueIndex = valueOptions.indexOf(card2)

    if (card1ValueIndex > card2ValueIndex) {
        winnerTitle.innerHTML = "Computer wins!"
    } if (card1ValueIndex === card2ValueIndex) {
        winnerTitle.innerHTML = "War!"
    } if (card1ValueIndex < card2ValueIndex) {
        winnerTitle.innerHTML = "You win!"
    }
}

