// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Gallery Modal Functionality with Premium Effects
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.querySelector(".modal .caption");
    const closeBtn = document.querySelector(".modal .close");
    const galleryItems = document.querySelectorAll(".gallery-item");

    // Open modal when clicking on gallery items with enhanced effect
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const altText = this.querySelector('img').alt;
            
            // Add loading effect
            this.style.opacity = "0.7";
            this.style.transform = "scale(0.95)";
            
            setTimeout(() => {
                modal.style.display = "block";
                modalImg.src = imgSrc;
                captionText.innerHTML = altText;
                
                // Premium entrance animation
                modalImg.style.opacity = "0";
                modalImg.style.transform = "scale(0.8)";
                
                setTimeout(() => {
                    modalImg.style.transition = "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)";
                    modalImg.style.opacity = "1";
                    modalImg.style.transform = "scale(1)";
                }, 50);
                
                // Prevent background scrolling
                document.body.style.overflow = "hidden";
                
                // Reset item style
                this.style.opacity = "1";
                this.style.transform = "scale(1)";
            }, 300);
        });
    });

    // Close modal with premium exit animation
    closeBtn.onclick = function() {
        modalImg.style.opacity = "0";
        modalImg.style.transform = "scale(0.8)";
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    }

    // Close modal when clicking outside the image with animation
    modal.onclick = function(event) {
        if (event.target !== modalImg && event.target !== captionText) {
            modalImg.style.opacity = "0";
            modalImg.style.transform = "scale(0.8)";
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }, 300);
        }
    }

    // Smooth Scrolling for Navigation Links with easing
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Form Submission Handling with Premium Feedback
    const memoryForm = document.querySelector('.memory-form');
    if (memoryForm) {
        memoryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const memory = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && memory) {
                // Show premium success animation
                const submitButton = this.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = "Submitting...";
                submitButton.disabled = true;
                
                try {
                    // Save to local storage for admin dashboard
                    const submittedMemory = submitMemoryToStorage(name, email, memory);
                    
                    // Save to Supabase if available
                    if (window.supabaseClient) {
                        console.log('Memory would be saved to Supabase:', submittedMemory);
                        // In production: 
                        // const { data, error } = await supabase.from('memories').insert([submittedMemory]);
                    }
                    
                    // Simulate premium processing
                    setTimeout(() => {
                        submitButton.textContent = "Submitted!";
                        submitButton.style.background = "rgba(212, 175, 55, 0.2)";
                        submitButton.style.borderColor = "#d4af37";
                        submitButton.style.color = "#d4af37";
                        
                        // Show success message
                        alert(`Thank you ${name}! Your memory has been submitted successfully. ❤️`);
                        
                        // Reset form after delay
                        setTimeout(() => {
                            this.reset();
                            submitButton.textContent = originalText;
                            submitButton.disabled = false;
                            submitButton.style.background = "";
                            submitButton.style.borderColor = "";
                            submitButton.style.color = "";
                        }, 2000);
                    }, 1500);
                } catch (error) {
                    console.error('Error submitting memory:', error);
                    alert('Error submitting memory. Please try again.');
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            } else {
                // Premium error effect
                this.classList.add('shake');
                setTimeout(() => {
                    this.classList.remove('shake');
                }, 500);
                alert('Please fill in all fields.');
            }
        });
    }

    // WhatsApp Redirect for Support Link with Premium Effect
    const supportLinks = document.querySelectorAll('.support-link');
    supportLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add premium click effect
            this.style.transform = "scale(0.95)";
            this.style.opacity = "0.7";
            
            setTimeout(() => {
                this.style.transform = "";
                this.style.opacity = "";
                
                // Redirect to WhatsApp with professional message
                window.open('https://wa.me/918826817677?text=Hello,%20I%20need%20assistance%20with%20the%2012th%20A%20farewell%20website.', '_blank');
            }, 200);
        });
    });

    // Enhanced Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            // Enhanced parallax with rotation effect
            hero.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
            
            // Add subtle tilt effect based on mouse position
            document.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                hero.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
        }
    });

    // Premium Scroll animations with stagger effect
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.highlight-card, .teacher-card, .gallery-item');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                // Stagger the animations for premium feel
                setTimeout(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }, index * 100);
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.highlight-card, .teacher-card, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    // Trigger animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    animateOnScroll();

    // CTA Button Animation with Premium Effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add premium click effect
            this.style.transform = "scale(0.95)";
            this.style.opacity = "0.7";
            
            setTimeout(() => {
                this.style.transform = "";
                this.style.opacity = "";
                
                // Scroll to gallery section with premium animation
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                    const targetPosition = gallerySection.offsetTop - 80;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1200;
                    let start = null;

                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }

                    function easeInOutQuart(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t * t * t + b;
                        t -= 2;
                        return -c / 2 * (t * t * t * t - 2) + b;
                    }

                    requestAnimationFrame(animation);
                }
            }, 200);
        });
    }

    // Enhanced Particle animation
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        // Clear existing particles
        particlesContainer.innerHTML = '';
        
        // Add more premium particles dynamically
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = i % 5 === 0 ? '#d4af37' : 
                                           i % 3 === 0 ? '#6f8cff' : 'rgba(255, 255, 255, 0.7)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.8 + 0.2;
            particle.style.animation = `float ${Math.random() * 20 + 10}s infinite alternate`;
            particle.style.boxShadow = i % 5 === 0 ? '0 0 10px #d4af37' : 
                                     i % 3 === 0 ? '0 0 10px #6f8cff' : '0 0 5px rgba(255, 255, 255, 0.5)';
            particlesContainer.appendChild(particle);
        }
    }

    // Add mouse move parallax effect for cards
    const cards = document.querySelectorAll('.highlight-card, .teacher-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = mouseX / 20;
            const rotateX = -mouseY / 20;
            
            card.style.transform = `translateY(0) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Memory Submission Helper
function submitMemoryToStorage(name, email, memory) {
    const newMemory = {
        id: Date.now(),
        name: name,
        email: email,
        memory: memory,
        is_approved: false,
        created_at: new Date().toISOString()
    };

    // Get existing memories from localStorage
    let memories = [];
    const existingMemories = localStorage.getItem('submitted_memories');
    if (existingMemories) {
        try {
            memories = JSON.parse(existingMemories);
        } catch (e) {
            memories = [];
        }
    }

    // Add new memory
    memories.push(newMemory);

    // Save back to localStorage
    localStorage.setItem('submitted_memories', JSON.stringify(memories));

    console.log('Memory saved to storage:', newMemory);
    return newMemory;
}

// Initialize tracking
style.textContent = `
    @keyframes float {
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg);
        }
        50% {
            transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(180deg);
        }
        75% {
            transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg);
        }
        100% {
            transform: translate(0, 0) rotate(360deg);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
`;
document.head.appendChild(style);