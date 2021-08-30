import '../index.css';
import { useEffect, useState, useCallback } from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();

  const[currentUser, setCurrentUser] = useState({});
  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const[isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const[isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const[cards, setCards] = useState([]);
  const[selectedCard, setSelectedCard ] = useState({name: '', link: ''});

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState({ email: "" });

  useEffect(() => {
    if (isLoggedIn) {
    Promise.all([api.getAllCards(), api.getUserInfo()])
      .then(([cardData, userData]) => {
        setCards([...cardData]);
        setCurrentUser(userData)
      })
      .catch(err => console.log(err));
  }}, [isLoggedIn])

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email);
          setIsLoggedIn(true);
        }
      })
      .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])
  

  const handleEditAvatarClick = () => {
    setIsEditAvatarOpen(true);
  }

  const handleEditProfileClick = ()  => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlaceOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpen: true, 
      name: card.name,
      link: card.link
    })
  }

  const handleUpdateUser = (userData) => {
    api
      .editUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (link) => {
    api
      .editAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = (cardData) => {
    api 
      .addNewCard(cardData)
      .then((newCard) => { 
        setCards([newCard, ...cards]);
        closeAllPopups();
      })  
      .catch(err => console.log(err))
  }

  const closeAllPopups = () => {
    setIsEditAvatarOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlaceOpen(false);
    setSelectedCard({name: '', link: ''});
    setIsInfoTooltipOpen(false)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => 
            state.map((c) => c._id === card._id ? newCard : c));

    })
       .catch(err => console.log(err));
    } else {
        api 
          .addLike(card._id)
          .then((newCard) => {
            setCards((state) => 
              state.map((c) => c._id === card._id ? newCard : c));

          })
          .catch(err => console.log(err));
      }
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => 
          state.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(error));
  }

  const handleRegistration = (password, email) => {
    auth
      .register(password, email)
      .then(() => {
        setIsRegistered(true);
        setIsInfoTooltipOpen(true); 
        history.push('/sign-in')
      })
      .catch(err => {
        console.log(err)
        setIsRegistered(false);
        setIsInfoTooltipOpen(true);
      })
  }

  const handleLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then(data => {
          localStorage.setItem('jwt', data.token);
          setEmail(email);
          setIsLoggedIn(true);
          history.push('/')
      })
      .catch(err => console.log(err));
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/sign-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute 
            exact path="/"
            component={Main}
            loggedIn={isLoggedIn} 
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onDeleteCard={handleCardDelete}
            onCardLike={handleCardLike}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegistration} />
          </Route>
        </Switch>  
        <Footer/>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        /> 
        <EditAvatarPopup 
          isOpen={isEditAvatarOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        /> 
        <AddPlacePopup 
          isOpen={isAddPlaceOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} 
        />
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegistered={isRegistered} 
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
