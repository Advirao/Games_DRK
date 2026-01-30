# Country Guessing Game

A simple web game: guess the country from its flag.

## How to play

1. Open `index.html` in your browser (double-click or drag into Chrome/Edge/Firefox).
2. Click **Start Game**.
3. You see a flag and four country names. Click the correct one.
4. You have 3 lives. Wrong answers cost one life; correct answers add to your score.
5. Game ends when you run out of lives. Click **Play Again** to restart.

## Run locally (optional)

From the `country-guessing` folder:

```bash
npx serve
```

Then open the URL shown (e.g. http://localhost:3000).

## Files

- `index.html` – Game page
- `style.css` – Styling
- `game.js` – Game logic and 50 countries with flags (via [flagcdn.com](https://flagcdn.com))
