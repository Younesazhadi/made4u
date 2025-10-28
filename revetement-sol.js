document.addEventListener('DOMContentLoaded', function() {
    
    // HERO SLIDESHOW
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

    // SMOOTH SCROLL
    const heroBtn = document.querySelector('.products-hero .btn-primary');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#produits-section');
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }

    // AFFICHER CARTES
    const productCards = document.querySelectorAll('.product-card-main');
    setTimeout(() => {
        productCards.forEach(card => card.classList.add('visible'));
        console.log('✅ Revêtements sol chargés');
    }, 100);

    // MOBILE OVERLAY
    if (window.innerWidth <= 968) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.3 });

        productCards.forEach(card => cardObserver.observe(card));
    }

    console.log(`✅ Page Revêtement Sol - ${productCards.length} produits`);
});
