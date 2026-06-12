// conversion.js
// Pure helper functions for the Temperature Converter.
// These functions don't touch the page (no DOM), they just do the math
// and the input checking. app.js calls them and updates the screen.

// Symbols shown next to each result.
var SYMBOLS = { C: "\u00B0C", F: "\u00B0F", K: "K" };

// The lowest possible temperature (absolute zero) in each unit.
var ABSOLUTE_ZERO = { C: -273.15, F: -459.67, K: 0 };

// --- Basic conversion formulas ---
function cToF(c) { return (c * 9 / 5) + 32; }
function cToK(c) { return c + 273.15; }
function fToC(f) { return (f - 32) * 5 / 9; }
function kToC(k) { return k - 273.15; }

// Convert a value (in the chosen unit) into all three units.
// It first turns the value into Celsius, then works out the rest.
function convertAll(value, unit) {
  var c;
  if (unit === "C") {
    c = value;
  } else if (unit === "F") {
    c = fToC(value);
  } else {
    c = kToC(value);
  }
  return { c: c, f: cToF(c), k: cToK(c) };
}

// Round to 2 decimal places and remove any trailing zeros.
// Examples: 32 -> "32", 98.60 -> "98.6", 0.005 -> "0.01"
function formatTemp(value) {
  if (!isFinite(value)) {
    return "";
  }
  // Round on the absolute value so .5 always rounds away from zero.
  var rounded = Math.round(Math.abs(value) * 100) / 100;
  if (value < 0 && rounded !== 0) {
    rounded = -rounded;
  }
  var text = rounded.toFixed(2);       // always 2 decimals, e.g. "98.60"
  text = text.replace(/(\.\d*?)0+$/, "$1"); // drop trailing zeros -> "98.6"
  text = text.replace(/\.$/, "");      // drop a lonely dot -> "98"
  return text;
}

// Check the typed text and decide what to do.
// Returns one of:
//   { state: "empty" }
//   { state: "invalid" }
//   { state: "belowZero", min: <number> }
//   { state: "ok", value: <number> }
function validate(rawText, unit) {
  var text = rawText.trim();

  if (text === "") {
    return { state: "empty" };
  }

  // Keep inputs short and only allow a normal number:
  // an optional minus sign, digits, and at most one decimal point.
  if (text.length > 15) {
    return { state: "invalid" };
  }
  var numberPattern = /^-?(\d+\.?\d*|\.\d+)$/;
  if (!numberPattern.test(text)) {
    return { state: "invalid" };
  }

  var value = parseFloat(text);
  if (!isFinite(value)) {
    return { state: "invalid" };
  }

  // Compare against absolute zero (rounded to 2 decimals so the
  // exact threshold like -273.15 counts as valid).
  var min = ABSOLUTE_ZERO[unit];
  var checkValue = Math.round(value * 100) / 100;
  if (checkValue < min) {
    return { state: "belowZero", min: min };
  }

  return { state: "ok", value: value };
}
