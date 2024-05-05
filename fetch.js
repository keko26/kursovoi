// fetch.js

let items = [];//создаём массив

// Функция для загрузки XML и преобразования его в JSON
function loadXML(url) {//url - ссылка на xml файл(принимается при вызове функции)
    return fetch(url)//захват файла
        .then(response => response.text())//чтение файла
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))//распознование текста как xml-документа
        .then(data => {//получение данных
            items = Array.from(data.querySelectorAll('item')).map(item => {//заполняем массив структурой где 'item' - имя тега в xml, item - имя структуры
                console.log(item.querySelector('name').textContent); 
                return { 
                    name: item.querySelector('name').textContent,
                    img: item.querySelector('img').textContent,
                    about: item.querySelector('about').textContent,
                };
            });
            return items;//возращаем готовый массив
        });
}

// Функция для добавления элементов в items-list
function addItemsToDOM(items) {
    const itemsList = document.querySelector('.main');//создаём переменную хранящая элемент
    // Очищаем список перед добавлением новых элементов
    // itemsList.innerHTML = '';
    items.forEach(item => {//цикл переберающий элементы массива
        const itemDiv = document.createElement('div');//создаём контейнер для товара
        itemDiv.className = 'item item2';//выдаём класс контейнеру
        itemDiv.innerHTML = `
           <div class="item_img"><img src="${item.img}"></div>
           <div class="inf">${item.about}</div>
           <div class="price"> ${item.name}</div>
            
           
        `;//заполняем контейнер информацией
        
        itemDiv.onclick = function() {//(опционально) вызов функции при нажатии на контейнер
            // loadItemDetails('/Printinvest/catalog/items/items.xml', item.name);
        };
        itemsList.appendChild(itemDiv);//добовляем в наш .items-list созданный div
    });
}
// document.addEventListener('DOMContentLoaded', function(){ 
// loadXML("items.xml");
// addItemsToDOM(items);
// })
document.addEventListener('DOMContentLoaded', function () {

    loadXML("items.xml").then(() => {
        addItemsToDOM(items);
    })
        .catch(error => console.error('Error fetching XML:', error));
})