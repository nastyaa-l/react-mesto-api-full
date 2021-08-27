import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const user = React.useContext(CurrentUserContext);

  return (
    <CurrentUserContext.Provider value={user}>
      <main className="content">
        <section className="profile section content__profile">
          <div className="profile__content">
            <img className="profile__avatar" alt="Аватар профиля" src={user.avatar} />
            <button onClick={props.onEditAvatar} className="profile__avatar-edit" type="button"></button>
            <div className="profile__info">
              <h1 className="profile__name">{user.name}</h1>
              <button onClick={props.onEditProfile} className="profile__edit-button" type="button"></button>
              <p className="profile__subscription">{user.about}</p>
            </div>
          </div>
          <button onClick={props.onAddPlace} className="profile__add-button" type="button"></button>
        </section>
        <section className="elements section content__elements">
          <ul className="elements__items">
            {props.cards.map((card) => (
              <Card
                key={card._id}
                onCardClick={props.onCardClick}
                card={card}
                onCardLike={props.onCardLike}
                onCardDelete={props.onDeleteClick}
              />
            ))}
          </ul>
        </section>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default Main;


