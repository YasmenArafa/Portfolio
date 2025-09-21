document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        } else {
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        }
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        }
    });

    const contactForm = document.querySelector('.contact-form');
    const popup = document.getElementById('form-status-popup');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.querySelector('.close-button');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(contactForm);
        const formUrl = contactForm.action;

        try {
            const response = await fetch(formUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                popupMessage.textContent = 'Message sent successfully!';
                popup.classList.add('success');
                contactForm.reset(); // Clear form fields
            } else {
                const data = await response.json();
                if (data.errors) {
                    popupMessage.textContent = data.errors.map(error => error.message).join(', ');
                } else {
                    popupMessage.textContent = 'Oops! There was a problem sending your message.';
                }
                popup.classList.add('error');
            }
        } catch (error) {
            popupMessage.textContent = 'Oops! There was a problem sending your message.';
            popup.classList.add('error');
        }
        popup.classList.add('show');

        // Automatically hide the pop-up after 3 seconds
        setTimeout(() => {
            popup.classList.remove('show', 'success', 'error');
        }, 1000); // 3000 milliseconds = 3 seconds
    });

    closeButton.addEventListener('click', () => {
        popup.classList.remove('show', 'success', 'error');
    });

    // Close popup if clicked outside
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('show', 'success', 'error');
        }
    });

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally, unobserve the element once it's animated
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the item is visible
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
});
