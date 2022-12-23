// HTML Elements

const playButton = document.querySelector('.preview__button');
const preview = document.querySelector('.preview');
const game = document.querySelector('.game');
const controls = document.querySelector('.controls');
const controlsButtons = document.querySelectorAll('.controls__button');
const humanHand = document.querySelector('.human__hand');
const alienHand = document.querySelector('.alien__hand');

showPreveiw ();

// Game Settings

const gameSettings= {
  hScore: 0,
  aScore: 0,

  startGame() {
    preview.classList.remove('fade-in');
    preview.classList.add('fade-out');
    game.classList.remove('hidden');

    setTimeout(() => {
      preview.classList.add('hidden');
      game.classList.remove('fade-out');
      game.classList.add('fade-in');
    }, 500)
  },

  playersHands: [
    // Human hand
    {
      rock: 'images/hRock.png',
      scissors: 'images/hScissors.png',
      paper: 'images/hPaper.png',
      preview: 'images/hPreview.png',
    },
    // Alien hand
    {
      rock: 'images/aRock.png',
      scissors: 'images/aScissors.png',
      paper: 'images/aPaper.png',
      preview: 'images/aPreview.png',
    }
  ],

  updateScore() {
    const humanScore = document.querySelector('.human__title');
    const alienScore = document.querySelector('.alien__title');
    humanScore.textContent = `Human : ${gameSettings.hScore}`;
    alienScore.textContent = `Alien : ${gameSettings.aScore}`;
  },

  animationHands() {
    humanHand.style.animation = `shakeHands 2s ease-in-out`;
    alienHand.style.animation = `shakeHands 2s ease-in-out`;
    // Disable buttons
    controlsButtons.forEach(button => button.disabled = true)
  },

  updateAnimation() {
    this.style.animation = '';
  },

  updateHands() {
    humanHand.src = gameSettings.playersHands[0].preview;
    humanHand.style.width = `480px`;
    humanHand.style.height = `330px`;
    humanHand.style.left = `-5%`;
    humanHand.style.top = `0`;
    alienHand.src = gameSettings.playersHands[1].preview;
    // Activaite buttons
    controlsButtons.forEach(button => button.disabled = false);
  },

  updateCurrentButton(e) {
    let target = e.target;

    if (target.hasAttribute('type')) {
      target.classList.add('controls__button--active');
    }

    setTimeout(() => {
      target.classList.remove('controls__button--active');
    }, 3100)
  },

  handsMatch(e) {
    let target = e.target;

    if (target.hasAttribute('type')) {
      let aChoice = getRandomInt();

      gameSettings.animationHands();

      setTimeout(() => {

      // Alien's hand variants
      if (aChoice === 0) {
        alienHand.src = gameSettings.playersHands[1].rock;
      }
      if (aChoice === 1) {
        alienHand.src = gameSettings.playersHands[1].scissors;

      }
      if (aChoice === 2) {
        alienHand.src = gameSettings.playersHands[1].paper;
      }

      // Human's hand variants
      if (target.textContent === 'Rock') {
        humanHand.src = gameSettings.playersHands[0].rock;
        humanHand.style.height = `240px`;
        humanHand.style.left = `-125px`;
        humanHand.style.top = `70px`;

        // Rock - Rock
        if (aChoice === 0) {
          gameSettings.hScore++;
          gameSettings.aScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200);
          return;
        }
        // Rock - Scissors
        if (aChoice === 1) {
          gameSettings.hScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200)
          return;
        }
        // Rock - Paper
        if (aChoice === 2) {
          gameSettings.aScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200)
          return;
        }
      }
      if (target.textContent === 'Scissors') {
        humanHand.src = gameSettings.playersHands[0].scissors;
        humanHand.style.height = `345px`;
        humanHand.style.left = `-140px`;
        humanHand.style.top = `10px`;

        // Scissors - Rock
        if (aChoice === 0) {
          gameSettings.aScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200)
          return;
        }
        // Scissors - Scissors
        if (aChoice === 1) {
          gameSettings.hScore++;
          gameSettings.aScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200)
          return;
        }
        // Scissors - Paper
        if (aChoice === 2) {
          gameSettings.hScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200)
          return;
        }
      }
      if (target.textContent === 'Paper') {
        humanHand.src = gameSettings.playersHands[0].paper;
        humanHand.style.height = `300px`;
        humanHand.style.left = `-110px`;
        humanHand.style.top = `40px`;

        // Paper - Rock
        if (aChoice === 0) {
          gameSettings.hScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200)
          return;
        }
        // Paper - Scissors
        if (aChoice === 1) {
          gameSettings.aScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200)
          return;
        }
        // Paper - Paper
        if (aChoice === 2) {
          gameSettings.hScore++;
          gameSettings.aScore++;
          gameSettings.updateScore();
          setTimeout(() => {
            gameSettings.updateHands();
          }, 1200)
          return;
        }
      }

      }, 1800)

    } else {
      return;
    }
  },
}


// Event Listeners

// Start game
playButton.addEventListener('click', gameSettings.startGame, {once: true});

// Rock, Paper, Scissors buttons
controls.addEventListener('click', gameSettings.handsMatch);
controls.addEventListener('click', gameSettings.updateCurrentButton);

// Hands animation
humanHand.addEventListener('animationend', gameSettings.updateAnimation);
alienHand.addEventListener('animationend', gameSettings.updateAnimation);

// Utils

function showPreveiw () {
  const lines = [
    'Caution! The result of the game can affect the situation in the world...',
    'If the alien wins, the foreign brands will leave Russia...',
    'If you win, food prices will become cheaper...',
    'Probably...',
  ]

  let lineCount = 0;
  let letterCount = 0;
  let output = '';
  let htmlOuput = document.querySelector('p');

  function typeText () {

    const textDelay = setTimeout(() => {
      output += lines[lineCount][letterCount];
      htmlOuput.textContent = output;
      letterCount++;

      if (letterCount >= lines[lineCount].length) {
        letterCount = 0;
        output = '';
        lineCount++;

        if (lineCount === lines.length) {
          clearTimeout(textDelay);
          return;
        }
      }

      typeText()
    }, 100)

  }

  typeText()
}

function getRandomInt () {
  return Math.floor(Math.random() * 3);
} 
