/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('DOMContentLoaded', () => {
  const send = document.querySelector('button[name="btn-send"]'),
        delAll = document.querySelector('button[name="btn-delete-all"]'),
        text = document.querySelector('.text'),
        checkbox = document.querySelector('input[name="important"]'),
        todoList = document.querySelector('.todo-list'),
        localStorage = window.localStorage,
        localStorageArr = [];

  function bindBtn() {
    send.addEventListener('click', e => {
      e.preventDefault();

      if (text.value.trim() !== '') {
        console.log(text.value);
        localStorageArr.push({
          important: checkbox.checked,
          message: text.value
        });
        setLocalStorage(localStorageArr);
        initTodoList();
      }

      text.value = '';
    });
  } //установка localstorage 


  function setLocalStorage(array) {
    localStorage.setItem('todo', JSON.stringify(array));
  }

  ; //заполнение переменной localStorageArr при загрузке страницы

  function fillLocalStorageArr() {
    let arr = JSON.parse(localStorage.getItem('todo'));

    for (let i = 0; i < arr.length; i++) {
      localStorageArr.push(arr[i]);
    }
  } //создание всего списка


  function initTodoList() {
    let dataList = '';
    localStorageArr.forEach((item, i) => {
      dataList += `<div class="todo-list__item ${item.important ? 'important' : 'notimportant'}">
                            <p class="num">${i + 1}.</p>
                            <div class="message">
                            <p>${item.message}</p>
                            </div>
                            <div class="close">×</div>
                        </div>`;
    });
    todoList.innerHTML = dataList;
  } //удаление элемента


  function deleteItem() {
    todoList.addEventListener('click', e => {
      let target = e.target;
      localStorageArr.forEach((item, i) => {
        if (target.previousElementSibling.querySelector('p').innerHTML == item.message) {
          localStorageArr.splice(i, 1);
          initTodoList();
          setLocalStorage(localStorageArr);
        }
      });
    });
  } //удалить все элементы


  function deleteItemAll() {
    delAll.addEventListener('click', () => {
      localStorageArr.splice(0, localStorageArr.length);
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

/***/ })

/******/ });
//# sourceMappingURL=script.js.map