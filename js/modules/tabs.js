function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        // Tab
        const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);
  console.log(tabsContent);
  // скрывем все табы, перебирая псевдомассивдля анимации добавляем класс .fade из стилей
  function hideTabContent() {
      tabsContent.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
      });
  //убираем класс активности табов
      tabs.forEach(item => {
          item.classList.remove(activeClass);//точку не ставим т.к. используем classList
      });
  }
  // показываем нужный таб и добавляем класс активности
  function showTabContent(i = 0) { //ставим индекс 0 по умолчанию для первой картинки
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
  }
// вызываем функцию скрытия табов и функцию открытия 1-го таба (0)
  hideTabContent();
  showTabContent();
// делегирование событий
  tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains(tabsSelector.slice(1))) {
          tabs.forEach((item, i) => {
              if (target == item) {
                  hideTabContent();
                  showTabContent(i);
              }
          });
      }
  });
}

export default tabs;