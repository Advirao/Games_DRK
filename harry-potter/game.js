// Harry Potter characters with multiple clues each
const CHARACTERS = [
  { name: 'Harry Potter', clues: ['The Boy Who Lived', 'Defeated Voldemort as a baby', 'Has a lightning bolt scar', 'Gryffindor seeker', 'The Chosen One'] },
  { name: 'Hermione Granger', clues: ['Brightest witch of her age', 'Best friend of Harry and Ron', 'Loves books and rules', 'Uses a Time-Turner in third year', 'Fought in the Department of Mysteries'] },
  { name: 'Ron Weasley', clues: ['Harry\'s best friend', 'Has red hair and freckles', 'Brother of Fred and George', 'Keeper for Gryffindor', 'Owns a rat named Scabbers'] },
  { name: 'Albus Dumbledore', clues: ['Headmaster of Hogwarts', 'Had a phoenix named Fawkes', 'One of the greatest wizards', 'Wore half-moon spectacles', 'Keeper of the Elder Wand'] },
  { name: 'Severus Snape', clues: ['Potions master at Hogwarts', 'Always in black', 'Head of Slytherin', 'The Half-Blood Prince', 'Always'] },
  { name: 'Lord Voldemort', clues: ['He Who Must Not Be Named', 'Dark Lord', 'Split his soul into Horcruxes', 'Had a snake named Nagini', 'Killed Harry\'s parents'] },
  { name: 'Draco Malfoy', clues: ['Blonde Slytherin', 'Son of Lucius Malfoy', 'Harry\'s rival at school', 'Was chosen to kill Dumbledore', 'Had a pet ferret incident'] },
  { name: 'Sirius Black', clues: ['Harry\'s godfather', 'Escaped from Azkaban', 'Animagus - a black dog', 'Member of the Order', 'Died in the Department of Mysteries'] },
  { name: 'Remus Lupin', clues: ['Defense Against the Dark Arts teacher', 'Werewolf', 'Member of the Marauders', 'Married Tonks', 'Kind and patched robes'] },
  { name: 'Rubeus Hagrid', clues: ['Keeper of Keys at Hogwarts', 'Half-giant', 'Loves magical creatures', 'Expelled in third year', 'Has a pink umbrella'] },
  { name: 'Minerva McGonagall', clues: ['Deputy Headmistress', 'Transfiguration teacher', 'Animagus - a cat', 'Head of Gryffindor', 'Strict but fair'] },
  { name: 'Dobby', clues: ['Free elf', 'Served the Malfoys', 'Loved Harry Potter', 'Wore odd clothes when free', 'Died saving Harry and friends'] },
  { name: 'Neville Longbottom', clues: ['Gryffindor who stood up to friends', 'Good at Herbology', 'Killed Nagini with the Sword', 'Lost his toad Trevor', 'Lived with his grandmother'] },
  { name: 'Luna Lovegood', clues: ['Ravenclaw with dreamy eyes', 'Believed in Nargles', 'Called Loony by some', 'Father runs The Quibbler', 'Could see Thestrals'] },
  { name: 'Ginny Weasley', clues: ['Ron\'s younger sister', 'Broke the diary Horcrux', 'Chaser for Gryffindor', 'Married Harry', 'Possessed by Tom Riddle'] },
  { name: 'Fred Weasley', clues: ['Twin who ran Weasleys\' Wizard Wheezes', 'Prankster with George', 'Died in the Battle of Hogwarts', 'Left ear lost in the raid', 'Gryffindor beater'] },
  { name: 'George Weasley', clues: ['Twin who ran the joke shop', 'Lost an ear to Snape\'s spell', 'Survived the Battle of Hogwarts', 'Partner in pranks with Fred', 'Gryffindor beater'] },
  { name: 'Bellatrix Lestrange', clues: ['Voldemort\'s most loyal follower', 'Killed Sirius Black', 'Tortured Hermione', 'Mad and dangerous', 'Died by Molly Weasley'] },
  { name: 'Lily Potter', clues: ['Harry\'s mother', 'Red hair, green eyes', 'Died protecting Harry', 'Best at Potions', 'Snape loved her'] },
  { name: 'James Potter', clues: ['Harry\'s father', 'Animagus - a stag', 'Marauder named Prongs', 'Died protecting his family', 'Best friend of Sirius'] },
  { name: 'Peter Pettigrew', clues: ['Marauder named Wormtail', 'Animagus - a rat', 'Betrayed the Potters', 'Silver hand from Voldemort', 'Killed by his own hand'] },
  { name: 'Dolores Umbridge', clues: ['Pink and toad-like', 'High Inquisitor at Hogwarts', 'Used a blood quill', 'Sent to Azkaban', 'Loved kittens on plates'] },
  { name: 'Gilderoy Lockhart', clues: ['Defense teacher in second year', 'Famous for books he didn\'t write', 'Lost his memory', 'Blonde and vain', 'Signed photos everywhere'] },
  { name: 'Molly Weasley', clues: ['Ron\'s mother', 'Killed Bellatrix', 'Knitted sweaters for Harry', 'Not my daughter, you bitch!', 'Order of the Phoenix member'] },
  { name: 'Arthur Weasley', clues: ['Ron\'s father', 'Loves Muggles', 'Works in Misuse of Muggle Artifacts', 'Attacked by Nagini', 'Flying car with Harry'] },
  { name: 'Tom Riddle', clues: ['Young Voldemort', 'Opened the Chamber of Secrets', 'Made his first Horcrux at school', 'Orphan from Wool\'s Orphanage', 'Handsome and charming'] },
];

