# Implementation Plan: Temperature Converter

## Overview

A simple, realistic first-year student project built with only HTML, CSS, and vanilla JavaScript. It runs by opening `index.html` directly in a browser. No frameworks, no build tools, no Node dependencies, no automated test setup.

## Tasks

- [x] 1. Set up project files
  - Create `index.html`, `css/style.css`, `js/conversion.js`, `js/app.js`
  - Link the stylesheet and include `conversion.js` before `app.js` with plain `<script>` tags
  - _Requirements: 10.1, 10.2, 10.3_

- [x] 2. Conversion and validation logic in `conversion.js`
  - Constants: unit symbols and absolute-zero thresholds
  - Formula helpers and `convertAll(value, unit)`
  - `formatTemp(value)` rounding/formatting helper (2 decimals, trim trailing zeros)
  - `validate(rawText, unit)` for numeric format, empty, and absolute-zero checks
  - _Requirements: 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 4.1, 4.2, 4.3, 5.1, 5.3_

- [x] 3. HTML markup in `index.html`
  - Centered card with title and theme toggle
  - Number input and unit selector (Celsius default)
  - Message area and three labeled result areas with copy buttons
  - Clear button
  - _Requirements: 1.1, 1.2, 7.1, 7.5, 8.1, 9.1, 9.5_

- [x] 4. Styling in `css/style.css`
  - Design tokens (palette, font, spacing), centered card layout
  - Focus and hover states, 16px+ text, 44px+ controls
  - Responsive 600px breakpoint and dark-mode theme
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 8.6_

- [x] 5. DOM wiring in `app.js`
  - Real-time update on input and unit change; render results with unit symbols
  - Validation messaging (invalid, empty, below absolute zero)
  - Copy-to-clipboard with fallback; clear/reset control
  - Theme controller with `localStorage` persistence
  - _Requirements: 1.3, 1.4, 1.5, 2.4, 3.1, 3.2, 3.3, 4.4, 4.5, 5.2, 5.4, 5.5, 8.2, 8.3, 8.4, 8.5, 9.2, 9.3, 9.4, 9.6_

- [x] 6. Repository files
  - `README.md` with description, features, how to run, and deployment notes
  - `LICENSE` (MIT) and `.gitignore`
  - _Requirements: 10.1, 10.2, 10.3_
