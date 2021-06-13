const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');
const navButtons = document.querySelectorAll('.slider-btns div');

function getNextPrev() {
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);
    let next, prev;

    if (activeIndex === slides.length - 1) {
        next = slides[0];
    } else {
        next = slides[activeIndex + 1];
    }

    if (activeIndex === 0) {
        prev = slides[slides.length-1];
    } else {
        prev = slides[activeIndex - 1];
    }
    return [next, prev];
}

function getPosition() {
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);
    const [next, prev] = getNextPrev();

    slides.forEach((slide, index) => {
        if (index === activeIndex) {
            slide.style.transform = 'translateX(0)';
        } else if (slide === prev) {
            slide.style.transform = 'translateX(-100%)';
        } else if (slide === next) {
            slide.style.transform = 'translateX(100%)';
        } else {
            slide.style.transform = 'translate(100%)';
        }
    });
}

function menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active')
}

getPosition();

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('next')) getNextSlide()
        else if (button.classList.contains('prev')) getPrevSlide();
    });
});

function getNextSlide() {
    const current = document.querySelector('.slide.active');
    const [next, prev] = getNextPrev();

    current.classList.remove('active');
    current.style.transform = 'translate(-100%)';
    next.style.transform = 'translate(0)';
    next.classList.add('active');
    getPosition();
}

function getPrevSlide() {
    const current = document.querySelector('.slide.active');
    const [next, prev] = getNextPrev();

    current.classList.remove('active');
    current.style.transform = 'translateX(100%)';
    prev.style.transform = 'translateX(0)';
    prev.classList.add('active');
    getPosition();
}