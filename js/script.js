window.addEventListener('DOMContentLoaded', () =>{
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
    dots = [];
indicators.classList.add('carusel-indicators');
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
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
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
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}


next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    } 

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
// подсвечиваем маркеры кадров слайдера
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
    if (offset == 0){
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    
    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    } 

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
});
// навигация по маркепам слайдера
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

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



});