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
            const cardsContainer = document.getElementById("cards-img-container")
            cardsContainer.children[0].innerHTML = `
                            <img src="${data.cards[0].image}" class="card"></img>
                        `
            cardsContainer.children[1].innerHTML = `
                            <img src="${data.cards[1].image}" class="card"></img>
                        `
        })
}

document.getElementById("draw-cards").addEventListener("click", drawCards)


