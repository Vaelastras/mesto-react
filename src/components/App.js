import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import {api} from '../utils/Api'
import {CurrentUserContext} from '../context/CurrentUserContext'

function App () {

  // стейты попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false); 
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)


  // effects block code
  React.useEffect(() => {
    api.getInfoFromServer()
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
    })
    .catch(err => console.log(err));
  }, [])

  React.useEffect(()=> {
    document.addEventListener('keydown', handleEscapeClose)
    document.addEventListener("mousedown", handleOverlayClose)

    return () =>{
      document.removeEventListener('keydown', handleEscapeClose)
      document.removeEventListener("mousedown", handleOverlayClose )
    }
  })

  // close handlers

  function handleEscapeClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups()
    }
  }

  function handleOverlayClose(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  //setstate block

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


 // fetch handlers
  function handleUpdateUser(data) {
    setIsLoading(true)
    api.patchUserProfile(data)
      .then((res) => {
        setCurrentUser(res)
        setIsLoading(false)
        closeAllPopups()
      }
    )
    .catch(err => console.log(err));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.patchAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        setIsLoading(false)
        closeAllPopups();
      }
    )
    .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c)
          setCards(newCards)
        })
        .catch(err => console.log(err));

    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c)
          setCards(newCards)
        })
        .catch(err => console.log(err));
    }
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    api.deleteCard(card._id, !isOwn)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.filter((c) => c._id === card._id ? !newCard : c);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(item){
    api.postUserCard(item)
      .then((res) => {
        setCards([...cards, res]);
        closeAllPopups()
        }
      )
      .catch(err => console.log(err));
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header />
          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace ={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

         <AddPlacePopup
           isOpen={isAddPlacePopupOpen}
           onClose={closeAllPopups}
           onAddPlace={handleAddPlaceSubmit}
         />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <ImagePopup
            card={selectedCard}
            isClose={closeAllPopups}

          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
