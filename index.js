const baseUrl = "https://apis.scrimba.com/deckofcards/api/deck/"
let deckId

function handleClick() {
    fetch(`${baseUrl}new/shuffle/`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)

function drawCards() {
    fetch(`${baseUrl}${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const cardSlot1 = document.getElementById("card-slot1")
            const cardSlot2 = document.getElementById("card-slot2")
            cardSlot1.innerHTML = `<img src="${data.cards[0].image}"></img>`
            cardSlot2.innerHTML = `<img src="${data.cards[1].image}"></img>`
        })
}

document.getElementById("draw-cards").addEventListener("click", drawCards)


