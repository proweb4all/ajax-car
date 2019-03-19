'use strict';
window.addEventListener('DOMContentLoaded', function() {
    
    const blockCars = document.querySelector('.block-cars');

    const loadContent = async (url, callback) => {
		await fetch(url)
			.then(response => response.json())
            .then(json => createCar(json.cars))
            .catch(alert);
		callback();
	}

	function createCar(cars) {
		cars.forEach(function(item){
            console.log(item);
            let cardCar = document.createElement('div');
			cardCar.classList.add('card-car');
			cardCar.innerHTML = `
                <p class="card-car__country">${item.category}</p>
                <p class="card-car__price">${item.price} €</p>
                <h2 class="card-car__name">${item.name}</h2>
                <img class="card-car__img" src="${item.img}" alt="${item.name}">
				<p class="card-car__descr">${item.description}</p>
			`
			blockCars.appendChild(cardCar);
		});
    }
    
    loadContent('cars.json', () => {console.log('Начало!')});

    // fetch('cars.json')
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(json => {
    //         main(json.cars)
    //     })
    //     .catch(alert);

    // function main(cars){
    //     cars.forEach(elem => {
    //         console.log(elem);
    //         createCar(elem);
    //     }); 
    // }

    // function createCar(car){

    // }




});


// 1) Загрузить JSON файл
// 2) При помощи ajax запросов к загруженному файлу сформировать на странице карточки товаров со всеми данными (наименование, описание, цена, картинка, категория). 1 автомобиль - 1 карточка.
// 3) Реализовать 3 переключателя-фильтра по странам: “Германия”, “Франция”, “Италия”.
// Показывать только те карточки, которые подходят под выбранный фильтр. 
// Стилизация карточек и всего внешнего вида - на ваше усмотрение, сверхдизайн не обязателен.
// Упор сделать на главную цель - донесение информации, никаких вырвиглазных цветов и шрифтов.
// Оцениваться будет в основном чистота кода и правильность реализации.
// В случае идеального кода у претендентов - будем смотреть на стили.