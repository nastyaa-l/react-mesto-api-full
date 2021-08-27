import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const [nameValid, setNameValid] = React.useState(true);
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const [formValid, setFormValid] = React.useState(true);
  const [nameValidationMessage, setNameValidationMessage] = React.useState("");
  const [desValidationMessage, setDesValidationMessage] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleName(e) {
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
    setNameValidationMessage(e.target.validationMessage)
  }

  function handleDescription(e) {
    setDescription(e.target.value);
    setDescriptionValid(e.target.validity.valid);
    setDesValidationMessage(e.target.validationMessage)
  }

  React.useEffect(() => {
    if (!nameValid || !descriptionValid) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameValid, descriptionValid]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button="Сохранить"
      onSubmit={handleSubmit}
      disabled={!formValid}
      formValid={formValid}
    >
      <input
        type="text"
        id="popup__name"
        className={`popup__input popup__input_form_name ${nameValid ? "" : "popup__input_active"}`}
        name="profileName"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={name || ''}
        onChange={handleName}
        required
      />
      <span className={`popup__input-error popup__name-error ${nameValid ? "" : "popup__input-error_active"}`}
      >{nameValidationMessage}</span>
      <input
        type="text"
        id="popup__subscription"
        className={`popup__input popup__input_form_subscription ${descriptionValid ? "" : "popup__input_active"}`}
        name="profileSub"
        minLength="2"
        maxLength="400"
        placeholder="О себе"
        value={description || ''}
        onChange={handleDescription}
        required
      />
      <span className={`popup__input-error popup__subscription-error ${descriptionValid ? "" : "popup__input-error_active"}`}
      >{desValidationMessage}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

