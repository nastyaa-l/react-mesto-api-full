function ImagePopup({ card, onClose }) {
  return (
      <div className={`popup__overlay popup__overlay_image-popup ${card ? "popup__overlay_active" : ""}`}>
        <div className="popup__content popup__content_image">
          <figure className="popup__container">
          <img className="popup__image" alt="изображение места" src={card?.link} />
            <figcaption className="popup__caption">{card?.name}</figcaption>
            <button
              className="popup__button-close popup__button-close_close-image"
              type="button"
              onClick={onClose}
            ></button>
          </figure>
        </div>
      </div>
  );
}

export default ImagePopup;
