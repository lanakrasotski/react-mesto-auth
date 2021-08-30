import { useState } from "react";

function Login (props) {
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
    props.onLogin (
      password, 
      email       
    )
  }

  return (
    <main className="sign">
      <h1 className="sign__title">Вход</h1>
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
            >Войти</button>
        </form>
      </div>
    </main>
  )
}

export default Login;