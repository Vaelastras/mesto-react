import React from "react";


function PopupWithForm(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`} >
      <form className="popup__container popup__container_type_profile" name={`${props.name}`} method="GET"
            action="#" noValidate>
        <button className="popup__close" type="reset" aria-label="закрыть" onClick={props.onClose}/>
        <h3 className="popup__title">{props.title}</h3>
        {/*редактировать профиль*/}
        {props.children}
        <button className="popup__submit" type="submit">{`${props.submitTitle}`}</button>
      </form>
    </div>

  )
}
export default PopupWithForm