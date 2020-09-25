import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from "./ImagePopup";
import {api} from '../utils/Api'
import {CurrentUserContext} from '../context/CurrentUserContext'
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App () {

    // стейты попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({}) // работаем с объектом!!


  React.useEffect(() => {
    api.getInfoFromServer()
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
    })
  }, [])

  React.useEffect(()=> {
    document.addEventListener('keydown', handleEscapeClose)
    document.addEventListener("mousedown", handleOverlayClose )

    return () =>{
      document.removeEventListener('keydown', handleEscapeClose)
      document.removeEventListener("mousedown", handleOverlayClose )
    }

  })

  function handleEscapeClose(e) {
      if (e.key === 'Escape'){
        closeAllPopups()
      }
  }

  function handleOverlayClose(e) {
      if (e.target.classList.contains('popup')) {
        closeAllPopups()
      }
  }

  function handleEditAvatarClick () {
      setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard('')
    }

    function handleCardClick(card) {
      setSelectedCard(card); 
    }

    function handleUpdateUser(data) {
      api.patchUserProfile(data)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups();
        }
      )
    }

    function handleUpdateAvatar(data) {
      api.patchAvatar(data)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups();
        }
      )
    }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c)
          setCards(newCards)
        })
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c)
          setCards(newCards)
        })
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
  }

  function handleAddPlaceSubmit(item){
    api.postUserCard(item)
      .then((res) => {
        setCards([...cards, res]);
        closeAllPopups()
        }
      )
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
          />

          <PopupWithForm
            title="Вы уверены?"
            name="confirm"
            submitTitle="Да"
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
