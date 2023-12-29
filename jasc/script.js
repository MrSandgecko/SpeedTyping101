const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistakes span");
const wpmTag = document.querySelector(".wpm span");
tryAgain = document.querySelector("button");

let charNumber = 0;

let mistakes = 0;

let isTyping = 0;

let timer;
let maxTime = 60;
timeLeft = maxTime;

function randomTexts() {
  let randNumber = Math.floor(Math.random() * Texts.length);
  typingText.innerHTML = "";
  Texts[randNumber].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charNumber];
  if (charNumber < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = 1;
    }
    if (typedChar == null) {
      charNumber--;
      if (characters[charNumber].classList.contains("Wrong")) {
        mistakes--;
      }

      characters[charNumber].classList.remove("Right", "Wrong");
    } else {
      if (characters[charNumber].innerText === typedChar) {
        characters[charNumber].classList.add("Right");
      } else {
        mistakes++;
        characters[charNumber].classList.add("Wrong");
      }
      charNumber++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charNumber].classList.add("active");

    mistakeTag.innerText = mistakes;
    let wordsPM = Math.round(
      ((charNumber - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wordsPM = wordsPM < 0 || !wordsPM || wordsPM === Infinity ? 0 : wordsPM;
    wpmTag.innerText = wordsPM;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft + "s";
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  randomTexts();
  timeLeft = maxTime;
  inputField.value = "";
  clearInterval(timer);
  timeTag.innerText = timeLeft + "s";
  charNumber = 0;
  mistakes = 0;
  isTyping = 0;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  //   characters[charNumber].classList.remove("active");
}

randomTexts();
inputField.addEventListener("input", initTyping);
tryAgain.addEventListener("click", resetGame);
