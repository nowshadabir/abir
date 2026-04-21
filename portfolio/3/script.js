// This is the script for my dark theme portfolio

// Function to show the live clock
function showClock() {
    var today = new Date();
    var time = today.toLocaleTimeString();
    var date = today.toLocaleDateString();
    
    document.getElementById('live-clock').innerHTML = "Current Time: " + time + " | Date: " + date;
}

// Update the clock every second
setInterval(showClock, 1000);
showClock();

// Function to validate the contact form
var myForm = document.getElementById('contactForm');
if(myForm) {
    myForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Don't refresh the page
        
        // We check if everything is filled
        var name = myForm.querySelector('input[type="text"]').value;
        var email = myForm.querySelector('input[type="email"]').value;
        var message = myForm.querySelector('textarea').value;

        if(name != "" && email != "" && message != "") {
            alert("Submitted Successfully");
            myForm.reset();
        } else {
            alert("Please fill all the boxes!");
        }
    });
}
