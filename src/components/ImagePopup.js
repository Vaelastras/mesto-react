import React from "react";

function ImagePopup (props) {
  return(
    <div className="popup popup_type_image">
      <div className="popup__image-container">
        <button className="popup__close" type="reset" aria-label="Закрыть" />
        <img className="popup__image" src="#" alt="" />
        <p className="popup__image-title"></p>
      </div>
    </div>
  )
}

export default ImagePopup