import { vectopassLogic } from "./src/index.js";

document.addEventListener('DOMContentLoaded', function () {
    const generatePasswordButton = document.getElementById('generate-btn');

    generatePasswordButton.addEventListener('click', function () {
        // Retrieve options from HTML elements
        // const syllablesCount = parseInt(document.getElementById('syllables').value);
        const length = parseInt(document.getElementById('length').value);
        // const minSyllableLength = parseInt(document.getElementById('min-syllable-length').value);
        // const maxSyllableLength = parseInt(document.getElementById('max-syllable-length').value);
        const hasNumbers = document.getElementById('has-numbers').checked;
        const hasSpecialChars = document.getElementById('special-char').checked;
        const hasUpperCase = document.getElementById('has-uppercase').checked;
        const hasLowerCase = document.getElementById('has-lowercase').checked;

        // Call the generatePassword function with options
        const password = vectopassLogic({
            length,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChars,
        });

        // Update the UI to display the generated password
        const passwordOutput = document.getElementById('password');
        passwordOutput.value = password;
        navigator.clipboard.writeText(passwordOutput.value);
    });
});
