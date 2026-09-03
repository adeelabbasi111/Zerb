document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const submitBtn = document.getElementById('submit-btn');
    const submitBtnText = submitBtn.querySelector('.btn-text');
    const successMessage = document.getElementById('success-message');
    const resetBtn = document.getElementById('reset-btn');
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    // Basic validation
    const validateForm = () => {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
            
            if (input.type === 'email' && input.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
        });
        return isValid;
    };

    // Remove error class on input
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Update button state
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success state
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Animate success message
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(successMessage, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                    );
                }
                
                // Reset button state for future
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send inquiry';
                form.reset();
            }, 1500);
        }
    });

    resetBtn.addEventListener('click', () => {
        successMessage.classList.add('hidden');
        form.style.display = 'flex';
        
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(form, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    });
});
