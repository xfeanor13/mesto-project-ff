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

function showEditPopup () {
  openModalWindow(editTitlePopup);
  nameInput.value = profileTitle.textContent;
  descriprionInput.value = profileDescription.textContent;
};
editButton.addEventListener('click', showEditPopup);
function showAddPopup () {
  openModalWindow(newCardPopup);
};
addButton.addEventListener('click', showAddPopup);

function increaseImage (cardData) {
  contentImage.src = cardData.link;
  contentImage.alt = cardData.name;
  captionImagePopup.textContent = cardData.name;
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


function newFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriprionInput.value;
  closeModalWindow(editTitlePopup)
};
formElementProfile.addEventListener('submit', newFormSubmit); 

function newCardAdd (evt) {
  evt.preventDefault(); 
  const cardData = {
    name: placeNameNewCard.value,
    link: linkNewCard.value
  };
  createNewCard(cardData, increaseImage, deleteCard, likeCard);
  closeModalWindow(newCardPopup);
  cardsContainer.prepend(createNewCard(cardData, increaseImage, deleteCard, likeCard));
  formElementAddCard.reset();
};
formElementAddCard.addEventListener('submit', newCardAdd);

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const card = createNewCard(item, increaseImage, deleteCard, likeCard);
    cardsContainer.append(card);
 });


