document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-container');
    const slides = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth;

    // Function to move the slider
    function moveSlider(direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => moveSlider(-1));
    nextBtn.addEventListener('click', () => moveSlider(1));

    // Auto-slide functionality
    function autoSlide() {
        moveSlider(1);
    }

    // Set interval for auto-sliding (change slide every 5 seconds)
    let slideInterval = setInterval(autoSlide, 5000);

    // Pause auto-sliding when hovering over the slider
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => slideInterval = setInterval(autoSlide, 5000));
});