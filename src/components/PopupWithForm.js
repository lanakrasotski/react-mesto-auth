function PopupWithForm({isOpen, onClose, onSubmit, name, title, children, btn}){

  return (
    <div 
      className={`popup popup_${name} ${
      isOpen ? 'popup_opened' : ""}`}
    >
      <div className="popup__content">
        <button 
          type="button"
          className="button popup__btn-close" 
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form 
          className={`form form_${name}"`} 
          name={`${name}Form`}
          onSubmit={onSubmit}
        >
          {children}
          <button 
            type="submit" 
            className="button form__submit-btn">
              {btn}
          </button>
        </form>
      </div>
  </div>

  )
}

export default PopupWithForm;