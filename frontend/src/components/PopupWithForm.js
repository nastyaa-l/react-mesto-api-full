import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup__overlay ${props.isOpen ? `popup__overlay_active` : ""}`}>
      <div className="popup__content popup__content_edit">
        <h2 className="popup__subscription">{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={`${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            disabled={props.disabled}
            className={
              props.formValid
                ? "popup__submit popup__submit_form-edit"
                : "popup__submit popup__submit_form-edit popup__submit_disabled"
            }
          >
            {props.button}
          </button>
        </form>
        <button
          className="popup__button-close popup__button-close_close-edit"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
