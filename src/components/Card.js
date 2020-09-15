import React from "react";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }
  return(
    <div className="element">
      <img className="element__photo" src={props.card.link} onClick={handleClick} alt={props.card.link} />
      <button className="element__trash" type="button" aria-label="Удалить"/>
      <div className="element__row">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-section">
          <button className="element__like" type="button" aria-label="поставить 'лайк'"/>
          <span className="element__like-counter">{props.card.likes.length > 0 ? `${props.card.likes.length}` : 0}</span>
        </div>
      </div>
    </div>
  )
}

export default Card