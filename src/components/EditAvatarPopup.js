import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar(inputRef.current.value);
    inputRef.current.value = "";
  } 


  return <PopupWithForm 
    name="avatar"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    title="Обновить аватар"
    btn="Сохранить"
>
  <label className="popup__inner">
    <input 
      ref={inputRef}
      type="url"
      name="avatar"
      className="form__input form__input_avatarLink"
      placeholder="Ссылка на картинку"
      required
    />
    <span className="form__input-error avatarLink-error"></span>

  </label>

</PopupWithForm>

}

export default EditAvatarPopup;