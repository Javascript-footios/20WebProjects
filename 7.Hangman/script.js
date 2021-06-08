const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

function getAWord() {
  return words[Math.floor(Math.random() * words.length)];
}

let selectedWord = getAWord();
const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : " "}
        </span>`
    )
    .join("")} `;

  // Remove the new line
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
    window.removeEventListener("keydown", keydownHandler);
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}`;

  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
    window.removeEventListener("keydown", keydownHandler);
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function keydownHandler(e) {
  // check if key is a letter
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    // if the guess is right
    if (selectedWord.includes(letter)) {
      // if the quess is not made before
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
      // if the guess is wrong
    } else {
      // if the quess is not made before
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
}

// keydown letter press
window.addEventListener("keydown", keydownHandler);

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  window.addEventListener("keydown", keydownHandler);
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = getAWord();

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
