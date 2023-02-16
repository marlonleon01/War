const baseUrl = "https://apis.scrimba.com/deckofcards/api/deck/"
const cardsContainer = document.getElementById("cards-img-container")
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
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
            cardsContainer.children[0].innerHTML = `
                            <img src="${data.cards[0].image}" class="card"></img>
                        `
            cardsContainer.children[1].innerHTML = `
                            <img src="${data.cards[1].image}" class="card"></img>
                        `
        })
}

drawCardsBtn.addEventListener("click", drawCards)


