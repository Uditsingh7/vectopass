// UI component to show the text box containing the password suggestion
function displayPasswordSuggestionBox(passwordGen, message = "") {
    let passwordInput = passwordGen;
    const suggestionBox = document.createElement('div');
    suggestionBox.style.cssText = `
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-family: Arial, sans-serif;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: white;
        z-index: 999;
        justify-content: center;
        align-items: center;
    `;
    // Adding headline to the suggestion box
    const headline = document.createElement('h2');
    headline.id = 'suggestion-headline';
    headline.textContent = message;
    headline.style.cssText = `
    margin: 5px;
    font-size: 12px;
    `
    suggestionBox.appendChild(headline);

    // Creating the inner box which contains the passoword
    const innerBox = document.createElement('div');
    innerBox.id = `suggestion-box-password`;
    innerBox.textContent = passwordInput;
    innerBox.style.cssText = `
        width: 80%;
        word-break: break-all;
        margin-right: 5px;
        padding: 50px
        color: grey;
        font-weight: bold;
        font-size: 16px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;
         
    `

    innerBox.addEventListener("click", () => {
        // Call the autofillPasswords function with the password input field
        autofillPasswords(passwordInput);
        document.body.removeChild(suggestionBox);
    });


    suggestionBox.appendChild(innerBox);
    // Add hover effect to the inner box
    innerBox.addEventListener('mouseenter', () => {
        innerBox.style.backgroundColor = '#f0f0f0';
    });
    innerBox.addEventListener('mouseleave', () => {
        innerBox.style.backgroundColor = ''; // Reset background color
    });

    const refreshIcon = document.createElement('span');
    refreshIcon.textContent = '\u27F3'; // Unicode character for refresh icon
    refreshIcon.style.cssText = `
        cursor: pointer;
        font-size: 20px;
        color: #007bff;
    `;
    refreshIcon.addEventListener('click', () => {
        passwordInput = vectopassLogic(); // Function to generate new password suggestion
        innerBox.textContent = passwordInput;
    });
    suggestionBox.appendChild(refreshIcon);

    const cancelIcon = document.createElement('span');
    cancelIcon.textContent = '✖'; // Unicode character for cancel icon
    cancelIcon.style.cssText = `
        cursor: pointer;
        font-size: 20px;
        color: #007bff;
        position: absolute;
        top: 5px;
        right: 5px;
    `;
    cancelIcon.addEventListener('click', () => {
        document.body.removeChild(suggestionBox);
    });
    suggestionBox.appendChild(cancelIcon);

    // Get width of the input password field and set suggestion box width accordingly
    const passwordField = document.querySelector('input[type="password"]');
    if (passwordField) {
        const inputFieldWidth = window.getComputedStyle(passwordField).width;
        suggestionBox.style.width = inputFieldWidth;
        // Identify the input passwords bottom and add the suggestion text below it 
        
        // Get the bottom line of the password input field
        const inputBottom = passwordField.getBoundingClientRect().bottom;

        suggestionBox.style.top = inputBottom + 'px';
        suggestionBox.style.left = passwordField.getBoundingClientRect().left + 'px';
    }
    // Now place this below a password input field
    document.body.appendChild(suggestionBox);
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

// Function to autofill marked password fields with the generated password
function autofillPasswords(passwordVal) {
    // Find all password fields marked with the custom attribute
    const markedPasswordFields = document.querySelectorAll('input[data-password-field="true"]');

    // Autofill each marked password field with the generated password
    markedPasswordFields.forEach(field => {
        // Set the value of the password field
        field.value = passwordVal;

        // Trigger the input event manually
        const event = new Event('input', { bubbles: true });
        field.dispatchEvent(event);
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

// Function to mark password fields with a custom attribute
function markPasswordFields() {
    // Find all password input fields on the page, regardless of their current type
    const passwordFields = document.querySelectorAll('input[type="password"]');

    // Mark each password field with a custom attribute
    passwordFields.forEach(field => {
        field.setAttribute('data-password-field', 'true');
    });
}





// Function to handle generating and autofilling passwords upon user confirmation
function handlePasswordGeneration() {
    // Display a confirmation dialog
    if (isSignUpPage()) {
        markPasswordFields();
        const password = vectopassLogic();
        const message = `VectoPass has generated a strong passoword for you`
        displayPasswordSuggestionBox(password, message);
    }
}


// Execute the password generation logic when the content script is injected into a page
handlePasswordGeneration();

let timeId;
// Here i need to check if the tab has no activity for 10 sec and then update the details
function startGeneratingStrongPass(time, message) {
    timeId = setInterval(() => {
        // Generate a new password suggestion
        const genPass = vectopassLogic();

        // Update the content of the password suggestion box
        const passGenBox = document.getElementById("suggestion-box-password");
        if (passGenBox) {
            passGenBox.textContent = genPass;
        }

        // Update the content of the password suggestion box container
        const suggestionHeadline = document.getElementById("suggestion-headline");
        if (suggestionHeadline) {
            suggestionHeadline.textContent = message;
        }
    }, time)
}


// check if tab is active or not
document.addEventListener("visibilitychange", () => {
    if (document.hidden && isSignUpPage()) {
        startGeneratingStrongPass(5000, "A strong new password has been generated!!");
    } else {
        // Clear the interval
        clearInterval(timeId);
    }
});