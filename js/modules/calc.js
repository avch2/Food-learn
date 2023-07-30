function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span');
    
    let sex, height, weight, age, ratio;
// запись значений в  sex и ratio в localStorage
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
// навешиваем кпасс активности на выбранную кнопку
function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass); //убираем активные классы
        if(elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {// проверка ввода данных
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'no data';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    
    calcTotal();

    function getStaticInformation(selector, activeClass) {// получаем информацию со статических блоков
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));//сохраняем в локалсторидж статические данные
                } else {
                    sex = e.target.getAttribute('id'); // либо женщина, либо мужчина
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                
                elements.forEach(elem => {
                    elem.classList.remove(activeClass); // убираем класс активности у всех элементов
                });
    
                e.target.classList.add(activeClass); // присваиваем класс активности выбранному классу
    
                calcTotal();
            });
           
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function getDynemicInformation(selector) { // обрабатываем ввод данных (рост, вес и т.д.)
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
// проверяем регуляркой если введены не цифры, то красный бордер
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
            
        
    }

    getDynemicInformation('#height');
    getDynemicInformation('#weight');
    getDynemicInformation('#age');

   

    // showSlides(slideIndex);

    // if(slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if(slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });




}

export default calc;