// const crypto = require("crypto");


function getRandomValues(size) {
    // Using browsers crypto module for getting random values
    return window.crypto.getRandomValues(new Uint8Array(size));
    // return crypto.randomBytes(size);
}

// Omgopass logic-  Not used in our application 
export function omgopassLogic({
    syllablesCount = 3,
    minSyllableLength = 2,
    maxSyllableLength = 3,
    hasNumbers = true,
    titlecased = true,
    separators = "",
    vowels = "aeiouy",
    consonants = "bcdfghjklmnpqrstvwxz"
} = {}) {
    // Function to generate a string based on a callback function
    function produce(number, callback) {
        let result = "";
        // Looping 'number' times and concatenating the result of the callback function
        for (let i = 0; i < number; i++) {
            result += callback(i);
        }
        return result;
    }

    // Initializing variables for random number generation
    let buffer = [];
    let bufferSize = 0xffff;
    let bufferIndex = bufferSize;

    // Function to generate a random number within a specified limit
    function random(limit) {
        // Regenerating buffer values if index exceeds buffer size
        if (bufferIndex >= bufferSize) {
            buffer = getRandomValues(bufferSize);
            bufferIndex = 0;
        }
        // Returning a random number within the specified limit
        return buffer[bufferIndex++] % limit;
    }

    // Generating the password based on provided parameters
    return produce(syllablesCount, i => {
        // Generating the length of the syllable
        const length = minSyllableLength + random(maxSyllableLength - minSyllableLength + 1);
        let syllable = produce(length, index => {
            // Selecting consonants or vowels based on the index
            const alpha = index % 2 ? vowels : consonants;
            // Generating a random character
            let char = alpha[random(alpha.length)];
            // Converting the character to uppercase if titlecased is true
            return titlecased && !index ? char.toUpperCase() : char;
        });
        // Appending a random number to the syllable if hasNumbers is true
        if (hasNumbers) syllable += random(10);
        // Appending a separator to the syllable if not the first syllable
        return i && separators ? separators[random(separators.length)] + syllable : syllable;
    });
}


// This logic is used in our application to generate password
export function vectopassLogic({
    length = 12, // default password length
    hasUpperCase = true,
    hasLowerCase = true,
    hasNumbers = true,
    hasSpecialChars = true
} = {}) {
    let charset = "";

    // Add characters based on options
    if (hasUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (hasLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (hasNumbers) charset += "0123456789";
    if (hasSpecialChars) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?/~";

    // If no character type is selected, use default
    if (charset === "") {
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~";
    }

    const charsetLength = charset.length;

    // Generate password
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * charsetLength);
        password += charset.charAt(randomIndex);
    }

    return password;
}
