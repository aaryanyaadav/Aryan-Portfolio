document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.progress-fill');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                bar.style.width = bar.getAttribute('data-width');
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    
    // Initial check in case it's already in view on load
    animateSkills();

    // 3. Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Floating bubbles parallax effect (Optional touch)
    const bubbles = document.querySelectorAll('.bubble');
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        bubbles.forEach((bubble, index) => {
            const speed = (index % 3) + 1;
            const x = mouseX * 30 * speed;
            const y = mouseY * 30 * speed;
            bubble.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // reset float on mouseleave
    document.addEventListener('mouseleave', () => {
        bubbles.forEach((bubble) => {
            bubble.style.transform = `translate(0px, 0px)`;
        });
    });

    // 5. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobileMenu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinksList = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && mobileMenuOverlay && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        const closeMobileMenu = () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileMenuClose.addEventListener('click', closeMobileMenu);

        mobileNavLinksList.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // 6. Paintball Burst Animation for Skills Bubbles
    const devBubbles = document.querySelectorAll('.dev-bubble');
    
    devBubbles.forEach(bubble => {
        bubble.addEventListener('click', (e) => {
            const color = bubble.getAttribute('data-color') || '#A855F7';
            const rect = bubble.getBoundingClientRect();
            // Get center of bubble relative to viewport
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Create 30 particles for a bigger scattered effect
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.backgroundColor = color;
                
                // Random position adjustments - much larger sizes
                const size = Math.random() * 15 + 8; // 8px to 23px
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Start position (center of bubble)
                particle.style.left = `${centerX - size/2 + window.scrollX}px`;
                particle.style.top = `${centerY - size/2 + window.scrollY}px`;
                
                document.body.appendChild(particle);
                
                // Random destination - much further scattered distance
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 200 + 80; // 80px to 280px
                
                const destX = Math.cos(angle) * distance;
                const destY = Math.sin(angle) * distance;
                
                // Animate using Web Animations API
                const animation = particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
                ], {
                    duration: Math.random() * 500 + 600, // 600ms to 1100ms
                    easing: 'cubic-bezier(0.15, 1, 0.3, 1)', // smoother deceleration
                    fill: 'forwards'
                });
                
                // Remove particle after animation
                animation.onfinish = () => {
                    particle.remove();
                };
            }
        });
    });
});
