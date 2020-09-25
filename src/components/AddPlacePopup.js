import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {

  // const [title, setTitle] = React.useState('')
  // const [link, setLink] = React.useState('')
  let titleRef = React.useRef('')
  let linkRef = React.useRef('')
  //
  // React.useEffect((evt) => {
  //   titleRef.current.value = evt.target.value;
  //   linkRef = '';
  // },[isOpen])


  function handleTitleType(evt) {
    titleRef.current.name = evt.target.value;
  }

  function handleLinkType(evt) {
    linkRef.current.link = evt.target.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value
    })
  }

  return(
    <PopupWithForm
      title="Новое место"
      name="new-place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle={'Создать'} >

      <fieldset className="popup__inputs">
        <input
          ref={titleRef}
          onChange={handleTitleType}
          className="popup__input popup__input_type_title"
          type="text"
          name="title"
          defaultValue=""
          id="title-input"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          required
        />
        <span className="popup__error" id="title-input-error" />
        <input
          ref={linkRef}
          onChange={handleLinkType}
          className="popup__input popup__input_type_url"
          type="url"
          name="url"
          defaultValue=""
          id="url-input"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error" id="url-input-error"/>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup