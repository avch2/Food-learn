function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    //modal.classList.toggle('show');
    document.body.style.overflow = ''; // возвращает скролл после закрытия модального окна
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    //modal.classList.toggle('show');
    document.body.style.overflow = 'hidden'; // удаляет скролл на время модального окна
    
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); // не открывать повторно модальное окно, если оно уже было открыто пользователем
        }
}
    

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector), // отмечаем кнопки модального триггера
        modal = document.querySelector(modalSelector); //переменная для кнопки закрытия модального окна

    modalTrigger.forEach(btn => { // привязка к нескольким кнопкам псевдомассива
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

     // функцию не запускаем

    modal.addEventListener('click', (e) => { //закрывает модальное окно при клиеке на любую область modal
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
           closeModal();// возвращает скролл после закрытия модального окна, тут функцию запускаем
        }
    });

    document.addEventListener('keydown', (e) => { //закрывает модальное окно при нажатии на кнопку Esc
        if (e.code === 'Escape' && modal.classList.contains('show')) { // и показано ли окно вообще (содержит ли класс 'show')
            closeModal(modalSelector);
        }
    });

     function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //контроль полного скроллинга  страницы
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
     }

     window.addEventListener('scroll', showModalByScroll); // отслеживание скроллинга до конца

}
export default modal;
export {closeModal};
export {openModal};
