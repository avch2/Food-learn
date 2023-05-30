window.addEventListener('DOMContentLoaded', () =>{

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    // скрывем все табы, перебирая псевдомассив
    function hideTabContent() {
        tabsContent.forEach(item =>{
            item.style.displey = 'none';
        });
    //убираем класс активности табов
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');//точку не ставим т.к. используем classList
        });
    }
    // показываем нужный таб и добавляем класс активности
    function showTabContent(i) {
        tabsContent[i].style.displey = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
// вызываем функцию скрытия табов и функцию открытия 1-го таба (0)
    hideTabContent();
    showTabContent(0);
});