import React from "react";

function ImagePopup(props) {
  return(

    <div className={`popup popup_type_image ${props.card && 'popup_active'}`}>
      <div className="popup__image-container">
        <button className="popup__close" type="reset" aria-label="Закрыть" onClick={props.isClose}/>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__image-title">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup