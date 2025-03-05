import './pages/index.css';

import { initialCards } from './scripts/cards.js';

import { createNewCard, deleteCard, likeCard } from './scripts/newCard.js';

import { openModalWindow, closeModalWindow} from './scripts/modal.js';

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

editButton.addEventListener('click', showEditPopup);
function showEditPopup () {
  openModalWindow(editTitlePopup);
  nameInput.value = profileTitle.textContent;
  descriprionInput.value = profileDescription.textContent;
};
addButton.addEventListener('click', showAddPopup);
function showAddPopup () {
  openModalWindow(newCardPopup);
};
function increaseImage (alt, src, capt) {
  contentImage.src = src;
  contentImage.alt = alt;
  captionImagePopup.textContent = capt;
  openModalWindow(typeImagePopup);
};


function addListener(some) {
  const closeButton=some.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
      closeModalWindow(some);
  });
  some.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
          closeModalWindow(some);
      }
  })
};
addListener(editTitlePopup);
addListener(newCardPopup);
addListener(typeImagePopup);


function newFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriprionInput.value;
  closeModalWindow(editTitlePopup)
};
formElementProfile.addEventListener('submit', newFormSubmit); 


formElementAddCard.addEventListener('submit', newCardAdd);
function newCardAdd (evt) {
  evt.preventDefault(); 
  const cardData = {
    name: placeNameNewCard.value,
    link: linkNewCard.value
  };
  createNewCard(cardData, increaseImage);
  closeModalWindow(newCardPopup);
  cardsContainer.prepend(createNewCard(cardData, increaseImage));
  formElementAddCard.reset();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const card = createNewCard(item, increaseImage);
    cardsContainer.append(card);
 });


