import { useState } from "react";
import { Link } from "react-router-dom";

function Register ({onRegister}) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister (
      password,
      email
    )
  }

  return (
    <main className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <div className="sign__container">
        <form className="form sign__form" onSubmit={handleSubmit}>
          <label className="sign__inner">
            <input 
              name="email"
              className="form__input sign__input"
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={handleEmailChange} 
            />
            <span className="form__input-error email-error"></span>
            <input 
              name="password"
              className="form__input sign__input"
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange} 
            />
            <span className="form__input-error password-error"></span>
          </label>
          <button 
            type="submit"
            className="button sign__button"
            >Зарегистрироваться</button>
        </form>
      </div>
      <div className="sign-in">
         <h3 className="sign-in__title">
            Уже зарегистрированы?&nbsp;
            <Link to="/sign-in" className="sign-in__link">
              Войти
            </Link>
         </h3>
      </div>
    </main>
  )
}

export default Register;