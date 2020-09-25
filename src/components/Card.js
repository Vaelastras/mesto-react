import React from "react";
import {CurrentUserContext} from '../context/CurrentUserContext'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {

  props.onCardDelete(props.card)
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (`element__trash ${isOwn ? 'element__trash_type_active' : '' }`);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_type_active' : ''}`

  return(
    <div className="element">
      <img className="element__photo" src={props.card.link} onClick={handleClick} alt={props.card.link} />
      <button className={cardDeleteButtonClassName} onClick={handleCardDelete} type="button" aria-label="Удалить"/>
      <div className="element__row">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-section">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="поставить 'лайк'"/>
          <span className="element__like-counter">{props.card.likes.length > 0 ? `${props.card.likes.length}` : 0}</span>
        </div>
      </div>
    </div>
  )
}

export default Card