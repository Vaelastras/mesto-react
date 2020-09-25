import React from "react";
import Card from "./Card";
import {CurrentUserContext} from '../context/CurrentUserContext'

function Main(props) {
  const {cards, onEditAvatar, onEditProfile, onAddPlace, onCardLike, onCardDelete, onCardClick} = props;
  const currentUser = React.useContext(CurrentUserContext);


  // const [userInfo, setUserInfo] = React.useState({})

  //
  // React.useEffect(() => {
  //   api.getInfoFromServer().then( ([userData, initialCards]) => {
  //
  //     setUserInfo(userData)
  //     setCards(initialCards)
  //   })
  // }, [])



  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some(i => i._id === currentUser._id);
  //
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   if (!isLiked) {
  //     api.putLike(card._id)
  //       .then((newCard) => {
  //         const newCards = cards.map((c) => c._id === card._id ? newCard : c)
  //         setCards(newCards)
  //       })
  //   } else {
  //     api.deleteLike(card._id)
  //       .then((newCard) => {
  //         const newCards = cards.map((c) => c._id === card._id ? newCard : c)
  //         setCards(newCards)
  //       })
  //   }
  // }
  //
  // function handleCardDelete(card) {
  //   const isOwn = card.owner._id === currentUser._id;
  //   console.log(card, 'hello')
  //   api.deleteCard(card._id, !isOwn)
  //     .then((newCard) => {
  //       // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
  //       const newCards = cards.filter((c) => c._id === card._id ? !newCard : c);
  //       // Обновляем стейт
  //       setCards(newCards);
  //     })
  // }

  return(
        <main className="content">

            <section className="profile">
                <div className="profile__image">
                    <div className="profile__avatar" alt={''} style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
                    <button className='profile__edit-avatar' type="button" aria-label="Редактировать аватар" onClick={onEditAvatar} />
                </div>

                <div className="profile__info">
                    <div className="profile__row">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}/>
                    </div>
                    <p className="profile__job-description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить элемент" onClick={onAddPlace}/>
            </section>

            <section className="elements" aria-label="элементы">
              {cards.map((item, index) =>
                  <Card
                    key={index}
                    card={item}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    onCardClick={onCardClick}
                  />
              )}
            </section>
        </main>
    )
}

export default Main;