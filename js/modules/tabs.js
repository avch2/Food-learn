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