const NUM_CHOICES = 4;
const LIVES = 3;

let score = 0;
let lives = LIVES;
let currentCharacter = null;
let usedIndices = [];

const startScreen = document.getElementById('start-screen');
const playScreen = document.getElementById('play-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const clueText = document.getElementById('clue-text');
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

function getRandomCharacter() {
  const available = CHARACTERS.map((_, i) => i).filter(i => !usedIndices.includes(i));
  if (available.length === 0) usedIndices = [];
  const pool = available.length ? available : CHARACTERS.map((_, i) => i);
  const idx = pool[Math.floor(Math.random() * pool.length)];
  usedIndices.push(idx);
  return CHARACTERS[idx];
}

function getRandomClue(character) {
  const clues = character.clues;
  return clues[Math.floor(Math.random() * clues.length)];
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
  const others = CHARACTERS
    .map(c => c.name)
    .filter(n => n !== correctName);
  const shuffled = shuffle(others);
  return shuffled.slice(0, count);
}

function buildChoices() {
  const wrong = getWrongAnswers(currentCharacter.name, NUM_CHOICES - 1);
  const choices = shuffle([currentCharacter.name, ...wrong]);
  return choices;
}

function setRound() {
  currentCharacter = getRandomCharacter();
  clueText.textContent = getRandomClue(currentCharacter);
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

function handleAnswer(btn, chosenName) {
  document.querySelectorAll('.answer-btn').forEach(b => (b.disabled = true));
  const isCorrect = chosenName === currentCharacter.name;

  if (isCorrect) {
    score++;
    btn.classList.add('correct');
    feedbackEl.textContent = 'Correct! ⚡';
    feedbackEl.classList.add('correct');
    feedbackEl.classList.remove('hidden');
    updateUI();
    setTimeout(() => setRound(), 800);
  } else {
    lives--;
    btn.classList.add('wrong');
    const correctBtn = [...answersEl.querySelectorAll('.answer-btn')].find(
      b => b.textContent === currentCharacter.name
    );
    if (correctBtn) correctBtn.classList.add('correct');
    feedbackEl.textContent = `Wrong! It was ${currentCharacter.name}.`;
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
