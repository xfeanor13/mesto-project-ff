export { enableValidation, clearValidation };

function checkInputValidity(formElement, inputElement, arr, hideError) {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
    // переменная validationMessage хранит наше кастомное сообщение
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      arr
    );
  } else {
    hideInputError(formElement, inputElement, arr);
  }

  if (hideError === true) {
    hideInputError(formElement, inputElement, arr);
  } 
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, arr) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(arr.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(arr.errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement, arr) {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(arr.inputErrorClass);
  errorElement.classList.remove(arr.errorClass);
  errorElement.textContent = "";
}

// функция активации и деактивации кнопки сохранить
function toggleButtonState(formElement, inputList, arr) {
  const buttonSafe = formElement.querySelector(arr.submitButtonSelector);
  const formNoValid = inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    return (
      inputElement.validity.patternMismatch || !inputElement.validity.valid
    );
  });
  if (formNoValid === true) {
    buttonSafe.setAttribute("disabled", true);
    buttonSafe.classList.add(arr.inactiveButtonClass);
  } else {
    buttonSafe.removeAttribute("disabled", true);
    buttonSafe.classList.remove(arr.inactiveButtonClass);
  }
}

function setEventListeners(formElement, arr) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(arr.inputSelector));
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, arr);
      toggleButtonState(formElement, inputList, arr);
    });
  });
}

function enableValidation(arr) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(arr.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, arr);
  });
}

// Функция обнуления поля ошибок при закрытии модального окна

function clearValidation(formElement, arr, hideError="false") {
  const inputList = Array.from(formElement.querySelectorAll(arr.inputSelector));
  toggleButtonState(formElement, inputList, arr);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, arr, hideError);
  });
}
