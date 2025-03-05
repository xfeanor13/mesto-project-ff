
export {createNewCard, deleteCard};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createNewCard (cardData, funcIncreaseImage) {
    const newCard = cardTemplate.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    const cardTitle = newCard.querySelector('.card__title');
    cardTitle.textContent = cardData.name;
    const deleteButton = newCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', () => funcIncreaseImage(cardImage.alt, cardImage.src, cardImage.alt));
    const likeButton = newCard.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);
    return newCard;
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const cardItem = evt.target.closest('.places__item');
    cardItem.remove();
};

function likeCard(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle('card__like-button_is-active');
}