// Heart to Heart - Clean Professional Website JavaScript
// Language toggle and essential functionality only

class LanguageToggle {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setInitialLanguage();
    }

    bindEvents() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
                this.updateActiveButton(e.target);
            });
        });
    }

    setInitialLanguage() {
        const savedLang = localStorage.getItem('h2h-language');
        if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
            this.switchLanguage(savedLang);
            this.updateActiveButton(document.querySelector(`[data-lang="${savedLang}"]`));
        }
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        
        const elements = document.querySelectorAll('[data-en][data-zh]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        localStorage.setItem('h2h-language', lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }

    updateActiveButton(activeButton) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        activeButton.classList.add('active');
    }
}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (toggleBtn && navMenu) {
            toggleBtn.addEventListener('click', () => {
                this.toggle();
            });

            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.close();
                });
            });

            document.addEventListener('click', (e) => {
                if (this.isOpen && !toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                    this.close();
                }
            });
        }
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const navMenu = document.querySelector('.nav-menu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && toggleBtn) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navMenu.style.padding = '24px';
            navMenu.style.gap = '16px';
            navMenu.style.zIndex = '1000';
            
            toggleBtn.classList.add('active');
            this.isOpen = true;
        }
    }

    close() {
        const navMenu = document.querySelector('.nav-menu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && toggleBtn) {
            navMenu.style.display = '';
            navMenu.style.flexDirection = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.right = '';
            navMenu.style.background = '';
            navMenu.style.boxShadow = '';
            navMenu.style.padding = '';
            navMenu.style.gap = '';
            navMenu.style.zIndex = '';
            
            toggleBtn.classList.remove('active');
            this.isOpen = false;
        }
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Basic form handling for CTA buttons
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const buttonText = btn.textContent.trim();
                if (buttonText.includes('Get Involved') || buttonText.includes('参与其中')) {
                    this.handleGetInvolved(e);
                } else if (buttonText.includes('See Our Impact') || buttonText.includes('查看我们的影响')) {
                    // Scroll to impact section
                    const target = document.querySelector('#impact');
                    if (target) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    handleGetInvolved(e) {
        e.preventDefault();
        
        // Create simple modal/alert for now
        const currentLang = localStorage.getItem('h2h-language') || 'en';
        const message = currentLang === 'zh' 
            ? '感谢您的关注！请发送邮件至 h2h@ykps.edu.cn 了解如何参与我们的慈善活动。'
            : 'Thank you for your interest! Please email h2h@ykps.edu.cn to learn how you can get involved in our charity activities.';
        
        this.showMessage(message, 'info');
    }

    showMessage(message, type = 'info') {
        // Remove any existing messages
        const existingMessages = document.querySelectorAll('.message-notification');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-notification';
        messageDiv.textContent = message;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? '#1976D2' : '#C62828'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            max-width: 400px;
            font-size: 0.9rem;
            line-height: 1.4;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 6000);
    }
}

// Initialize functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageToggle();
    new MobileMenu();
    new SmoothScroll();
    new FormHandler();
});

// Add minimal CSS for mobile menu toggle
const mobileCSS = `
    <style>
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .message-notification {
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    </style>
`;

// Copy email function
function copyEmail() {
    const email = 'contact@h2h.ykps.net';
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.querySelector('.copy-email-btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        btn.style.color = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
        }, 2000);
    });
}

document.head.insertAdjacentHTML('beforeend', mobileCSS);