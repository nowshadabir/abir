// This script is for the live clock and form validation

// 1. Live Clock Function
function showTime() {
    var date = new Date();
    var h = date.getHours(); 
    var m = date.getMinutes(); 
    var s = date.getSeconds(); 
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session + " - " + date.toDateString();
    document.getElementById("live-clock").innerText = time;
    
    setTimeout(showTime, 1000);
}

// Start the clock when page loads
showTime();

// 2. Form Validation Function
var myForm = document.getElementById("contactForm");

if(myForm) {
    myForm.onsubmit = function(e) {
        e.preventDefault(); // Stop page from refreshing
        
        // Simple check
        var inputs = myForm.getElementsByTagName("input");
        var textarea = myForm.getElementsByTagName("textarea")[0];
        var isEverythingOk = true;

        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].hasAttribute("required") && inputs[i].value == "") {
                isEverythingOk = false;
            }
        }

        if(textarea.value == "") {
            isEverythingOk = false;
        }

        if(isEverythingOk == true) {
            alert("Submitted Successfully");
            myForm.reset(); // Clear the form
        } else {
            alert("Please fill all required fields!");
        }
    };
}
