// Function to display a notification message
function displayNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 10px;
        background-color: #333;
        color: #fff;
        border-radius: 5px;
        z-index: 9999;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000); // Remove notification after 5 seconds
}

function vectopassLogic({
    length = 16, // default password length
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

// Function to autofill password fields with a generated password
function autofillPasswords() {
    // Generate a random password
    const generatedPassword = vectopassLogic({});

    // Find all password input fields on the page
    const passwordFields = document.querySelectorAll('input[type="password"]');

    // Autofill each password field with the generated password
    passwordFields.forEach(field => {
        field.value = generatedPassword;
        field.dispatchEvent(new Event('input', { bubbles: true }));
    });
}

// Function to check if the current page resembles a sign-up page
function isSignUpPage() {
    const url = window.location.href.toLowerCase();
    const signUpKeywords = ["signup", "register", "create-account", "join"];
    const loginKeywords = ["login", "signin", "log-in", "sign-in"];
    const relevantContent = ["new password", "confirm password", "create an account", "sign up", "join now", "sign up for free"];

    // Check if the URL contains sign-up or login keywords
    const urlContainsSignUpKeyword = signUpKeywords.some(keyword => url.includes(keyword));
    const urlContainsLoginKeyword = loginKeywords.some(keyword => url.includes(keyword));

    // Check for relevant content in the HTML body
    const hasRelevantContent = relevantContent.some(content => document.body.textContent.toLowerCase().includes(content));

    // Check if there are password input fields
    const passwordInputFields = document.querySelectorAll("input[type='password']");
    const hasPasswordInput = passwordInputFields.length > 0;

    // Determine if it's a sign-up page
    const isSignUpPage = (urlContainsSignUpKeyword && hasPasswordInput && !urlContainsLoginKeyword) || (hasRelevantContent && hasPasswordInput && !urlContainsLoginKeyword);

    return isSignUpPage;
}





// Function to handle generating and autofilling passwords upon user confirmation
function handlePasswordGeneration() {
    // Display a confirmation dialog
    if (isSignUpPage()) {
        // Autofill password fields with the generated password
        autofillPasswords();
        // Display a notification indicating that a strong password has been generated
        displayNotification("A strong password has been generated for you.");
    }
}

// Execute the password generation logic when the content script is injected into a page
handlePasswordGeneration();


// Test function to generate  a random string of characters
function generatePassword() {
    return `${Math.random().toString(36).substring(2) +
        Math.random().toString(36).replace(/[0.]/g, '').substring(0, 5)}`;
}
