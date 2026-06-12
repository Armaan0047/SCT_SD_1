# Requirements Document

## Introduction

The Temperature Converter is a browser-based web application that converts temperature values between Celsius, Fahrenheit, and Kelvin. It is built for the SkillCraft Technology Software Development Internship (Task 1) and is intended to read as a genuine first-year student project: clean, understandable, and free of unnecessary architectural complexity or framework dependencies.

The application is built using only HTML, CSS, and vanilla JavaScript. It converts values in real time as the user types, validates input before converting, adapts to different screen sizes (responsive design), presents a modern visual style, and supports a dark mode toggle. A small set of portfolio-worthy enhancements (such as physically meaningful validation against absolute zero and a copy-result action) are included to strengthen the project while staying within the scope expected of an internship task.

## Glossary

- **Converter**: The overall web application that accepts a temperature value and a source unit and produces converted values in the other units.
- **Conversion_Engine**: The JavaScript logic responsible for computing converted temperature values from a source value and source unit.
- **Input_Validator**: The JavaScript logic that checks user input for validity before conversion is attempted.
- **Theme_Controller**: The JavaScript logic that switches the interface between light mode and dark mode and remembers the chosen mode.
- **UI**: The visible interface rendered in the browser, including the input field, unit selector, result display, and controls.
- **Source_Unit**: The temperature unit selected by the user as the unit of the entered value (Celsius, Fahrenheit, or Kelvin).
- **Celsius**: Temperature unit where water freezes at 0 degrees and boils at 100 degrees at standard pressure.
- **Fahrenheit**: Temperature unit where water freezes at 32 degrees and boils at 212 degrees at standard pressure.
- **Kelvin**: Absolute temperature unit where 0 represents absolute zero.
- **Absolute_Zero**: The lowest physically possible temperature: 0 Kelvin, -273.15 Celsius, or -459.67 Fahrenheit.
- **Light_Mode**: The default visual theme using a light background.
- **Dark_Mode**: An alternative visual theme using a dark background.
- **Breakpoint**: A screen-width threshold at which the layout adapts for responsive design.

## Requirements

### Requirement 1: Temperature Unit Selection

**User Story:** As a user, I want to choose which unit my entered temperature is in, so that the Converter knows how to interpret my value.

#### Acceptance Criteria

1. THE Converter SHALL provide a selectable list of Source_Unit options containing exactly three values: Celsius, Fahrenheit, and Kelvin.
2. WHEN the Converter first loads, THE Converter SHALL set the Source_Unit to Celsius as the default selection.
3. WHEN the user selects a different Source_Unit AND the currently entered value is a valid number, THE Conversion_Engine SHALL recompute and display the converted values using the currently entered value interpreted as the newly selected Source_Unit.
4. IF the user selects a different Source_Unit WHILE the entered value field is empty, THEN THE Converter SHALL leave the converted output blank and SHALL NOT display an error.
5. IF the user selects a different Source_Unit WHILE the entered value is not a valid number, THEN THE Converter SHALL display an error indication that the entered value must be numeric AND SHALL retain the user's selected Source_Unit.

### Requirement 2: Temperature Conversion Between Units

**User Story:** As a user, I want to convert a temperature value into the other two units, so that I can see equivalent temperatures across Celsius, Fahrenheit, and Kelvin.

#### Acceptance Criteria

1. WHEN the Source_Unit is Celsius and a valid value C is entered, THE Conversion_Engine SHALL compute Fahrenheit as (C × 9 / 5) + 32 and Kelvin as C + 273.15.
2. WHEN the Source_Unit is Fahrenheit and a valid value F is entered, THE Conversion_Engine SHALL compute Celsius as (F − 32) × 5 / 9 and Kelvin as ((F − 32) × 5 / 9) + 273.15.
3. WHEN the Source_Unit is Kelvin and a valid value K is entered, THE Conversion_Engine SHALL compute Celsius as K − 273.15 and Fahrenheit as ((K − 273.15) × 9 / 5) + 32.
4. WHEN a valid value is entered, THE Conversion_Engine SHALL display the entered value in the result area for the Source_Unit unchanged except for the rounding defined in criterion 5.
5. THE Conversion_Engine SHALL round each displayed value to the nearest 0.01 (at most two digits after the decimal point), with values exactly halfway rounded away from zero, and SHALL omit trailing zeros after the decimal point.
6. WHEN a value is converted from a unit into another unit and back into the original unit through a chain of conversions, THE Conversion_Engine SHALL produce a final value within 0.01 of the original entered value (round-trip consistency).

