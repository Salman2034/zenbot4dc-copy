document.getElementById('hamburger-menu').addEventListener('click', function() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger-menu');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            showAlert('success', data.message);
            form.reset();
        } else {
            showAlert('error', 'An error occurred. Please try again.');
        }
    })
    .catch(error => {
        showAlert('error', 'An error occurred. Please try again.');
        console.error('Error:', error);
    });
});

function showAlert(type, message) {
    console.log(`showAlert called with type: ${type}, message: ${message}`);
    
    // Remove any existing alerts
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;
    alert.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;

    // Insert alert before the form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alert, form);

    // Remove alert after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}