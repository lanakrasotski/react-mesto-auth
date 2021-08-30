import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleCardNameEdit = (e) => {
    setName(e.target.value);
  }

  const handleLinkEdit = (e) => {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name,
      link
    })

    setName("");
    setLink("");
  }

  return <PopupWithForm 
    name="add"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    title="Новое место"
    btn="Создать"
>
  <label className="popup__inner">
    <input 
      name="name"
      className="form__input form__input_addName"
      placeholder="Название"
      minLength="2"
      maxLength="30"
      required
      value={name}
      onChange={handleCardNameEdit}
    />
    <span className="form__input-error addName-error"></span>

  </label>

  <label className="popup__inner">
    <input 
      type="url"
      name="link"
      className="form__input form__input_addLink"
      placeholder="Ссылка на картинку"
      required
      value={link}
      onChange={handleLinkEdit}
    />
    <span className="form__input-error addLink-error"></span>
    
  </label>
</PopupWithForm>

}

export default AddPlacePopup;