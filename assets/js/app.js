
const cardArray = [
  { name: 'balance', img: '/assets/img/balance.png' },
  { name: 'basket', img: '/assets/img/basket.png' },
  { name: 'books', img: '/assets/img/books.png' },
  { name: 'bowling', img: '/assets/img/bowling.png' },
  { name: 'camera', img: '/assets/img/camera.png' },
  { name: 'diamond', img: '/assets/img/diamond.png' },
  { name: 'dolls', img: '/assets/img/dolls.png' },
  { name: 'tengu', img: '/assets/img/tengu.png' },
  { name: 'balance', img: '/assets/img/balance.png' },
  { name: 'basket', img: '/assets/img/basket.png' },
  { name: 'books', img: '/assets/img/books.png' },
  { name: 'bowling', img: '/assets/img/bowling.png' },
  { name: 'camera', img: '/assets/img/camera.png' },
  { name: 'diamond', img: '/assets/img/diamond.png' },
  { name: 'dolls', img: '/assets/img/dolls.png' },
  { name: 'tengu', img: '/assets/img/tengu.png' },
];

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
const timeLeft = document.querySelector("#time-left");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let currentTime = 60;
let timerId = null

createBoard()
alert("Let's play Memory game!")
let countDownTimerId = setInterval(countDown, 1000)
function countDown() {
  currentTime--
  timeLeft.textContent = currentTime
  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    alert('GAME OVER! Your final score is ' + cardsWon.length)
    playAgain()
  }
}

cardArray.sort(() => 0.5 - Math.random())
function createBoard() {
  cardArray.forEach((card, index) => {
    const cardElement = document.createElement("img");
    cardElement.setAttribute("src", "assets/img/card.png");
    cardElement.setAttribute("data-id", index);
    cardElement.addEventListener("click", flipCard);
    grid.appendChild(cardElement);
  });
}
function playAgain() {
  let playAgain = confirm("Want to Play again?")
  location.reload();
}

function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const [optionOneId, optionTwoId] = cardsChosenId;
  const [optionOne, optionTwo] = cardsChosen;
  if (optionOneId === optionTwoId) {
    alert("Try Again.");
  } else if (optionOne === optionTwo) {
    alert("IT'S A MATCH!");
    cardsWon.push(cardsChosen);
    cardsChosenId.forEach(id => {
      cards[id].setAttribute("src", "assets/img/white.png");
      cards[id].style.border = "none";
      cards[id].removeEventListener("click", flipCard);
    });
  } else {
    cardsChosenId.forEach(id => {
      cards[id].setAttribute("src", "assets/img/card.png");
    });
    alert("Sorry, try again.");
  }

  cardsChosen = [];
  cardsChosenId = [];
  resultDisplay.textContent = cardsWon.length;
  if (cardsWon.length === cardArray.length / 2) {
    alert("CONGRATULATIONS, YOU FOUND THEM ALL!");
    playAgain()
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}
