import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [nameValidationMessage, setNameValidationMessage] = React.useState("");
  const [linkValidationMessage, setLinkValidationMessage] = React.useState("");
  const [linkValid, setLinkValid] = React.useState(true);
  const [formValid, setFormValid] = React.useState(false);

  function handleName(e) {
    setName(e.target.value);
    setNameValid(e.target.validity.valid);
    setNameValidationMessage(e.target.validationMessage);
  }

  function handleLink(e) {
    setLink(e.target.value);
    setLinkValid(e.target.validity.valid);
    setLinkValidationMessage(e.target.validationMessage);

  }

  React.useEffect(() => {
    if (!nameValid || !linkValid) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameValid, linkValid]);

  function handleClear() {
    setName("");
    setLink("");
    setFormValid(false);
    setLinkValid(false);
    setNameValid(false);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    }, handleClear);

  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      disabled={!formValid}
      formValid={formValid}
      button="Создать"
    >
      <input
        type="text"
        id="element-name"
        className={`popup__input popup__input_element_name ${nameValid ? "" : "popup__input_active"}`}
        name="element-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleName}
        required
      />
      <span className={`popup__input-error element-name-error ${nameValid ? "" : "popup__input-error_active"}`}>{nameValidationMessage}
      </span>
      <input
        type="url"
        id="element-link"
        className={`popup__input popup__input_element_link ${linkValid ? "" : "popup__input_active"}`}
        name="element-link"
        placeholder="Ссылка на картинку"
        value={link || ''}
        onChange={handleLink}
        required
      />
      <span className={`popup__input-error element-name-error ${linkValid ? "" : "popup__input-error_active"}`}
      >
        {linkValidationMessage}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
