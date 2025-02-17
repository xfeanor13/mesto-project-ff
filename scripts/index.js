// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createNewCard (cardData) {
    const newCard = cardTemplate.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    cardImage.alt = cardData.name;
    console.log(cardData.link);
    cardImage.src = cardData.link;
    const cardTitle = newCard.querySelector('.card__title');
    cardTitle.textContent = cardData.name;
    const deleteButton = newCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard)
    return newCard;
};
// @todo: Функция удаления карточки
function deleteCard(evt) {
    const cardItem = evt.target.closest('.places__item');
    cardItem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const appearance = createNewCard(item);
    cardsContainer.append(appearance);
 });