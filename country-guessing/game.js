// Country data: name and ISO 3166-1 alpha-2 code (for flagcdn.com)
const COUNTRIES = [
  { name: 'United States', code: 'us' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'France', code: 'fr' },
  { name: 'Germany', code: 'de' },
  { name: 'Japan', code: 'jp' },
  { name: 'Brazil', code: 'br' },
  { name: 'Canada', code: 'ca' },
  { name: 'Australia', code: 'au' },
  { name: 'India', code: 'in' },
  { name: 'Italy', code: 'it' },
  { name: 'Spain', code: 'es' },
  { name: 'Mexico', code: 'mx' },
  { name: 'South Korea', code: 'kr' },
  { name: 'China', code: 'cn' },
  { name: 'Russia', code: 'ru' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'Sweden', code: 'se' },
  { name: 'Norway', code: 'no' },
  { name: 'Poland', code: 'pl' },
  { name: 'Argentina', code: 'ar' },
  { name: 'South Africa', code: 'za' },
  { name: 'Egypt', code: 'eg' },
  { name: 'Turkey', code: 'tr' },
  { name: 'Portugal', code: 'pt' },
  { name: 'Greece', code: 'gr' },
  { name: 'Switzerland', code: 'ch' },
  { name: 'Belgium', code: 'be' },
  { name: 'Austria', code: 'at' },
  { name: 'Ireland', code: 'ie' },
  { name: 'New Zealand', code: 'nz' },
  { name: 'Thailand', code: 'th' },
  { name: 'Indonesia', code: 'id' },
  { name: 'Philippines', code: 'ph' },
  { name: 'Vietnam', code: 'vn' },
  { name: 'Israel', code: 'il' },
  { name: 'Ukraine', code: 'ua' },
  { name: 'Czech Republic', code: 'cz' },
  { name: 'Romania', code: 'ro' },
  { name: 'Hungary', code: 'hu' },
  { name: 'Denmark', code: 'dk' },
  { name: 'Finland', code: 'fi' },
  { name: 'Chile', code: 'cl' },
  { name: 'Colombia', code: 'co' },
  { name: 'Peru', code: 'pe' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Kenya', code: 'ke' },
  { name: 'Morocco', code: 'ma' },
  { name: 'Saudi Arabia', code: 'sa' },
  { name: 'United Arab Emirates', code: 'ae' },
  { name: 'Malaysia', code: 'my' },
  { name: 'Singapore', code: 'sg' },
];

const FLAG_BASE = 'https://flagcdn.com/w320/';
const NUM_CHOICES = 4;
const LIVES = 3;

let score = 0;
let lives = LIVES;
let currentCountry = null;
let usedIndices = [];

const startScreen = document.getElementById('start-screen');
const playScreen = document.getElementById('play-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const flagImg = document.getElementById('flag-img');
const answersEl = document.getElementById('answers');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const finalScoreEl = document.getElementById('final-score');

function showScreen(screen) {
  startScreen.classList.add('hidden');
  playScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  screen.classList.remove('hidden');
}

function updateUI() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
}

function getRandomCountry() {
  const available = COUNTRIES.map((_, i) => i).filter(i => !usedIndices.includes(i));
  if (available.length === 0) usedIndices = [];
  const pool = available.length ? available : COUNTRIES.map((_, i) => i);
  const idx = pool[Math.floor(Math.random() * pool.length)];
  usedIndices.push(idx);
  return COUNTRIES[idx];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWrongAnswers(correctName, count) {
  const others = COUNTRIES
    .map(c => c.name)
    .filter(n => n !== correctName);
  const shuffled = shuffle(others);
  return shuffled.slice(0, count);
}

function buildChoices() {
  const wrong = getWrongAnswers(currentCountry.name, NUM_CHOICES - 1);
  const choices = shuffle([currentCountry.name, ...wrong]);
  return choices;
}

function setRound() {
  currentCountry = getRandomCountry();
  flagImg.src = `${FLAG_BASE}${currentCountry.code}.png`;
  flagImg.alt = 'Country flag';
  const choices = buildChoices();
  answersEl.innerHTML = '';
  feedbackEl.textContent = '';
  feedbackEl.classList.add('hidden');
  feedbackEl.classList.remove('correct', 'wrong');

  choices.forEach(name => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = name;
    btn.addEventListener('click', () => handleAnswer(btn, name));
    answersEl.appendChild(btn);
  });
}

function disableButtons() {
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === currentCountry.name) {
      btn.classList.add('correct');
    }
  });
}

function handleAnswer(btn, chosenName) {
  document.querySelectorAll('.answer-btn').forEach(b => (b.disabled = true));
  const isCorrect = chosenName === currentCountry.name;

  if (isCorrect) {
    score++;
    btn.classList.add('correct');
    feedbackEl.textContent = 'Correct!';
    feedbackEl.classList.add('correct');
    feedbackEl.classList.remove('hidden');
    updateUI();
    setTimeout(() => setRound(), 800);
  } else {
    lives--;
    btn.classList.add('wrong');
    const correctBtn = [...answersEl.querySelectorAll('.answer-btn')].find(
      b => b.textContent === currentCountry.name
    );
    if (correctBtn) correctBtn.classList.add('correct');
    feedbackEl.textContent = `Wrong! It was ${currentCountry.name}.`;
    feedbackEl.classList.add('wrong');
    feedbackEl.classList.remove('hidden');
    updateUI();
    if (lives <= 0) {
      setTimeout(endGame, 1200);
    } else {
      setTimeout(() => setRound(), 1200);
    }
  }
}

function endGame() {
  finalScoreEl.textContent = score;
  showScreen(endScreen);
}

function startGame() {
  score = 0;
  lives = LIVES;
  usedIndices = [];
  updateUI();
  showScreen(playScreen);
  setRound();
}

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);
