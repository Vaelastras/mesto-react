import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWIthForm";
import ImagePopup from "./ImagePopup";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);

    function handleEditAvatarClick ()  {
      setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
         setSelectedCard(false)
    }

    function handleCardClick(card) {
      setSelectedCard(card)
    }

  return (
      <div className="page">
        <div className="root">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace ={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Footer />

          <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} submitTitle={'Сохранить'} children= {
            <fieldset className="popup__inputs">
                <input
                  className="popup__input popup__input_type_name"
                  type="text"
                  name="name"
                  id="name-input"
                  placeholder="Введите имя"
                  minLength="2"
                  maxLength="40"
                  pattern="[a-zA-Zа-яёА-ЯЁ\s-]*"
                  required />
                <span className="popup__error" id="name-input-error"/>
                <input
                  className="popup__input popup__input_type_job"
                  type="text"
                  name="about"
                  id="about-input"
                  placeholder="Введите профессию"
                  minLength="2"
                  maxLength="200"
                  required />
                <span className="popup__error" id="about-input-error"/>
            </fieldset>
            }/>
          <PopupWithForm title="Новое место" name="new-place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} submitTitle={'Создать'} children= {
            <fieldset className="popup__inputs">
              <input
                className="popup__input popup__input_type_title"
                type="text"
                name="title"
                id="title-input"
                placeholder="Название"
                minLength="1"
                maxLength="30"
                required />
              <span className="popup__error" id="title-input-error" />
              <input
                className="popup__input popup__input_type_url"
                type="url"
                name="url"
                id="url-input"
                placeholder="Ссылка на картинку"
                required />
              <span className="popup__error" id="url-input-error"/>
            </fieldset>
          } />
          <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} submitTitle="Сохранить" children = {
            <fieldset className="popup__inputs">
              <input
                className="popup__input popup__input_type_url"
                type="url"
                name="avatar"
                id="url-input-avatar"
                placeholder="Ссылка на аватар"
                required />
              <span className="popup__error" id="url-input-avatar-error" />
            </fieldset>
          } />
          <PopupWithForm title="Вы уверены?" name="confirm" submitTitle="Да" />
          <ImagePopup card={selectedCard} isClose={closeAllPopups} />
        </div>
      </div>
  );
}

export default App;
