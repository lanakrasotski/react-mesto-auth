import successed from '../images/successed.svg';
import failed from '../images/failed.svg';

function InfoTooltip ({ isOpen, onClose, isRegistered }) {
  return (
    <div
      className={`popup popup_infoTooltip ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__content">
          <button
            type="button"
            className="button popup__btn-close"
            onClick={onClose}
          ></button>
          <img 
            className="popup_infoTultip-icon" 
            src={isRegistered ? successed : failed}
            alt="icon"
          />
          <p className="popup__title">{isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
  </div>
  )
}

export default InfoTooltip;