import React from "react";
import {Link, withRouter} from "react-router-dom";

function Register(props) {
  const [inputValues, setInputValues] = React.useState({email: '', password: ''})

  function handleChange(e) {
    const {name, value} = e.target;
    setInputValues({...inputValues,
    [name]: value
  });
}


  function handleSubmit(e){
    e.preventDefault();
    const {email, password} = {...inputValues}
    props.register(email, password)
  }

  return (
        <div className="form">
          <h2 className="form__subscription">Регистрация</h2>
          <form onSubmit={handleSubmit} className="form__content"  name="form__login" >
            <input
              type="email"
              id="form__email"
              className="form__input form__inpur_email"
              name="email"
              minLength="2"
              maxLength="40"
              placeholder="Email"
              value={inputValues.email}
              onChange={handleChange}
              required
            />
            <span className="form__input-error"></span>
            <input
              type="password"
              id="pasword"
              className="form__input form__input_password"
              name="password"
              minLength="2"
              maxLength="40"
              placeholder="Пароль"
              value={inputValues.password}
              onChange={handleChange}
              required
            />
      <span className="form__input-error"></span>
          <button type="submit" className="form__submit form__submit_password">Зарегестрироваться</button>
          <Link to="signin" className="form__text">Уже зарегистрированы? Войти</Link>
        </form>
        </div>

  )
}

export default withRouter(Register);
