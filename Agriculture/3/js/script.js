// Simple way using addEventListener for beginners
var contactForm = document.getElementById('contactForm');

// If the form is on the page, watch for a submit
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        // Always stop the page from refreshing
        event.preventDefault();

        // Check if the form is filled out correctly
        if (contactForm.checkValidity() === true) {
            alert('Submitted Successfully');
            contactForm.reset(); // Clear the fields
            contactForm.classList.remove('was-validated'); // Remove colors
        } else {
            // Show the green/red validation colors
            contactForm.classList.add('was-validated');
        }
    });
}
