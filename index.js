const baseUrl = "https://apis.scrimba.com/deckofcards/api/deck/"
const cardsContainer = document.getElementById("cards-img-container")
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
const winnerText = document.getElementById("winner-text")
const remainingCardsText = document.getElementById("cards-remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("your-score")
let computerScore = 0
let myScore = 0
let deckId

function handleClick() {
    fetch(`${baseUrl}new/shuffle/`)
        .then(res => res.json())
        .then(data => {
            remainingCardsText.innerHTML = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
            
            drawCardsBtn.removeAttribute("disabled")
            
            computerScoreEl.innerHTML = `Computer Score: ${computerScore}`
            myScoreEl.innerHTML = `My Score: ${myScore}`
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
            remainingCardsText.innerHTML = `Remaining Cards: ${data.remaining}`

            cardsContainer.children[0].style.border = "none"
            cardsContainer.children[1].style.border = "none"

            if (data.remaining === 0) {
                drawCardsBtn.disabled = "true"
            }

            if (data.remaining === 0 && computerScore > myScore) {
                winnerText.innerHTML = "Computer wins, try again!"
            } else if (data.remaining === 0 && computerScore < myScore) {
                winnerText.innerHTML = "Congrats, You Win!"
            }
        })
}

drawCardsBtn.addEventListener("click", drawCards)


function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const card1ValueIndex = valueOptions.indexOf(card1)
    const card2ValueIndex = valueOptions.indexOf(card2)

    if (card1ValueIndex > card2ValueIndex) {
        winnerText.innerHTML = "Computer wins!"
        
        computerScore = computerScore + 1
        computerScoreEl.innerHTML = `Computer Score: ${computerScore}`
    } 
    
    if (card1ValueIndex === card2ValueIndex) {
        winnerText.innerHTML = "War!"
    } 
    
    if (card1ValueIndex < card2ValueIndex) {
        winnerText.innerHTML = "You win!"

        myScore = myScore + 1
        myScoreEl.innerHTML = `My Score: ${myScore}` 
    }
}

