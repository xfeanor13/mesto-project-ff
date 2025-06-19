import './pages/index.css';

//import { initialCards } from './scripts/cards.js'; //

import { createNewCard, deleteCard, likeCard } from './scripts/newCard.js'; 

import { openModalWindow, closeModalWindow} from './scripts/modal.js';

import { enableValidation, clearValidation } from "./scripts/validation.js";

import { getInfo, updateUserInfo, createNewApiCard, updateUserAvatar} from './scripts/api.js';

const cardsContainer = document.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const editTitlePopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const typeImagePopup = document.querySelector('.popup_type_image');
const contentImage = typeImagePopup.querySelector('.popup__image');
const captionImagePopup = typeImagePopup.querySelector('.popup__caption');
//const cardImage = document.querySelector('.card__image');
//const closePopup = document.querySelector('.popup__close');
const profileTitle=document.querySelector('.profile__title');
const profileDescription=document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriprionInput = document.querySelector('.popup__input_type_description');
const placeNameNewCard=document.querySelector('.popup__input_type_card-name');
const linkNewCard=document.querySelector('.popup__input_type_url');
const formElementProfile = document.querySelector('.popup_type_edit .popup__form');
const formElementAddCard= document.querySelector('.popup_type_new-card .popup__form');
const profileImage = document.querySelector('.profile__image'); 
const editAvatarIcon = document.querySelector('.profile__image');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const formElementAvatar = document.querySelector('.popup_type_new-avatar .popup__form');
const editAvatarPen = document.querySelector('.icon__edit');
const inputAvatarLink = document.querySelector('.popup_type_new-avatar .popup__input_type_url');

const settingsValidation = { 
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};



getInfo() 
  .then(([cardsResponse, userResponse]) => {
    const cards = cardsResponse;
    
    const user = userResponse;

    // Сохраняем _id пользователя
    const userId = user._id;
    // Рендерим карточки с учетом состояния лайков и удаления
    cards.forEach((card) => {
      let availabilityDelete = false;
      if (card.owner._id === userId) {
        availabilityDelete = true;
      }
      let likeIsLiked = false;
      if (card.likes.some((like) => like._id === userId)) {
        likeIsLiked = true;
      }
      const card_unit = createNewCard(
        card.name,
        card.link,
        increaseImage,
        likeCard,
        deleteCard,
        card.likes.length,
        availabilityDelete,
        card._id,
        userId,
        likeIsLiked
      );
      cardsContainer.append(card_unit);
    });

    // Настраиваем профиль пользователя
    
    profileTitle.textContent = user.name;
    
    profileDescription.textContent = user.about;
    profileImage.setAttribute("style", `background-image: url(${user.avatar})`);
  })
  .catch((err) => {
    // Обрабатываем ошибку
    alert(err);
  });

  enableValidation(settingsValidation);


function showEditPopup () {
  openModalWindow(editTitlePopup);
  nameInput.value = profileTitle.textContent;
  descriprionInput.value = profileDescription.textContent;
  clearValidation(formElementProfile, settingsValidation);
};
editButton.addEventListener('click', showEditPopup);
function showAddPopup () {
  openModalWindow(newCardPopup);
};
addButton.addEventListener('click', showAddPopup);

function increaseImage (name, link) {
  contentImage.src = link;
  contentImage.alt = name;
  captionImagePopup.textContent = name;
  openModalWindow(typeImagePopup);
};


function addListenerSomePopup(popup) {
  const closeButton=popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
      closeModalWindow(popup);
  });
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
          closeModalWindow(popup);
      }
  })
};
addListenerSomePopup(editTitlePopup);
addListenerSomePopup(newCardPopup);
addListenerSomePopup(typeImagePopup);
addListenerSomePopup(popupNewAvatar);

function newFormSubmit(evt) {
  evt.preventDefault();
  const safeButton = editTitlePopup.querySelector(
    `${settingsValidation.submitButtonSelector}`
  );
  safeButton.textContent = "Сохранение...";
  updateUserInfo(nameInput, descriprionInput)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModalWindow(editTitlePopup);
    })
    .catch((err) => {
      // Обрабатываем ошибку
      alert(err);
    }).finally(() => {
      // Возвращаем первоначальный текст кнопки
      safeButton.textContent = "Сохранить";
    });
};

formElementProfile.addEventListener('submit', newFormSubmit); 


formElementAddCard.addEventListener('submit', newCardAdd);


function newCardAdd(evt) { //-
  evt.preventDefault();
  const safeButton = newCardPopup.querySelector(
    `${settingsValidation.submitButtonSelector}`
  );
  safeButton.textContent = "Сохранение...";
  createNewApiCard(placeNameNewCard, linkNewCard)
    .then((card) => {
      const cardId = card._id;
      const userId = card.owner._id;
      const amountLikes = card.likes.length;
      cardsContainer.prepend(
        createNewCard(
          placeNameNewCard.value,
          linkNewCard.value,
          increaseImage,
          likeCard,
          deleteCard,
          amountLikes,
          true,
          cardId,
          userId,
          false
        )
      );
      safeButton.textContent = "Сохранить";
      closeModalWindow(newCardPopup);
      formElementAddCard.reset();
      clearValidation(formElementAddCard, settingsValidation, true);
    })
    .catch((err) => {
      // Обрабатываем ошибку
      alert(err);
    }).finally(() => {
      // Возвращаем первоначальный текст кнопки
      safeButton.textContent = "Сохранить";
    });
}







editAvatarIcon.addEventListener("click", openPopupAvatar); 

function openPopupAvatar() { 
  openModalWindow(popupNewAvatar);
};

formElementAvatar.addEventListener("submit", makeNewAvatarInForm);

function makeNewAvatarInForm(evt) { //-
  evt.preventDefault();
  const safeButton = popupNewAvatar.querySelector(
    `${settingsValidation.submitButtonSelector}`
  );
  safeButton.textContent = "Сохранение...";
  updateUserAvatar(inputAvatarLink)
    .then((user) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${user.avatar})`
      );
      safeButton.textContent = "Сохранить";
      closeModalWindow(popupNewAvatar);
      formElementAvatar.reset();
      clearValidation(formElementAvatar, settingsValidation, true);
    })
    .catch((err) => {
      // Обрабатываем ошибку
      alert(err);
    }).finally(() => {
      // Возвращаем первоначальный текст кнопки
      safeButton.textContent = "Сохранить";
    });
};


