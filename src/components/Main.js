import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main ({ 
  onEditProfile,
  onEditAvatar,
  onAddPlace, 
  onCardClick,
  onDeleteCard,
  onCardLike,
  cards
 }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content mobile-size">
      <section className="profile">
        <div className="profile__container">
          <div 
            className="profile__avatar-overlay"
            onClick={onEditAvatar}>
            <img 
              className="profile__avatar" 
              name="avatar" 
              src={currentUser.avatar} 
              alt="аватар пользователя"/>
          </div>  
          <div className="profile__info">
            <div className="profile__info-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button 
                type="button" 
                className="button profile__btn-edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subline">{currentUser.about}</p>
          </div>
        </div>
        <button 
          type="button" 
          className="button profile__btn-add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="section">
        <ul className="cards">
          {cards.map((card) => {
            return (
              <Card 
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onDeleteCard={onDeleteCard}
                onCardLike={onCardLike}
              />
            )
            
          })}
        </ul>

      </section>
    </main>  
  )

 
}

export default Main;