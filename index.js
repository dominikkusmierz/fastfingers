const randomQuoteAPI =
  "https://api.quotable.io/random?minLength=200&maxLength=250";

const quoteContainer = document.querySelector(".quote");
const inputQuote = document.querySelector(".inputQuote");
const timer = document.querySelector(".timer");
inputQuote.addEventListener("input", () => {
  const arrayQuote = document.querySelectorAll(".quote span");
  const arrayValue = inputQuote.value.split("");
  let done = true;
  //Accuracy counter
  let correctChars = 0;
  let incorrectChars = 0;
  //Checking style
  arrayQuote.forEach((charQuote, index) => {
    const charInput = arrayValue[index];
    if (charInput === charQuote.innerText) {
      charQuote.style = "color:lightGreen";
      correctChars++;
    } else if (charInput == null) {
      charQuote.style = "";
      done = false;
    } else {
      charQuote.style = "color:red";
      incorrectChars++;
    }
  });
  //Display accuracy
  if (done) {
    displayAccuracy(correctChars, incorrectChars, done);
  }
});
//Try again button
const againBtn = document.querySelector(".again-button");
againBtn.addEventListener("click", () => {
  renderQuote();
});
//Timer
let startTime;

function startTimer() {
  
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function displayAccuracy(correct, incorrect, done) {
  const accuracyDiv = document.querySelector(".accuracy");
  let accuracy;
  if (incorrect == 0) {
    accuracy = 100;
  } else {
    accuracy = (correct / incorrect) * 100;
  }

  accuracy = Math.floor(accuracy);
  if (done && accuracyDiv.classList.contains("hide")) {
    accuracyDiv.classList.toggle("hide");
    accuracyDiv.innerHTML = `<h1>Accuracy ${accuracy}%</h1>
  <span>Correct words:${correct} Incorrect Words:${incorrect}</span>`;
    console.log("lll");
  }
}

function getQuote() {
  return fetch(randomQuoteAPI)
    .then((res) => res.json())
    .then((data) => data.content);
}

async function renderQuote() {
  quoteContainer.innerHTML = "";
  const quote = await getQuote();
  console.log(quote);
  quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quoteContainer.appendChild(charSpan);
  });
  startTimer();
}

renderQuote();