### Requirement 3: Real-Time Conversion

**User Story:** As a user, I want results to update as I type, so that I do not have to press a button to see the conversion.

#### Acceptance Criteria

1. WHEN the user enters or deletes a character in the input field, THE Conversion_Engine SHALL update the displayed converted values within 200 milliseconds of that change and SHALL NOT require any separate submit, button-press, or Enter-key action.
2. WHEN the user changes the Source_Unit, THE Conversion_Engine SHALL update the displayed converted values within 200 milliseconds of the selection change and SHALL NOT require any separate submit, button-press, or Enter-key action.
3. WHILE the input field contains no characters, THE Converter SHALL clear all three converted value displays (Celsius, Fahrenheit, and Kelvin), SHALL NOT display a converted value of zero, and SHALL NOT display a validation or error message.

### Requirement 4: Input Validation

**User Story:** As a user, I want clear feedback when my input is invalid, so that I understand why no conversion is shown.

#### Acceptance Criteria

1. WHEN the user enters a value of up to 15 characters, THE Input_Validator SHALL accept the value only WHERE the value is a finite number containing only digits, at most one leading minus sign, and at most one decimal point.
2. IF the entered value contains any character other than digits, a single optional leading minus sign, and a single decimal point, THEN THE Input_Validator SHALL mark the input as invalid and THE Converter SHALL display a validation message indicating that the input must be a valid number.
3. IF the input field is empty, THEN THE Input_Validator SHALL mark the input as invalid, THE Converter SHALL display a validation message indicating that a value is required, and THE Conversion_Engine SHALL withhold converted values.
4. WHILE the input is marked invalid, THE Conversion_Engine SHALL withhold converted values and SHALL leave the previously displayed results cleared (empty).
5. WHEN the user corrects an invalid input to a valid number, THE Converter SHALL remove the validation message and display the converted values.

### Requirement 5: Physical Validity Against Absolute Zero

**User Story:** As a user, I want to be warned when I enter a temperature below absolute zero, so that I do not rely on a physically impossible value.

#### Acceptance Criteria

1. WHEN the user enters a value that represents a temperature below Absolute_Zero for the selected Source_Unit, THE Input_Validator SHALL mark the input as physically invalid.
2. WHEN the Input_Validator marks an input as physically invalid, THE Converter SHALL display a message identifying the value as below absolute zero and stating the minimum valid value for the selected Source_Unit.
3. THE Input_Validator SHALL treat values equal to Absolute_Zero (0 Kelvin, -273.15 Celsius, or -459.67 Fahrenheit) for the selected Source_Unit as valid, comparing the entered value to the threshold rounded to 2 decimal places.
4. WHILE a value is marked as physically invalid, THE Conversion_Engine SHALL withhold converted values.
5. WHEN the user changes a physically invalid input to a value at or above Absolute_Zero for the selected Source_Unit, THE Input_Validator SHALL clear the physically invalid mark and THE Conversion_Engine SHALL resume displaying converted values.

### Requirement 6: Responsive Design

**User Story:** As a user, I want the interface to work on phones, tablets, and desktops, so that I can convert temperatures on any device.

#### Acceptance Criteria

1. THE UI SHALL render all controls and results within the visible viewport width without horizontal scrolling at viewport widths from 320 pixels to 1920 pixels.
2. WHERE the viewport width is at or below 600 pixels, THE UI SHALL arrange the input field, unit selector, and results stacked vertically in a single-column layout.
3. WHERE the viewport width is above 600 pixels, THE UI SHALL arrange the input field, unit selector, and results in a multi-column layout with a minimum spacing of 16 pixels between adjacent controls.
4. THE UI SHALL render body text at a minimum size of 16 CSS pixels across viewport widths from 320 pixels to 1920 pixels.
5. THE UI SHALL render interactive controls (input field, unit selector, and buttons) with a minimum touch target size of 44 by 44 CSS pixels.

