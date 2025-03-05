export {openModalWindow, closeModalWindow};

function openModalWindow(some) {
    some.classList.add('popup_is-opened');
    document.addEventListener('keydown', pressEsc);
  };

  function closeModalWindow(some) {
    some.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', pressEsc);
  };

  const pressEsc = (evt) => {
    const popupAll = document.querySelector(".popup_is-opened"); 
    if (evt.key === "Escape") {
      closeModalWindow(popupAll);
    }
  }