function openModalWindow(some) {
    some.classList.add('popup_is-opened');
    document.addEventListener('keydown', pressEsc);
  };

  function closeModalWindow(some) {
    some.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', pressEsc);
  };

  const pressEsc = (evt) => { 
    if (evt.key === "Escape") {
      const popupAll = document.querySelector(".popup_is-opened");
      closeModalWindow(popupAll);
    }
  };

  export {openModalWindow, closeModalWindow};