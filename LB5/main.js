"use strict";
//Создает и возвращает элемент для отображения имени автора записи.
function createAuthorElement(record) { 
    let user = record.user || { 'name': { 'first': '', 'last': '' } };
    let authorElement = document.createElement('div');
    authorElement.classList.add('author-name');
    authorElement.innerHTML = user.name.first + ' ' + user.name.last;
    return authorElement;
}
//Создает и возвращает элемент для отображения количества голосов (upvotes) записи.
function createUpvotesElement(record) { 
    let upvotesElement = document.createElement('div');
    upvotesElement.classList.add('upvotes');
    upvotesElement.innerHTML = record.upvotes.toString();
    return upvotesElement;
}
//Создает и возвращает элемент для отображения нижней части записи (автор и голоса).
function createFooterElement(record) { 
    let footerElement = document.createElement('div');
    footerElement.classList.add('item-footer');
    footerElement.append(createAuthorElement(record));
    footerElement.append(createUpvotesElement(record));
    return footerElement;
}
//Создает и возвращает элемент для отображения содержания (текста) записи.
function createContentElement(record) { 
    let contentElement = document.createElement('div');
    contentElement.classList.add('item-content');
    contentElement.innerHTML = record.text;
    return contentElement;
}
//Создает и возвращает элемент для отображения всей записи, включая содержание и нижнюю часть.
function createListItemElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('facts-list-item');
    itemElement.append(createContentElement(record));
    itemElement.append(createFooterElement(record));
    return itemElement;
}
//Очищает список записей и добавляет новые элементы записей на основе переданных данных.
function renderRecords(records) {
    let factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        factsList.append(createListItemElement(records[i]));
    }
}
//Устанавливает информацию о пагинации (общее количество записей, текущий интервал) на странице.
function setPaginationInfo(info) {
    document.querySelector('.total-count').innerHTML = info.total_count.toString();
    let start = info.total_count && (info.current_page - 1) * info.per_page + 1;
    document.querySelector('.current-interval-start').innerHTML = start.toString();
    let end = Math.min(info.total_count, start + info.per_page - 1);
    document.querySelector('.current-interval-end').innerHTML = end.toString();
}
//Создает и возвращает кнопку для определенной страницы с возможностью добавления классов.
function createPageBtn(page, classes = []) {
    let btn = document.createElement('button');
    classes.push('btn');
    for (let cls of classes) {
        btn.classList.add(cls);
    }
    btn.dataset.page = page.toString();
    btn.innerHTML = page.toString();
    return btn;
}
//Очищает контейнер пагинации и добавляет кнопки для каждой страницы, а также кнопки для первой и последней страницы.
function renderPaginationElement(info) {
    let btn;
    let paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = 'Первая страница';
    if (info.current_page == 1) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);
    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pages-btns');
    paginationContainer.append(buttonsContainer);
    let start = Math.max(info.current_page - 2, 1);
    let end = Math.min(info.current_page + 2, info.total_pages);
    for (let i = start; i <= end; i++) {
        btn = createPageBtn(i, i == info.current_page ? ['active'] : []);
        buttonsContainer.append(btn);
    }
    btn = createPageBtn(info.total_pages, ['last-page-btn']);
    btn.innerHTML = 'Последняя страница';
    if (info.current_page == info.total_pages) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);
}
//Выполняет запрос к серверу для получения данных о записях, затем обновляет интерфейс (записи, пагинация).
function downloadData(page = 1) {
    let factsList = document.querySelector('.facts-list');
    let url = new URL(factsList.dataset.url);
    let perPage = document.querySelector('.per-page-btn').value;
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per-page', perPage);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    };
    xhr.send();
}
//Обработчик события изменения значения кнопки "на странице", запускает функцию downloadData 
//для загрузки данных с новым числом записей на странице.
function perPageBtnHandler(event) {
    downloadData(1);
}
//Обработчик события клика по кнопкам пагинации, запускает функцию downloadData для загрузки данных соответствующей страницы.
function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        downloadData(parseInt(event.target.dataset.page));
        window.scrollTo(0, 0);
    }
}
//Обработчик события клика по кнопке поиска, выполняет запрос на сервер с учетом введенных данных и обновляет интерфейс.
function searchBtnHandler() {
    let url = new URL("http://cat-facts-api.std-900.ist.mospolytech.ru/facts");
    const searchData = document.querySelector('search-field').value;
    url.searchParams.append('q', searchData.toString());
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    };
    xhr.send();
}
//Получает данные для автозаполнения и вызывает функцию setAutocompleteData для обновления интерфейса.
function getAutocompleteData() {
    let url = new URL("http://cat-facts-api.std-900.ist.mospolytech.ru/autocomplete");
    const currentData = document.getElementsByClassName('search-field')[0].value;
    url.searchParams.append('q', currentData.toString());
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.responseType = 'text';
    xhr.onload = function () {
        setAutocompleteData(JSON.parse(xhr.response));
    };
    xhr.send();
}
//Устанавливает данные для автозаполнения в выпадающем списке и добавляет обработчики событий.      (.....)
//Эта функция создает элементы списка (li) в выпадающем списке (autocompleteList) на 
//основе данных (data), которые представляют варианты автозаполнения. При вводе текста в поле
//поиска (input), выполняется запрос на сервер для получения данных, и функция setAutocompleteData
//вызывается для обновления интерфейса с новыми вариантами автозаполнения.


