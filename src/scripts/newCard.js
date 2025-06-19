import { DeleteCard,  removeLike, addLike } from "./api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
function createNewCard (
    name,
    link,
    funcIncreaseImage,
    funcLike,
    deleteCard,
    amountLike,
    availabilityDelete,
    cardId,
    userId,
    likeIsLiked,
    ) {
    const newCard = cardTemplate.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    cardImage.alt = name;
    cardImage.src = link;
    const cardTitle = newCard.querySelector('.card__title');
    cardTitle.textContent = name;
    const deleteButton = newCard.querySelector('.card__delete-button');
    
    if (availabilityDelete) { 
      deleteButton.addEventListener("click", () => 
          deleteCard(cardId, cardElement) 
      ); 
    } else { 
      deleteButton.setAttribute("style", "display: none;"); 
    };
    cardImage.addEventListener('click', () => funcIncreaseImage(name, link));

   
    const cardElement = newCard.querySelector(".places__item");
    const amountLikes = newCard.querySelector(".amount__likes");
    amountLikes.textContent = amountLike;
    
      const buttonLike = newCard.querySelector(".card__like-button"); 
      if (likeIsLiked) { 
        buttonLike.classList.add("card__like-button_is-active"); 
      } //-
      buttonLike.addEventListener("click", () => 
        funcLike(cardId, buttonLike, amountLikes, userId) 
      );
    return newCard;
};

function deleteCard(cardId, сardElement) { 
    DeleteCard(cardId);
    сardElement.remove();
  }



function likeCard(cardId, buttonLike, amountLikes) {                    // function putLikeCard(evt) {      старое
    if (buttonLike.classList.contains("card__like-button_is-active")) {      // evt.target.classList.toggle('card__like-button_is-active');} старое
      removeLike(cardId)
        .then((card) => {
          const amountLikeServer = card.likes.length;
          amountLikes.textContent = amountLikeServer;
          buttonLike.classList.remove("card__like-button_is-active");
        })
        .catch((err) => {
          // Обрабатываем ошибку
          alert(err);
        });
    } else {
      addLike(cardId).then((card) => {
        const amountLikeServer = card.likes.length;
        amountLikes.textContent = amountLikeServer;
        buttonLike.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        // Обрабатываем ошибку
        alert(err);
      });
    }
  }



//function likeCard(evt) {
    //const likeButton = evt.target;
    //likeButton.classList.toggle('card__like-button_is-active');
//};

export {createNewCard, deleteCard, likeCard};