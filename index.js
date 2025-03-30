document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const statusMessage = document.getElementById("form-status");

    // Helper function to show error messages
    function showError(input, message) {
        const errorDiv = input.nextElementSibling;
        errorDiv.textContent = message;
        errorDiv.style.color = "red";
        input.style.border = "2px solid red";
    }

    // Helper function to show valid input
    function showValid(input) {
        const errorDiv = input.nextElementSibling;
        errorDiv.textContent = "";
        input.style.border = "2px solid green";
    }

    // Name validation (minimum 3 characters)
    nameField.addEventListener("input", () => {
        if (nameField.value.trim().length < 3) {
            showError(nameField, "Name must be at least 3 characters long.");
        } else {
            showValid(nameField);
        }
    });

    // Email validation (valid email format)
    emailField.addEventListener("input", () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
            showError(emailField, "Please enter a valid email address.");
        } else {
            showValid(emailField);
        }
    });

    // Message validation (minimum 10 characters)
    messageField.addEventListener("input", () => {
        if (messageField.value.trim().length < 10) {
            showError(messageField, "Message must be at least 10 characters long.");
        } else {
            showValid(messageField);
        }
    });

    // Form submission handling
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        statusMessage.textContent = "";
        
        let name = nameField.value.trim();
        let email = emailField.value.trim();
        let message = messageField.value.trim();

        if (name.length < 3 || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || message.length < 10) {
            statusMessage.textContent = "Please fix errors before submitting.";
            statusMessage.style.color = "red";
            return;
        }

        try {
            let response = await fetch("https://formspree.io/f/xwkdvgnd", {
                method: "POST",
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                statusMessage.textContent = "Message sent successfully!";
                statusMessage.style.color = "green";
                form.reset();
                nameField.style.border = "";
                emailField.style.border = "";
                messageField.style.border = "";
            } else {
                statusMessage.textContent = "Failed to send message. Please try again.";
                statusMessage.style.color = "red";
            }
        } catch (error) {
            statusMessage.textContent = "An error occurred. Check your network and try again.";
            statusMessage.style.color = "red";
        }
    });
});
