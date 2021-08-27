function InfoTooltip(props) {
  return(
    <div className={`popup__overlay ${props.isOpen ? `popup__overlay_active` : ""}`}>
      <div className="popup__content popup__content_register">
        <button className={`popup__union ${props.status==="ok" ? "popup__union_active" : "popup__union_disabled"}` }></button>
        <p className="popup__text">{props.status==="ok" ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</p>
        <button
          className="popup__button-close popup__button-close_close-edit"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
