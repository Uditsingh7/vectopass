import { vectopassLogic } from "./src/index.js";

document.addEventListener('DOMContentLoaded', function () {
    const generatePasswordButton = document.getElementById('generate-btn');

    generatePasswordButton.addEventListener('click', function () {
        // Call the generatePassword function with options
        const password = vectopassLogic({});
        // Update the UI to display the generated password
        const passwordOutput = document.getElementById('password');
        passwordOutput.value = password;
        navigator.clipboard.writeText(passwordOutput.value);
    });
});
