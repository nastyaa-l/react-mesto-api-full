import React from "react";
import {Route, Switch, Redirect, useHistory} from "react-router-dom"
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "./Loader";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import {auth} from "../utils/auth";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatar] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)

  React.useEffect(() => {
    setLoad(true);
    tokenCheck();
    Promise.all([api.getDatas(), api.getCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log("Ошибка в получении данных с сервера", err);
    })
    .finally(() => {
      setLoad(false);
    })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log("Ошибка в постановке лайка", err));
  }

  function handleCardDelete() {
    const card = cardToDelete;
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api.deleteDatas(card._id)
        .then((newCard) => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .then(() => {
          closeAllPopups();
        })
        .catch((err) => {
          console.log("Ошибка в удалении карточки", err);
        });
    } else {
      console.log("Невозможно удалить");
    }
  }

  function handleSetCardDelete(card) {
    setCardToDelete(card);
  }

  function handleEditAvatarClick() {
    setAvatar(true);
  }

  function handleEditProfileClick() {
    setEditPopup(true);
  }

  function handleAddPlaceClick() {
    setAddPopup(true);
  }

  function closeAllPopups() {
    setEditPopup(false);
    setAddPopup(false);
    setAvatar(false);
    setIsInfoTooltipOpen(false);
    setCardToDelete(null);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log('Ошибка в обновлении данных пользователя', err))
  }

  function handleUpdateAvatar(avatar, handleClear) {
    api.patchAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
    })
    .then(() => {
      closeAllPopups();
      handleClear();
    })
    .catch((err) => console.log('Ошибка в смене аватара пользователя', err))
  }

  function handleAddPlace(data, handleClear) {
    api.postCards(data)
    .then((newCard) => {
      setCards([newCard, ...cards])
    })
    .then(() => {
      closeAllPopups();
      handleClear();
    })
    .catch((err) => console.log('Ошибка в добавлении карточки пользователя', err))
  }

  function moveToRegister() {
    history.push('/signup');
  }

  function moveToLogin() {
    history.push('/signin');
  }


  function handleRegister(email, password) {
      auth.register(email, password)
      .then((res) => {
        if(!res.message && !res.error){
          moveToLogin()
          handleOpenInfo("ok")
        } else {
          handleOpenInfo("error")
        }
      })
      .catch((err) => {
        console.log(err)
        handleOpenInfo("error")
      })
    }

  function handleLogin(email, password, handleClear) {
    auth.login(email, password)
    .then((data) => {
      if (data?.token){
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true);
        handleClear();
        setEmail(email);
       history.push('/');
      } else {
        handleOpenInfo("error")
      }
    })
    .catch((err) => {
      console.log(err);
      handleOpenInfo("error")
    }
    );
  }

  function signOut() {
    localStorage.removeItem('jwt');
    moveToLogin()
    setLoggedIn(false)
  }

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      auth.checkToken(jwt).then((res) => {
        if (res?.data?.email){
          setLoggedIn(true);
          history.push("/");
          setEmail(res.data.email)
        }
      }).catch((err) => console.log(err));
    }
  }

  function handleOpenInfo(status) {
    setStatus(status)
    setIsInfoTooltipOpen(true)
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/sign-up">
          <Header text={"Войти"} onClick={moveToLogin}></Header>
          <Register register={handleRegister} />
        </Route>
        <Route path="/sign-in">
        <Header text={"Регистрация"} onClick={moveToRegister}></Header>
        <Login login={handleLogin} />
        </Route>
        <ProtectedRoute exact path="/"  loggedIn={loggedIn}>
        <Header text={"Выйти"} email={email} onClick={signOut}/>
        <Main onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onDeleteClick={handleSetCardDelete}
          cards={cards} >
          </Main>
              <Loader isLoading={load}></Loader>
              <section className="popup">
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}></AddPlacePopup>
                <ConfirmPopup isOpen={cardToDelete ? true : false} onClose={closeAllPopups} onDeleteCard={handleCardDelete}></ConfirmPopup>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
                <ImagePopup onClose={closeAllPopups} card={selectedCard} />
              </section>
              </ProtectedRoute>

        <Route> { loggedIn ? <Redirect to ="/" /> : <Redirect to ="/sign-up" /> }</ Route>
      </Switch>
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={status} />
      <Footer />
      </CurrentUserContext.Provider>
       </div>

  );
}

export default App;


