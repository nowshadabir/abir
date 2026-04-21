// The most basic way: A single function called by the form in HTML
function validateMyForm(event) {
    // Get the form using its ID
    var form = document.getElementById('contactForm');

    // Check if everything is filled out correctly
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        return false;
    } else {
        // If everything is OK, show the alert and clear the form
        event.preventDefault();
        alert('Submitted Successfully');
        form.reset();
        form.classList.remove('was-validated');
        return false;
    }
}
