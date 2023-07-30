function timer(id, deadline) {
    // Timer

    //const deadline = '2023-08-31';

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

    setClock(id, deadline);
}

export default timer;