function setAutocompleteData(data) {
    const input = document.getElementById("autocomplete-input");
    const autocompleteList = document.getElementById("autocomplete-list");
    if (!autocompleteList)
        return;
    function setBorder() {
        if (!autocompleteList)
            return;
        autocompleteList.style.border = "5px solid #e63946";
        autocompleteList.style.borderTop = "none";
        input.style.borderBottom = "none";
    }
    function delBorder() {
        if (!autocompleteList)
            return;
        autocompleteList.style.border = "none";
        input.style.borderBottom = "5px solid #e63946";
    }
    if (!data || data.length == 0) {
        autocompleteList.innerHTML = "";
        delBorder();
    }
    else {
        setBorder();
    }
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter")
            return;
        autocompleteList.innerHTML = "";
        for (let str of data) {
            const listItem = document.createElement("li");
            listItem.classList.add("autocomplete-item");
            listItem.textContent = str;
            listItem.addEventListener("click", function () {
                input.value = str;
                autocompleteList.innerHTML = "";
                delBorder();
            });
            autocompleteList.appendChild(listItem);
        }
    });
}
window.onload = function () {
    var _a;
    downloadData();
    const paginationElement = document.querySelector('.pagination');
    if (paginationElement) {
        paginationElement.onclick = pageBtnHandler;
    }
    const perPageBtn = document.querySelector('.per-page-btn');
    if (perPageBtn) {
        perPageBtn.onchange = perPageBtnHandler;
    }
    //Обработчик события для поиска записей, вызывает функцию downloadData с учетом введенных данных и обновляет интерфейс.
    function searchHandler() {
        const autocompleteList = document.getElementById("autocomplete-list");
        const input = document.getElementById("autocomplete-input");
        if (autocompleteList)
            autocompleteList.innerHTML = "";
        if (!autocompleteList)
            return;
        autocompleteList.style.border = "none";
        input.style.borderBottom = "5px solid #e63946";
        let url = new URL("http://cat-facts-api.std-900.ist.mospolytech.ru/facts");
        const searchData = document.getElementsByClassName('search-field')[0].value;
        url.searchParams.append('q', searchData.toString());
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url.toString());
        xhr.responseType = 'json';
        xhr.onload = function () {
            renderRecords(this.response.records);
            setPaginationInfo(this.response['_pagination']);
            renderPaginationElement(this.response['_pagination']);
        };
        xhr.send();
        input.value = "";
    }
    //Обработчик события для нажатия клавиши Enter, вызывает функцию searchHandler.
    function handleEnterKey(event) {
        if (event.key === "Enter") {
            searchHandler();
        }
    }
    const searchBtn = document.querySelector('.search-btn');
    searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener('click', searchHandler);
    const inputElement = document.getElementById("autocomplete-input");
    inputElement === null || inputElement === void 0 ? void 0 : inputElement.addEventListener("keydown", handleEnterKey);
    const autocomplete = document.getElementsByClassName('search-field')[0];
    autocomplete.addEventListener('input', function () {
        getAutocompleteData();
    });
    document.getElementById("autocomplete-list").style.width = ((_a = document.getElementById("input-container")) === null || _a === void 0 ? void 0 : _a.offsetWidth) - 10 + "px";
};