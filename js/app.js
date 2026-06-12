// app.js
// Connects the page to the helper functions in conversion.js.
// It reads what the user types, works out the results, and updates the screen.

// Grab the elements we need from the page.
var input = document.getElementById("tempInput");
var unitSelect = document.getElementById("unitSelect");
var message = document.getElementById("message");
var context = document.getElementById("context");
var resultC = document.getElementById("resultC");
var resultF = document.getElementById("resultF");
var resultK = document.getElementById("resultK");
var clearBtn = document.getElementById("clearBtn");
var themeToggle = document.getElementById("themeToggle");
var copyButtons = document.querySelectorAll(".copy-btn");

var EMPTY = "\u2014"; // the long dash shown when there is no result
var messageTimer;

// Full unit names for the messages.
function unitName(unit) {
  if (unit === "C") { return "Celsius"; }
  if (unit === "F") { return "Fahrenheit"; }
  return "Kelvin";
}

// Main function: runs every time the input or unit changes.
function update() {
  var raw = input.value;
  var unit = unitSelect.value;

  // A lone minus sign means the user is starting a negative number.
  // Treat it as "not finished yet" instead of showing an error.
  if (raw.trim() === "-") {
    clearResults();
    showMessage("");
    setInvalid(false);
    return;
  }

  var result = validate(raw, unit);

  if (result.state === "empty") {
    clearResults();
    showMessage("");
    setInvalid(false);
    return;
  }

  if (result.state === "invalid") {
    clearResults();
    showMessage("Please enter a valid number.");
    setInvalid(true);
    return;
  }

  if (result.state === "belowZero") {
    clearResults();
    showMessage(
      "Value is below absolute zero. The lowest " +
      unitName(unit) + " value is " + result.min + " " + SYMBOLS[unit] + "."
    );
    setInvalid(true);
    return;
  }

  // Valid number: show the conversions.
  showMessage("");
  setInvalid(false);
  var temps = convertAll(result.value, unit);
  renderResults(temps, result.value, unit);
}

// Mark the input as valid or invalid for screen readers.
function setInvalid(isInvalid) {
  input.setAttribute("aria-invalid", isInvalid ? "true" : "false");
}

// Put the converted values on screen.
function renderResults(temps, value, unit) {
  resultC.textContent = formatTemp(temps.c) + " " + SYMBOLS.C;
  resultF.textContent = formatTemp(temps.f) + " " + SYMBOLS.F;
  resultK.textContent = formatTemp(temps.k) + " " + SYMBOLS.K;
  context.textContent = "Converted from " + formatTemp(value) + " " + SYMBOLS[unit];
  setCopyEnabled(true);
}

// Reset the three result boxes.
function clearResults() {
  resultC.textContent = EMPTY;
  resultF.textContent = EMPTY;
  resultK.textContent = EMPTY;
  context.textContent = "";
  setCopyEnabled(false);
}

// Turn the copy buttons on or off.
function setCopyEnabled(enabled) {
  for (var i = 0; i < copyButtons.length; i++) {
    copyButtons[i].disabled = !enabled;
  }
}

// Show a message (error or status). Passing "" clears it.
function showMessage(text, isOk) {
  clearTimeout(messageTimer);
  message.textContent = text;
  message.className = isOk ? "message ok" : "message";
}

// Clear everything and put the cursor back in the input.
function clearAll() {
  input.value = "";
  clearResults();
  showMessage("");
  input.focus();
}

// Copy a value to the clipboard, with a fallback for older browsers.
function copyValue(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      flashMessage("Copied!");
    }).catch(function () {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  try {
    var temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    var ok = document.execCommand("copy");
    document.body.removeChild(temp);
    flashMessage(ok ? "Copied!" : "Couldn't copy.");
  } catch (e) {
    flashMessage("Couldn't copy.");
  }
}

// Show a short confirmation that clears itself after 2 seconds.
function flashMessage(text) {
  showMessage(text, true);
  messageTimer = setTimeout(function () {
    if (message.textContent === text) {
      showMessage("");
    }
  }, 2000);
}

// --- Dark mode ---
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

function toggleTheme() {
  var current = document.body.getAttribute("data-theme");
  var next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    // Some browsers block storage; the toggle still works for this visit.
  }
}

function loadTheme() {
  var theme = "light";
  try {
    theme = localStorage.getItem("theme") || "light";
  } catch (e) {
    theme = "light";
  }
  applyTheme(theme);
}

// --- Hook up the events ---
input.addEventListener("input", update);
unitSelect.addEventListener("change", update);
clearBtn.addEventListener("click", clearAll);
themeToggle.addEventListener("click", toggleTheme);

for (var i = 0; i < copyButtons.length; i++) {
  copyButtons[i].addEventListener("click", function () {
    var target = document.getElementById(this.getAttribute("data-target"));
    copyValue(target.textContent);
  });
}

// Set things up when the page loads.
loadTheme();
clearResults();
