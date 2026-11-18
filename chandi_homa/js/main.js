document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-item");

    let currentActiveId = "";

    const onScroll = () => {
        let current = "";
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // On mobile, the sticky navbar takes up some space. We use a fixed threshold (e.g. 150px) 
            // so a section only becomes active when it is near the bottom of the navbar.
            const threshold = window.innerWidth <= 768 ? 150 : (window.innerHeight / 3);
            if (rect.top <= threshold) {
                current = section.getAttribute("id");
            }
        });

        // Catch-all: If user scrolls to the absolute bottom of the page, highlight the last section
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        if (scrollPosition >= documentHeight - 100) {
            current = sections[sections.length - 1].getAttribute("id");
        }

        if (current !== currentActiveId) {
            currentActiveId = current;
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (current && link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                    
                    // Automatically scroll the navbar on mobile to center the active item
                    const navContainer = document.querySelector('.nav-container');
                    if (navContainer && window.innerWidth <= 768) {
                        const scrollLeft = link.offsetLeft - (navContainer.clientWidth / 2) + (link.clientWidth / 2);
                        navContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                    }
                }
            });
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Call once to set initial state
    onScroll();

    // Navbar Scroll Arrows Logic
    const navLeftBtn = document.querySelector('.nav-arrow.left-arrow');
    const navRightBtn = document.querySelector('.nav-arrow.right-arrow');
    const navContainerEl = document.querySelector('.nav-container');

    if (navContainerEl && navLeftBtn && navRightBtn) {
        navLeftBtn.addEventListener('click', () => {
            navContainerEl.scrollBy({ left: -150, behavior: 'smooth' });
        });
        navRightBtn.addEventListener('click', () => {
            navContainerEl.scrollBy({ left: 150, behavior: 'smooth' });
        });
        
        // Update arrow opacity based on scroll position
        const updateNavArrows = () => {
            if (window.innerWidth > 768) return; // Only apply on mobile
            
            if (navContainerEl.scrollLeft <= 0) {
                navLeftBtn.style.opacity = '0.3';
                navLeftBtn.style.pointerEvents = 'none';
            } else {
                navLeftBtn.style.opacity = '1';
                navLeftBtn.style.pointerEvents = 'auto';
            }
            
            if (Math.ceil(navContainerEl.scrollLeft + navContainerEl.clientWidth) >= navContainerEl.scrollWidth) {
                navRightBtn.style.opacity = '0.3';
                navRightBtn.style.pointerEvents = 'none';
            } else {
                navRightBtn.style.opacity = '1';
                navRightBtn.style.pointerEvents = 'auto';
            }
        };
        
        navContainerEl.addEventListener('scroll', updateNavArrows, { passive: true });
        window.addEventListener('resize', updateNavArrows);
        
        // Initial check with a slight delay to ensure layout is complete
        setTimeout(updateNavArrows, 100);
    }

    // Reviews Carousel Logic
    const reviewsGrid = document.querySelector('.reviews-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (reviewsGrid && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const cardWidth = reviewsGrid.querySelector('.review-card').offsetWidth + 20; // 20px gap
            reviewsGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const cardWidth = reviewsGrid.querySelector('.review-card').offsetWidth + 20;
            reviewsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items for a clean accordion effect
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const answer = faq.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = null;
                });

                // Open this item if it wasn't already open
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });
});
