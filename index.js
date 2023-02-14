const newDeckBtn = document.getElementById("new-deck")

newDeckBtn.addEventListener("click", newDeck)

function newDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => console.log(data))
}


