// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const registrationForm = document.getElementById('registrationForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Change header shadow on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    }
});

// Back to Top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate stats counters
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Form Submission
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData);

        // Here you would normally send data to server
        console.log('Form submitted:', data);

        // Show success modal
        successModal.classList.add('active');

        // Reset form
        registrationForm.reset();

        // Send data to server (example)
        // fetch('/api/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     successModal.classList.add('active');
        //     registrationForm.reset();
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('Произошла ошибка при отправке формы');
        // });
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Form validation
function validateForm() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Пожалуйста, введите ваше имя');
        return false;
    }

    if (phoneInput.value.trim() === '') {
        showError(phoneInput, 'Пожалуйста, введите ваш номер телефона');
        return false;
    }

    return true;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = 'var(--error)';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '5px';

    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }

    input.style.borderColor = 'var(--error)';
}

// Remove error on input
document.querySelectorAll('#registrationForm input').forEach(input => {
    input.addEventListener('input', () => {
        input.style.borderColor = 'var(--gray-light)';
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Animate stats when stats section is in view
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.classList.add('loaded');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add current year to copyright
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (!value.startsWith('7')) {
                value = '7' + value;
            }

            let formattedValue = '+7 ';

            if (value.length > 1) {
                formattedValue += '(' + value.substring(1, 4);
            }
            if (value.length >= 4) {
                formattedValue += ') ' + value.substring(4, 7);
            }
            if (value.length >= 7) {
                formattedValue += '-' + value.substring(7, 9);
            }
            if (value.length >= 9) {
                formattedValue += '-' + value.substring(9, 11);
            }

            e.target.value = formattedValue;
        }
    });
}