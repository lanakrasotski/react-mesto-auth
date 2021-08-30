import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext"; 
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(""); 
  const [about, setAbout] = useState("");

  const handleNameEdit = (e) => {
    setName(e.target.value);
  }

  const handleAboutEdit = (e) => {
    setAbout(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen])

  return (
    <PopupWithForm 
        name="edit"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title="Редактировать профиль"
        btn="Сохранить"
      >
        <label className="popup__inner">
          <input 
            name="name"
            className="form__input form__input_editName"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={name || ""}
            onChange={handleNameEdit}
          />
          <span className="form__input-error name-error"></span>

        </label>

        <label className="popup__inner">
          <input 
            name="about"
            className="form__input form__input_editName"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            value={about || ""}
            onChange={handleAboutEdit}
          />
          <span className="form__input-error about-error"></span>
          
        </label>
      </PopupWithForm>
  )
}

export default EditProfilePopup;