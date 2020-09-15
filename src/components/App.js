import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
      <body className="page">
        <div className="root">
            <Header />
            <Main/>
            <Footer />
            {/*start template*/}
            <template id="template">
                <div className="element">
                    <img className="element__photo" src="#" alt="" />
                        <button className="element__trash" type="button" aria-label="Удалить"></button>
                        <div className="element__row">
                            <h2 className="element__title"></h2>
                            <div className="element__like-section">
                                <button className="element__like" type="button" aria-label="поставить 'лайк'"></button>
                                <span className="element__like-counter">0</span>
                            </div>
                        </div>
                </div>
            </template>
            {/*end template*/}
            <section className="popups">
                <div className="popup popup_type_edit-profile">
                    <form className="popup__container popup__container_type_profile" name="popup-form" method="GET"
                          action="#" noValidate>
                        <button className="popup__close" type="reset" aria-label="закрыть" />
                        <h3 className="popup__title">Редактировать профиль</h3>
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
                                <span className="popup__error" id="name-input-error" />
                                <input
                                    className="popup__input popup__input_type_job"
                                    type="text"
                                    name="about"
                                    id="about-input"
                                    placeholder="Введите профессию"
                                    minLength="2"
                                    maxLength="200"
                                    required />
                                    <span className="popup__error" id="about-input-error" />
                        </fieldset>
                        <button className="popup__submit" type="submit">Сохранить</button>
                    </form>
                </div>

                <div className="popup popup_type_new-place">
                    <form className="popup__container popup__container_type_card" name="popup-form" method="GET" action="#"
                          noValidate>
                        <button className="popup__close" type="reset" aria-label="Закрыть" />
                        <p className="popup__title">Новое место</p>
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
                        <button className="popup__submit" type="submit">Создать</button>
                    </form>
                </div>
                <div className="popup popup_type_image">
                    <div className="popup__image-container">
                        <button className="popup__close" type="reset" aria-label="Закрыть" />
                        <img className="popup__image" src="#" alt="" />
                            <p className="popup__image-title"></p>
                    </div>
                </div>

                <div className="popup popup_type_avatar">
                    <form className="popup__container popup__container_type_avatar" name="popup-avatar" method="GET"
                          action="#" noValidate>
                        <button className="popup__close" type="reset" aria-label="Закрыть"/>
                        <p className="popup__title">Обновить аватар</p>
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
                        <button className="popup__submit" type="submit">Сохранить</button>
                    </form>
                </div>

                <div className="popup popup_type_confirm">
                    <form className="popup__container popup__container_type_confirm" name="popup-сonfirm" method="GET"
                          action="#">
                        <button className="popup__close" type="reset" aria-label="Закрыть"/>
                        <p className="popup__title">Вы уверены?</p>
                        <button className="popup__submit popup__submit_type_confirm" type="submit" aria-label="Отправить">Да </button>
                    </form>
                </div>

            </section>
        </div>
      </body>
  );
}

export default App;
