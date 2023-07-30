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
