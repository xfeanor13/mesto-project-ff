// @todo: Темплейт карточки
const uTemplate=document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList=document.querySelector('.places__list');
// @todo: Функция создания карточки
function makeNewCard (name, link) {
    const newCard=uTemplate.cloneNode(true);
    const cardImage=newCard.querySelector('.card__image');
    cardImage.alt=name;
    cardImage.src=link;
    const cardTitle=newCard.querySelector('.card__title');
    cardTitle.textContent=name;
    const deleteButton=newCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', funDelBut)
    return newCard;
};
// @todo: Функция удаления карточки
function funDelBut(evt) {
    const cardItem=evt.target.closest('.places__item');
    cardItem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const appearance=makeNewCard(item['name'], item['link']);
    placesList.append(appearance);
 });