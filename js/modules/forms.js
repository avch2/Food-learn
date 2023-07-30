import {closeModal, openModal} from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
   // Forms

   const forms =  document.querySelectorAll(formSelector);

   const message = { // список фраз для сообщений пользователю
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => { // подвязываем все наши формы под функцию postData
        binpostData(item);
   });

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
    openModal('.modal', modalTimerId);

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
        closeModal('.modal');
    }, 4000);
}
}

export default forms;