'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const send = document.querySelector('button[name="btn-send"]'),
        delAll = document.querySelector('button[name="btn-delete-all"]'),
        text = document.querySelector('.text'),
        checkbox = document.querySelector('input[name="important"]'),
        todoList = document.querySelector('.todo-list'),
        localStorage = window.localStorage,
        localStorageArr = [];

    function bindBtn() {
        send.addEventListener('click', (e) => {
            e.preventDefault();

            if(text.value.trim() !== '') {
                console.log(text.value);
                localStorageArr.push({important: checkbox.checked, message: text.value});
    
                setLocalStorage(localStorageArr);
                initTodoList();
            }

            text.value = '';
        });
    }

    //установка localstorage 
    function setLocalStorage(array) {
        localStorage.setItem('todo', JSON.stringify(array));
    };

    //заполнение переменной localStorageArr при загрузке страницы
    function fillLocalStorageArr() {
        let arr = JSON.parse(localStorage.getItem('todo'));

        for(let i = 0; i < arr.length; i++) {
            localStorageArr.push(arr[i]);
        }
    }

    //создание всего списка
    function initTodoList() {
        let dataList = '';
        localStorageArr.forEach((item, i) => {
            dataList += `<div class="todo-list__item ${item.important ? 'important' : 'notimportant'}">
                            <p class="num">${i+1}.</p>
                            <div class="message">
                            <p>${item.message}</p>
                            </div>
                            <div class="close">×</div>
                        </div>`;
        });

        todoList.innerHTML = dataList;
    }

    //удаление элемента
    function deleteItem() {
        todoList.addEventListener('click', (e) => {
            let target = e.target;
            localStorageArr.forEach((item,i) => {
                if(target.previousElementSibling.querySelector('p').innerHTML ==
                item.message) {
                    localStorageArr.splice(i, 1);
                    initTodoList();

                    setLocalStorage(localStorageArr);
                }
            });
        });
    }

    //удалить все элементы
    function deleteItemAll() {
        delAll.addEventListener('click', () => {
            localStorageArr.splice(0,localStorageArr.length);
            setLocalStorage(localStorageArr);
            initTodoList();
        });
    }

    function init() {
        bindBtn();
        fillLocalStorageArr();
        initTodoList();
        deleteItem();
        deleteItemAll();
    }
    init();
});