### Requirement 7: Modern User Interface

**User Story:** As a user, I want a clean and modern-looking interface, so that the tool feels pleasant and trustworthy to use.

#### Acceptance Criteria

1. THE UI SHALL present the converter within a horizontally centered card-style container that has a maximum width between 320 and 640 pixels, rounded corners, and equal left and right outer margins.
2. THE UI SHALL apply a single color palette, one primary font family, and one reused spacing scale (the same spacing values applied consistently) across all controls and result displays.
3. WHEN the user focuses an interactive control using the keyboard or pointer, THE UI SHALL display a visible focus indicator (such as an outline or border change) that differs from the control's default unfocused appearance.
4. WHEN the user moves the pointer over an interactive control, THE UI SHALL display a hover state with a visible change (such as a background or text color change) that differs from the control's default appearance, and THE UI SHALL revert that control to its default appearance when the pointer leaves.
5. THE UI SHALL display three result areas, each with an adjacent text label reading "Celsius", "Fahrenheit", and "Kelvin" respectively, and these result areas SHALL remain visible at all times.

### Requirement 8: Dark Mode

**User Story:** As a user, I want to switch to dark mode, so that I can use the converter comfortably in low-light conditions.

#### Acceptance Criteria

1. THE Theme_Controller SHALL display a visible, persistently available toggle control that switches the UI between exactly two themes: Light_Mode and Dark_Mode.
2. WHEN the user activates the theme toggle, THE Theme_Controller SHALL switch the UI to the alternate theme and reflect the change on all visible controls and result displays within 1 second.
3. WHEN the Converter loads and a previously chosen theme exists in browser storage, THE Theme_Controller SHALL apply the previously chosen theme.
4. IF the Converter loads and no previously chosen theme exists in browser storage, THEN THE Theme_Controller SHALL apply Light_Mode as the default theme.
5. WHEN the user changes the theme, THE Theme_Controller SHALL save the chosen theme to browser storage so that it persists across page reloads.
6. WHILE Dark_Mode is active, THE UI SHALL maintain a contrast ratio of at least 4.5:1 between text and its background for all controls and result displays.

### Requirement 9: Portfolio-Worthy Enhancements

**User Story:** As a student building a portfolio, I want a few thoughtful extras, so that the project stands out while still satisfying the internship requirements.

#### Acceptance Criteria

1. WHILE a valid conversion is displayed, THE Converter SHALL provide a copy control for each converted result value (Celsius, Fahrenheit, and Kelvin) that copies that result value to the clipboard.
2. WHEN the user activates a copy control, THE Converter SHALL place the corresponding result value on the clipboard and display a confirmation message that remains visible for between 1 and 3 seconds before being removed automatically.
3. IF a copy action does not succeed, THEN THE Converter SHALL display a message indicating the value was not copied and SHALL leave the displayed result values unchanged.
4. THE Converter SHALL display the source value together with its unit symbol (°C, °F, or K) within each result display so the conversion context is clear.
5. THE Converter SHALL provide a clear control for resetting the input and results.
6. WHEN the user activates the clear control, THE Converter SHALL clear the input field, reset the Celsius, Fahrenheit, and Kelvin result displays to empty, and remove any displayed validation or confirmation message.

### Requirement 10: Constraints and Project Authenticity

**User Story:** As a student submitting an internship task, I want the project to look like genuine student work, so that it is credible and easy to explain.

#### Acceptance Criteria

1. THE Converter SHALL be implemented using only HTML, CSS, and vanilla JavaScript without third-party frameworks or build tools.
2. THE Converter SHALL run directly in a modern web browser by opening the HTML file without a server build step.
3. THE Converter SHALL keep the code structure simple and readable, organized as a small set of HTML, CSS, and JavaScript files appropriate for a first-year student project.
