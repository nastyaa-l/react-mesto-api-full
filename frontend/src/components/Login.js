import React from "react";

function Login(props) {

  const [inputValues, setInputValues] = React.useState({email: '', password: ''})

	function handleChange (e) {
    const {name, value} = e.target;
    setInputValues({...inputValues,
      [name]: value
    });
  }

  function handleClear() {
    setInputValues({email: '', password: ''})
  }

  function handleSubmit(e) {
		e.preventDefault();
		const { email, password } = {...inputValues};
		props.login(email, password, handleClear);
	}

  return (
        <div className="form">
          <h2 className="form__subscription">Войти</h2>
          <form className="form__content"  name="form__login" onSubmit={handleSubmit}>
            <input
              type="email"
              id="form__email"
              className="form__input form__input_email"
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
              id="password"
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
          <button
            type="submit"
            className="form__submit form__submit_password"
          >
            Вход
          </button>
        </form>
        </div>

  )
}

export default Login;
