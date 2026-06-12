# Temperature Converter

A simple web app that converts temperatures between **Celsius, Fahrenheit and Kelvin**.
Built for the SkillCraft Technology Software Development Internship (Task 1) using only
HTML, CSS and vanilla JavaScript.

## Features

- Convert between Celsius, Fahrenheit and Kelvin
- Real-time conversion as you type (no convert button needed)
- Input validation with clear error messages
- Absolute zero check (warns if a temperature is physically impossible)
- Copy buttons for each result
- Clear button to reset everything
- Dark mode that remembers your choice
- Responsive layout that works on phones, tablets and desktops

## How to run

No installation or build step is needed.

1. Download or clone this repository.
2. Open `index.html` in any modern web browser (double-click it, or right-click and choose your browser).

That's it.

## Project structure

```
temperature-converter/
├── index.html        # Page structure
├── css/
│   └── style.css     # All styling, including dark mode and responsive layout
├── js/
│   ├── conversion.js # Conversion formulas, rounding and input validation
│   └── app.js        # Connects the page to the logic
└── README.md
```

## How to deploy (GitHub Pages)

1. Push the project to a GitHub repository.
2. Go to the repository's **Settings → Pages**.
3. Under "Branch", choose `main` and the `/ (root)` folder, then save.
4. After a minute, your app is live at `https://<your-username>.github.io/<repo-name>/`.

## Built with

- HTML
- CSS
- Vanilla JavaScript
