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

   new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item',
    'big'

   ).render();

   new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container'


   ).render(); 
   
   new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container'


   ).render();

   // Forms

   const forms =  document.querySelectorAll('form');

   const message = { // список фраз для сообщений пользователю
        loading: 'img\form\spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => { // подвязываем все наши формы под функцию postData
        postData(item);
   });

   function postData(form) {
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

            const object = {};
            formData.forEach(function(value,key){
                object[key] = value;
            });

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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
    
});


