import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {

  function handleDeleteSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      button="Да"
      onSubmit={handleDeleteSubmit}
      isOpen={props.isOpen}
      disabled={false}
      formValid={true}
      onClose={props.onClose}
    ></PopupWithForm>
  );
}

export default ConfirmPopup;
