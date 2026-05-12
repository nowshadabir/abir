// Update Date & Time
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = dateTimeString;
    }
}

setInterval(updateDateTime, 1000);
document.addEventListener('DOMContentLoaded', updateDateTime);

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.height = '70px';
        nav.style.background = 'rgba(26, 60, 52, 0.95)';
    } else {
        nav.style.height = '80px';
        nav.style.background = 'rgba(26, 60, 52, 0.9)';
    }
});

// Plant Matchmaker Quiz
const quizData = [
    {
        question: "How much sunlight does your space get?",
        options: ["Bright direct light", "Indirect bright light", "Low light"]
    },
    {
        question: "How much time can you spend on care?",
        options: ["I'm a helicopter parent", "Once a week is fine", "I might forget for a month"]
    },
    {
        question: "Do you have pets?",
        options: ["Yes, curious ones", "No pets"]
    }
];

let currentStep = 0;
const userAnswers = [];

function startQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('quiz-container');
    const step = quizData[currentStep];
    
    container.innerHTML = `
        <h3 style="margin-bottom: 20px;">Question ${currentStep + 1} of 3</h3>
        <p style="font-size: 1.2rem; margin-bottom: 20px;">${step.question}</p>
        <div class="quiz-options">
            ${step.options.map(opt => `<button class="btn quiz-opt" style="width: 100%; margin-bottom: 10px; text-align: left;">${opt}</button>`).join('')}
        </div>
    `;

    document.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', (e) => {
            userAnswers.push(e.target.textContent);
            nextStep();
        });
    });
}

function nextStep() {
    currentStep++;
    if (currentStep < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const container = document.getElementById('quiz-container');
    let recommendation = "Monstera Deliciosa";
    let desc = "A versatile classic that loves indirect light.";

    if (userAnswers[0].includes("Low")) {
        recommendation = "Snake Plant";
        desc = "Perfect for darker corners and very low maintenance.";
    } else if (userAnswers[2].includes("Yes")) {
        recommendation = "Spider Plant";
        desc = "Non-toxic and very friendly for your furry friends.";
    }

    container.innerHTML = `
        <h3 style="margin-bottom: 20px;">Your Perfect Match!</h3>
        <div style="text-align: center;">
            <h2 style="color: var(--primary); margin-bottom: 10px;">${recommendation}</h2>
            <p style="margin-bottom: 20px;">${desc}</p>
            <button class="btn" onclick="location.reload()">Take Quiz Again</button>
        </div>
    `;
}

// Contact Form Submission
function handleContactSubmit(event) {
    event.preventDefault();
    const popup = document.getElementById('success-popup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closePopup() {
    const popup = document.getElementById('success-popup');
    if (popup) {
        popup.style.display = 'none';
        document.getElementById('contact-form').reset();
    }
}

// Initialize components if they exist on page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz-container')) {
        startQuiz();
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});
