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
            remainingCardsText.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
            
            drawCardsBtn.removeAttribute("disabled")
            
            computerScoreEl.textContent = `Computer Score: ${computerScore}`
            myScoreEl.textContent = `My Score: ${myScore}`
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
            remainingCardsText.textContent = `Remaining Cards: ${data.remaining}`

            cardsContainer.children[0].style.border = "none"
            cardsContainer.children[1].style.border = "none"

            if (data.remaining === 0) {
                drawCardsBtn.disabled = "true"
                if (computerScore > myScore) {
                    winnerText.textContent = "Computer wins, try again!"
                } else if (computerScore < myScore) {
                    winnerText.textContent = "Congrats, You Win!"
                } else {
                    winnerText.textContent = "Its a tie!"
                }
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
        winnerText.textContent = "Computer wins!"
        
        computerScore++
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
    } 
    
    if (card1ValueIndex === card2ValueIndex) {
        winnerText.textContent = "War!"
    } 
    
    if (card1ValueIndex < card2ValueIndex) {
        winnerText.textContent = "You win!"

        myScore++
        myScoreEl.textContent = `My Score: ${myScore}` 
    }
}

