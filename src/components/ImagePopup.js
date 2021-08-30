function ImagePopup ({card, onClose}) {
  return (
    <div className={`popup popup_img ${card.isOpen && card.link !=='' ? 'popup_opened' : ""}`}>
      <div className="popup__content-img">
        <button 
          type="button" 
          className="button popup__btn-close"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <p className="popup__image-title">{card.name}</p>
      </div>  
    </div>

  )
}

export default ImagePopup;