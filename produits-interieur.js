// ============================================
// PRODUCTS PAGE - INTERIEUR - JavaScript
// VERSION OPTIMISÉE - Identique à page extérieur
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // HERO SLIDESHOW
    // ============================================
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    let autoSlide = setInterval(nextSlide, slideInterval);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });

    const heroSection = document.querySelector('.products-hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        heroSection.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    }

    // ============================================
    // SMOOTH SCROLL POUR LE BOUTON HERO
    // ============================================
    const heroBtn = document.querySelector('.products-hero .btn-primary');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#produits-section');
            
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ============================================
    // AFFICHER LES CARTES IMMÉDIATEMENT
    // ============================================
    const productCards = document.querySelectorAll('.product-card-main');

    setTimeout(() => {
        productCards.forEach(card => {
            card.classList.add('visible');
        });
        console.log('✅ Cartes intérieur chargées immédiatement');
    }, 100);

    // ============================================
    // MOBILE: Overlay au scroll (1 sec de délai)
    // ============================================
    if (window.innerWidth <= 968) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });

        productCards.forEach(card => {
            cardObserver.observe(card);
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR DEVIS BUTTONS
    // ============================================
    const devisButtons = document.querySelectorAll('.btn-product');
    
    devisButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html#devis';
        });
    });

    // ============================================
    // SMOOTH APPEARANCE ON SCROLL - CTA
    // ============================================
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.8s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }, { threshold: 0.3 });
        
        ctaObserver.observe(ctaSection);
    }

    console.log('✅ Page Produits Intérieur chargée - Mode:', window.innerWidth <= 968 ? 'MOBILE' : 'DESKTOP');
    console.log(`📦 ${productCards.length} produits intérieurs affichés`);
});
