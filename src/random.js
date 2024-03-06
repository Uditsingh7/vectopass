// import { randomBytes } from "crypto";

function getRandomValues(size) {
    // Using browsers crypto module for getting random values
    return window.crypto.getRandomValues(new Uint8Array(size));
}

export default getRandomValues;
