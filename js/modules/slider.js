function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
// Sliders

const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
    dots = []; // создаём массив для получения метода push
indicators.classList.add('carusel-indicators'); // создаём класс
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
slider.append(indicators); // помещаем обёртку внутри слайдера

for (let i = 0; i < slides.length; i++) { //создаём точки слайдера
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1); // устанавливаем атрибут
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (i == 0) { 
        dot.style.opacity = 1;  // привязываем первую точку к первому слайду
    }
    indicators.append(dot);
    dots.push(dot); // помещаем точку в массив dot
}

function slidesMarker() {
    // подсвечиваем маркеры кадров слайдера
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

        dots.forEach(dot => dot.style.opacity = '.5'); // устанавливаем прозрачноость 0,5 каждой точке массива
        dots[slideIndex - 1].style.opacity = 1} // устанавливаем прозрачноость 1 активной точке массива

function slidesTransform() {
    slidesField.style.transform = `translateX(-${offset}px)`; //смещение слайда
}

function deleteNotDigits(str) { //удаляем нецифры из строки с помощью регулярного выражения
    return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)){
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }

    slidesTransform();

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    } 

    slidesMarker();
});

prev.addEventListener('click', () => {
    if (offset == 0){
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNotDigits(width);
    }

    slidesTransform();

    
    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    } 

    slidesMarker();
});
// навигация по маркепам слайдера
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => { //навешиваем обработчик событий на каждую точку
            const slideTo = e.target.getAttribute('data-slide-to')

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

        slidesTransform();

         slidesMarker();
        });
    });
}

export default slider;