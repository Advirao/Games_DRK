(function () {
  const MIN = 1;
  const MAX = 100;

  let secretNumber;
  let guessCount;
  let gameOver;

  const guessInput = document.getElementById('guess-input');
  const guessBtn = document.getElementById('guess-btn');
  const feedback = document.getElementById('feedback');
  const guessCountEl = document.getElementById('guess-count');
  const rangeLow = document.getElementById('range-low');
  const rangeHigh = document.getElementById('range-high');
  const playScreen = document.getElementById('play-screen');
  const winScreen = document.getElementById('win-screen');
  const secretNumberEl = document.getElementById('secret-number');
  const totalGuessesEl = document.getElementById('total-guesses');
  const guessPlural = document.getElementById('guess-plural');
  const playAgainBtn = document.getElementById('play-again-btn');

  function init() {
    secretNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    guessCount = 0;
    gameOver = false;
    feedback.textContent = '';
    feedback.className = 'feedback';
    guessCountEl.textContent = '';
    rangeLow.textContent = MIN;
    rangeHigh.textContent = MAX;
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    playScreen.classList.remove('hidden');
    winScreen.classList.add('hidden');
    guessInput.focus();
  }

  function updateRange(guess) {
    const low = parseInt(rangeLow.textContent, 10);
    const high = parseInt(rangeHigh.textContent, 10);
    if (guess < secretNumber && guess >= low) rangeLow.textContent = guess + 1;
    if (guess > secretNumber && guess <= high) rangeHigh.textContent = guess - 1;
  }

  function handleGuess() {
    const value = guessInput.value.trim();
    if (!value) return;

    const guess = parseInt(value, 10);
    if (Number.isNaN(guess) || guess < MIN || guess > MAX) {
      feedback.textContent = `Please enter a number between ${MIN} and ${MAX}.`;
      feedback.className = 'feedback';
      return;
    }

    guessCount++;
    guessCountEl.textContent = `Guesses: ${guessCount}`;
    updateRange(guess);

    if (guess === secretNumber) {
      gameOver = true;
      feedback.textContent = 'Correct!';
      feedback.className = 'feedback correct';
      guessInput.disabled = true;
      guessBtn.disabled = true;
      playScreen.classList.add('hidden');
      winScreen.classList.remove('hidden');
      secretNumberEl.textContent = secretNumber;
      totalGuessesEl.textContent = guessCount;
      guessPlural.textContent = guessCount === 1 ? '' : 'es';
      return;
    }

    if (guess > secretNumber) {
      feedback.textContent = 'Too high! Try a lower number.';
      feedback.className = 'feedback too-high';
    } else {
      feedback.textContent = 'Too low! Try a higher number.';
      feedback.className = 'feedback too-low';
    }
    guessInput.value = '';
    guessInput.focus();
  }

  guessBtn.addEventListener('click', handleGuess);
  guessInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleGuess();
  });
  playAgainBtn.addEventListener('click', init);

  init();
})();
