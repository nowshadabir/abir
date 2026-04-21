// Very simple JavaScript for beginners
var simpleForm = document.getElementById('contactForm');

// When the user clicks the submit button
simpleForm.onsubmit = function (event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Check if the form is valid using Bootstrap's check
    if (simpleForm.checkValidity() === true) {
        alert('Submitted Successfully');
        simpleForm.reset(); // Clear the form
        simpleForm.classList.remove('was-validated'); // Hide validation colors
    } else {
        simpleForm.classList.add('was-validated'); // Show validation colors
    }
};
