'use strict';
window.addEventListener('DOMContentLoaded', function() {
    
    const blockCars = document.querySelector('.block-cars');
    const blockFilter = document.querySelector('.filter');
    let countries = []; // Массив названий стран
    const loadContent = async (url, callback) => {
		await fetch(url)
			.then(response => response.json())
            .then(json => createCar(json.cars))
            .catch(alert);
		callback();
	}

    // Создание карточек автомобилей, в конце запуск создания фильтра
	function createCar(cars) {
		cars.forEach((item) => {
            let cardCar = document.createElement('div');
			cardCar.classList.add('card-car');
			cardCar.innerHTML = `<p class="card-car__country">${item.category.trim()}</p>
                <p class="card-car__price">${item.price} €</p>
                <h2 class="card-car__name">${item.name.trim()}</h2>
                <img class="card-car__img" src="${item.img.trim()}" alt="${item.name.trim()}">
				<p class="card-car__descr">${item.description.trim()}</p>`;
            blockCars.appendChild(cardCar);
            if (countries.indexOf(item.category.trim()) < 0) {
                countries.push(item.category.trim());
            }
        });
        createFilter(countries);
    }
    
    // Создание фильтра (создаются чекбоксы по названию стран из JSON, через делегирование на них подвешивается фильтрация)
    function createFilter(arr){
		arr.forEach((item) => {
            let labelCheck = document.createElement('label');
			labelCheck.classList.add('filter__label');
            labelCheck.innerHTML = `<input type="checkbox" name="country" id="${item}" class="filter__input" checked>${item}`
            blockFilter.appendChild(labelCheck);
        });
        blockFilter.addEventListener('change', (e) => {
            if (e.target.tagName === 'INPUT'){
                let checkOn = blockFilter.querySelectorAll('.filter__input:checked');
                let countryOn = [];
                checkOn.forEach((el) => countryOn.push(el.parentElement.textContent));
                let cardsCar = document.querySelectorAll('.card-car');
                cardsCar.forEach((el) => {
                    (countryOn.indexOf(el.querySelector('.card-car__country').textContent.trim()) < 0) ? 
                        el.style.display = 'none' : el.style.display = 'block';
                })
            }
        });
    }

    loadContent('cars.json', () => {console.log('Начало!')});

});


// 1) Загрузить JSON файл
// 2) При помощи ajax запросов к загруженному файлу сформировать на странице карточки товаров со всеми данными (наименование, описание, цена, картинка, категория). 1 автомобиль - 1 карточка.
// 3) Реализовать 3 переключателя-фильтра по странам: “Германия”, “Франция”, “Италия”.
// Показывать только те карточки, которые подходят под выбранный фильтр. 
// Стилизация карточек и всего внешнего вида - на ваше усмотрение, сверхдизайн не обязателен.
// Упор сделать на главную цель - донесение информации, никаких вырвиглазных цветов и шрифтов.
// Оцениваться будет в основном чистота кода и правильность реализации.
// В случае идеального кода у претендентов - будем смотреть на стили.