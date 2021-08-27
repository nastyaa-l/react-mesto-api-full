 //объект с селекторами валидации
export const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputElement: 'popup__input_active',
    errorClass: 'popup__input-error_active'
};

// класс апи начальных данных
 export const apiData = {
  url: 'http://178.154.198.113/api',
  headers: {
    'Content-Type' : 'application/json',
    authorization: 'dadbc927-3d26-4ae7-ad00-1ca5a4a7f849',

  },
 };
