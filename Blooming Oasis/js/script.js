/* Blooming Oasis - Functionality */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Date & Time
    const updateDateTime = () => {
        const now = new Date();
        const dateTimeStr = now.toLocaleString();
        const footerTime = document.getElementById('footer-date-time');
        if (footerTime) {
            footerTime.textContent = dateTimeStr;
        }
    };
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // 2. Cart Logic
    let cart = JSON.parse(localStorage.getItem('blooming_oasis_cart')) || [];
    
    const cartIcon = document.getElementById('cart-icon');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    const updateCartUI = () => {
        // Update Count Badge
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';

        // Update Drawer Content
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; margin-top: 2rem;">Your cart is empty.</p>';
            cartTotalAmount.textContent = '$0.00';
        } else {
            let html = '';
            let total = 0;
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                html += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                            <p style="font-size: 0.8rem; color: var(--accent-color);">${item.addons.join(', ')}</p>
                            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:0.8rem; padding:0;">Remove</button>
                        </div>
                    </div>
                `;
            });
            cartItemsContainer.innerHTML = html;
            cartTotalAmount.textContent = `$${total.toFixed(2)}`;
        }
        localStorage.setItem('blooming_oasis_cart', JSON.stringify(cart));
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    // Open/Close Cart
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
    });

    const closeCartDrawer = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    closeCart.addEventListener('click', closeCartDrawer);
    cartOverlay.addEventListener('click', closeCartDrawer);

    // Initial UI Update
    updateCartUI();

    // 3. Plant Matchmaker Quiz
    const quizData = { sunlight: null, care: null, pets: null };
    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const resultBox = document.getElementById('quiz-result');

    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const step = this.closest('.quiz-step');
            const question = step.dataset.question;
            const value = this.dataset.value;
            step.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            quizData[question] = value;
            setTimeout(() => {
                step.classList.remove('active');
                const nextStep = step.nextElementSibling;
                if (nextStep && nextStep.classList.contains('quiz-step')) {
                    nextStep.classList.add('active');
                } else {
                    showQuizResult();
                }
            }, 500);
        });
    });

    function showQuizResult() {
        let recommendation = "";
        if (quizData.sunlight === 'low' && quizData.pets === 'yes') {
            recommendation = "Snake Plant - It survives anywhere and is generally safe if kept out of reach. For a 100% pet-safe low light plant, try a Calathea!";
        } else if (quizData.sunlight === 'bright' && quizData.care === 'low') {
            recommendation = "Aloe Vera - Loves the sun and forgets you exist.";
        } else {
            recommendation = "Monstera Deliciosa - The icon! Loves indirect light.";
        }
        resultBox.innerHTML = `
            <h3>Your Perfect Match:</h3>
            <p style="font-size: 1.5rem; margin: 1rem 0;">${recommendation}</p>
            <button class="btn btn-primary" onclick="location.reload()">Start Over</button>
        `;
        resultBox.style.display = 'block';
    }

    // 4. Contact Form Submission & Popup
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('confirmation-modal');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            contactForm.reset();
        });
    }
    window.closeModal = () => { modal.style.display = 'none'; };

    // 5. Add to Cart Logic (Product Page - Support Multiple Products)
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.dataset.product;
            const basePrice = parseFloat(this.dataset.price);
            const productImage = this.dataset.image;
            const addonGroupName = this.dataset.addonGroup;
            
            const addons = Array.from(document.querySelectorAll(`input[name="${addonGroupName}"]:checked`))
                .map(el => el.value);
            
            // Calculate total price with addons
            let totalPrice = basePrice;
            if (addons.includes("Ceramic Pot")) totalPrice += 15;
            if (addons.includes("Concrete Pot")) totalPrice += 12;
            if (addons.includes("Wood Stand")) totalPrice += 20;
            if (addons.includes("Premium Walnut Stand")) totalPrice += 30;

            const newItem = {
                name: productName,
                price: totalPrice,
                image: productImage,
                quantity: 1,
                addons: addons
            };

            cart.push(newItem);
            updateCartUI();
            
            // Open drawer automatically
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
    });

    // 6. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});
