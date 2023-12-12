"use strict";

// Define HTML elements
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");
const copyPass = document.querySelector(".input-box #copyPass");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

// Function to generate password
const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += " "; // Concatenate a space character
      } else {
        excludeDuplicate = true;
      }
    }
  });

  // Include numbers in staticPassword explicitly
  if (document.getElementById("numbers").checked) {
    staticPassword += characters.number;
  }

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];

    if (excludeDuplicate) {
      if (!randomPassword.includes(randomChar) || randomChar === " ") {
        randomPassword += randomChar;
      } else {
        i--;
      }
    } else {
      randomPassword += randomChar;
    }
  }

  passwordInput.value = randomPassword;
};

//Function to indicate the password Strength
const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

//Function to update the password length slider
const updateSlider = () => {
  document.querySelector(".pass-length span").innerHTML = lengthSlider.value;
  updatePassIndicator();
};

// Add an event listener for the "Generate Password" button
generateBtn.addEventListener("click", () => {
  generatePassword();
  updateSlider();
});

//Adding event listener to the copy icon
copyPass.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
});
