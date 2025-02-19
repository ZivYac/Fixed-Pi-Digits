# Fixed-Pi-Digits

The pi digits project after the adding of additional features and bug fixes.

# Pi-Digits

Pi-Digits is a React application that fetches and displays the first \( n \) digits of pi using an API. This project includes several features and tasks for candidates to complete, including bug fixes, error handling, and new feature implementations.

## Features

- Fetch and display the first \( n \) digits of pi.
- Input validation to ensure only digits are accepted.
- Light/Dark theme toggle.
- Search functionality to find occurrences of a sequence within the first 1000 digits of pi.

## Bugs to Fix

1. **Login Issue**: After pressing submit, the screen turns white instead of navigating into the app.
2. **Input Validation**: Ensure the input field only accepts digits.
3. **Incomplete Translations**: Complete all missing labels for Hebrew and Romanian.
4. **Digit Rendering Bug**: The spinner remains on the screen, and if the user chooses to render 3 digits, it only renders 1.

## Error Handling

1. **Numbers > 1000**: Handle cases where the input number is greater than 1000.
2. **Negative Numbers**: Handle cases where the input number is negative.

## New Features to Implement

1. **Logout**: Implement a logout functionality.
2. **Long Press on +,- Buttons**: Add functionality to handle long press actions on the increment and decrement buttons.
3. **Highlight Occurrence of Digit X**: Highlight all occurrences of a specific digit (0-9).
4. **Copy Button**: Add a button to copy the displayed digits to the clipboard.
5. **Light/Dark Theme**: Implement a toggle for switching between light and dark themes.
6. **Search Functionality**: Add a search feature to find the occurrence of a sequence like "12345" within the first 1000 digits of pi.

### Prerequisites

- Node.js
- npm

## Getting Started

Node -
Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine, designed to build scalable network applications.
Download the LTS version from here: https://nodejs.org/en/

Yarn -
Yarn is a package manager for your code. It is recommended to install Yarn through the npm package manager, which comes bundled with Node.js when you install it on your system.
Open an Administrator Command Prompt, then run the following command:

```bash
npm install --global yarn
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ArielAlfia/pi-digits.git
   cd pi-digits
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn start
   ```

### Submission Instructions

Candidates should submit this project by following these steps:

Fork the Repository: Fork this repository to your own GitHub account.
Clone the Forked Repository: Clone the forked repository to your local machine.

```bash
git clone https://github.com/your-username/pi-digits.git
cd pi-digits
```

Make Your Changes: Implement the required bug fixes, error handling, and new features.
Commit Your Changes: Commit your changes with clear and descriptive commit messages.

```bash
git add .
git commit -m "Implemented feature X"
```

Push to Your Repository: Push your changes to your GitHub repository.

```bash
git push origin main
```

Submit the Repository Link: Submit the link to your GitHub repository for review.

### External Libraries

To enhance the functionality and maintainability of your project, we’ve included several external libraries. Below is a brief description of each library along with links to their official documentation. These libraries will help you with various aspects of development, such as state management, form handling, routing, styling, and testing.

1. **react-hook-form**: Performant, flexible, and extensible forms with easy-to-use validation.
2. **react-intl**: Internationalization library for React, providing formatted strings and messages.
3. **@reduxjs/toolkit**: Official, opinionated toolset for efficient Redux development.
4. **react-router-dom**: Declarative routing for React applications.
5. **theme-ui**: Library for building themeable React applications with a focus on design systems.

### License

This project is licensed under the MIT License.
