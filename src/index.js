// Importing the getRandomValues function from the random.js file
import getRandomValues from "./random.js";

// Defining the generatePassword function with default parameters
export default function generatePassword({
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
