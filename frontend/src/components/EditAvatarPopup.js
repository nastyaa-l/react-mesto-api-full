import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState("");
  const [formValid, setFormValid] = React.useState(true);
  const [formValidationMessage, setFormValidationMessage] = React.useState("");


  function handleAvatar(e) {
    setAvatar(e.target.value);
    setFormValid(e.target.validity.valid);
    setFormValidationMessage(e.target.validationMessage)
  }

  function handleClear() {
    setAvatar("");
    setFormValid(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar
    }, handleClear);
  }

  return (
    <PopupWithForm
      name="update"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      disabled={!formValid}
      formValid={formValid}
      button="Сохранить"
    >
      <input
        type="url"
        id="profileUrl"
        className={`popup__input popup__input_update ${formValid ? "" : "popup__input_active"}`}
        name="profileUrl"
        placeholder="Ссылка на картинку"
        value={avatar || ''}
        onChange={handleAvatar}
        required
      />
      <span className={`popup__input-error profileUrl-error ${formValid ? "" : "popup__input-error_active"}`}
      >
        {formValidationMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
