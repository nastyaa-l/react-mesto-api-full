import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext"

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
const currentUser = React.useContext(CurrentUserContext);

const isOwn = card.owner._id === currentUser._id;
const cardDeleteButtonClassName = (
  `element__bin ${isOwn ? 'element__bin_active' : ''}`
);

const isLiked = card.likes.some(i => i._id === currentUser._id);
const cardLikeButtonClassName = (
  `element__like ${isLiked ? 'element__like_black' : ''}`
);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick(){
    onCardLike(card);
  }

  function handleCardDelete(){
    onCardDelete(card);
  }

  return (
    <li className="element">
      <div className="element__container">
      <img className="element__picture" alt={card.name} src={card.link} onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}  ></button>
      </div>
      <div className="element__name-content">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-content">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="element__like-num">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
