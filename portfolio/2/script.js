// Nature Portfolio JS

// Live Date and Time
function updateTime() {
    const timeDisplay = document.getElementById('live-clock');
    if (timeDisplay) {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };
        timeDisplay.innerHTML = '<i class="fas fa-clock me-2"></i>' + now.toLocaleDateString('en-US', options);
    }
}

setInterval(updateTime, 1000);
updateTime();

// Form Validation
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            alert("Submitted Successfully");
            form.reset();
        }
    });
}
