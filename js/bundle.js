/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

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

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    // Используем классы для карточек

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 40;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>            
            `;
            this.parent.append(element);
        }

   } 

   const getResource = async (url) => {
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error('Could not fetch ${url}, status: ${res.status}');
        }

        return await  res.json();
    };

    //     Формируем карточки с помощбю классов
    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, alting, title, descr, price}) => {
    //             new MenuCard(img, alting, title, descr, price, '.menu .container').render();
    //         });
    //     });

    //    Формируем карточки прямой вёрсткой
    // getResource('http://localhost:3000/menu')
    //      .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, alting, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${alting}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
    //             </div>     
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // Формируем карточки  библиотекой axios
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, alting, title, descr, price}) => {
                new MenuCard(img, alting, title, descr, price, '.menu .container').render();
            });
        }); 
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
   // Forms

   const forms =  document.querySelectorAll('form');

   const message = { // список фраз для сообщений пользователю
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => { // подвязываем все наши формы под функцию postData
        binpostData(item);
   });

   const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await  res.json();
   };

   function binpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();  // отменяет дефолтное поведение браузера (перезагрузку при отправке формы)

            const statusMessage = document.createElement('img'); // создаём новый элкмент
            statusMessage.src = message.loading; // создаём в новом элементе класс
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; // сообщаем, что идёт загрузка
            form.insertAdjacentElement('afterend', statusMessage); // добавляем сообщение к форме
           
            const formData = new FormData(form); // для передачи в стандарте Формдейта важно наличие в вёрстке параметра "name"

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
               .then(data => {
                console.log(data);
                showThanksModal(message.success); // сообщение об успешной загрузке
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });           
        });
   }
function showThanksModal(message) { // скрыть модуль диалога и вывести благодарность пользователю
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'), // отмечаем кнопки модального триггера
        modal = document.querySelector('.modal'); //переменная для кнопки закрытия модального окна

    function openModal() {
        // modal.classList.add('show');
        // modal.classList.remove('hide');
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; // удаляет скролл на время модального окна
    }
    modalTrigger.forEach(btn => { // привязка к нескольким кнопкам псевдомассива
        btn.addEventListener('click', openModal);
    });
    
    function closeModal() {
        // modal.classList.add('hide');
        // modal.classList.remove('show');
        modal.classList.toggle('show');
        document.body.style.overflow = ''; // возвращает скролл после закрытия модального окна
        clearInterval(modelTimerId); // не открывать повторно модальное окно, если оно уже было открыто пользователем
    }

     // функцию не запускаем

    modal.addEventListener('click', (e) => { //закрывает модальное окно при клиеке на любую область modal
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
           closeModal();// возвращает скролл после закрытия модального окна, тут функцию запускаем
        }
    });

    document.addEventListener('keydown', (e) => { //закрывает модальное окно при нажатии на кнопку Esc
        if (e.code === 'Escape' && modal.classList.contains('show')) { // и показано ли окно вообще (содержит ли класс 'show')
            closeModal();
        }
    });

    const modelTimerId = setTimeout(openModal, 50000);

     function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //контроль полного скроллинга  страницы
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
     }

     window.addEventListener('scroll', showModalByScroll); // отслеживание скроллинга до конца

}
module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
// Sliders

const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next');
    total = document.querySelector('#total'),
    current = document.querySelector('#current');
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
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

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
        // Tab
        const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");
  console.log(tabsContent);
  // скрывем все табы, перебирая псевдомассивдля анимации добавляем класс .fade из стилей
  function hideTabContent() {
      tabsContent.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
      });
  //убираем класс активности табов
      tabs.forEach(item => {
          item.classList.remove('tabheader__item_active');//точку не ставим т.к. используем classList
      });
  }
  // показываем нужный таб и добавляем класс активности
  function showTabContent(i = 0) { //ставим индекс 0 по умолчанию для первой картинки
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
  }
// вызываем функцию скрытия табов и функцию открытия 1-го таба (0)
  hideTabContent();
  showTabContent();
// делегирование событий
  tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {
          tabs.forEach((item, i) => {
              if (target == item) {
                  hideTabContent();
                  showTabContent(i);
              }
          });
      }
  });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    // Timer

    const deadline = '2023-06-31';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //разница во времени в милсек
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // кол-во дней осталось
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return { // возврашаем объект
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { // ставим "0" перед однозначными числами (кавычки косые)
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }   
    }

    function setClock(selector, endtime) { //устанавливаем время
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); // убираем мигание цифр в 1-ю секунду запуска

        function updateClock() { // функция обновления времени
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () =>{
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map