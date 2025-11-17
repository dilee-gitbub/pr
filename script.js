// ===========================
// Intersection Observer for Scroll Animations
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Set up Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe cards and other fade-in elements
    const fadeElements = document.querySelectorAll('.card');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Handle CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', handleCtaClick);
    }

    // Add smooth scroll and hover effects
    initializeInteractions();
});

// ===========================
// CTA Button Handler
// ===========================

function handleCtaClick(e) {
    e.preventDefault();
    
    // Get the Google Form link (will be updated later)
    const googleFormLink = this.getAttribute('href');
    
    if (googleFormLink && googleFormLink !== '#') {
        window.location.href = googleFormLink;
    } else {
        console.log('커피챗 신청 버튼 클릭됨. 추후 구글 폼 링크가 연결됩니다.');
        showNotification('추후 구글 폼 링크가 연결됩니다.');
    }
}

// ===========================
// Notification System
// ===========================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        max-width: 500px;
        background: #4DD0E1;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Noto Sans KR', sans-serif;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        animation: slideInUp 0.3s ease-out;
        z-index: 1000;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Add animation keyframes if not already present
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes slideOutDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===========================
// Interactions & Event Handlers
// ===========================

function initializeInteractions() {
    // Add ripple effect to cards on click
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            addRippleEffect(this);
        });
    });

    // Add active state to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });

        ctaButton.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    }

    // Mobile touch optimizations
    if (window.innerWidth <= 768) {
        addTouchOptimizations();
    }

    // Handle window resize
    window.addEventListener('resize', handleWindowResize);
}

// ===========================
// Ripple Effect
// ===========================

function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    // Add ripple animation if not already in stylesheet
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            @keyframes ripple {
                from {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===========================
// Mobile Touch Optimizations
// ===========================

function addTouchOptimizations() {
    const touchableElements = document.querySelectorAll('.card, .cta-button');
    
    touchableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.9';
        });

        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// ===========================
// Window Resize Handler
// ===========================

function handleWindowResize() {
    // Add any responsive behavior here if needed
    const width = window.innerWidth;
    
    if (width <= 768 && !document.body.classList.contains('mobile')) {
        document.body.classList.add('mobile');
    } else if (width > 768 && document.body.classList.contains('mobile')) {
        document.body.classList.remove('mobile');
    }
}

// ===========================
// Update CTA Button Link
// ===========================

/**
 * Update the CTA button with a Google Form link
 * Usage: updateCtaLink('https://forms.gle/your-form-link')
 */
function updateCtaLink(googleFormLink) {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton && googleFormLink) {
        ctaButton.setAttribute('href', googleFormLink);
        ctaButton.onclick = null; // Remove the default onclick handler
    }
}

// Export function for external use
window.updateCtaLink = updateCtaLink;

// ===========================
// Page Performance
// ===========================

// Log page load time
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}

