import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card ({card, onCardClick, onDeleteCard, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = ( 
    `button card__btn-delete ${isOwn ? 'card__btn-delete_visible' : ''}`
  ); 

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `button card__btn-like ${isLiked ? 'card__btn-like_active' : ''}`
  ); 

  const handleCardClick = () => {
    onCardClick({name: card.name, link: card.link});
  };

  const handleDeleteClick = () => {
    onDeleteCard(card);
  }

  const handleLikeClick = () => {
    onCardLike(card)
  }

  return (
  <li className="card">
    <img 
      className="card__image" 
      src={card.link} 
      alt={card.name}
      onClick={handleCardClick}/>
  <button 
    type="button" 
    className={cardDeleteButtonClassName}
    onClick={handleDeleteClick}
  ></button>
    <div className="card__wrapper">
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like-wrapper">
        <button 
          type="button" 
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <p className="card__like-counter">{card.likes.length}</p>
      </div>  
    </div>
  </li>

  )
}

export default Card;