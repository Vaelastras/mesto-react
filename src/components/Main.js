import React from "react";
import {api} from '../utils/Api'
import Card from "./Card";

function Main(props) {

  const [userInfo, setUserInfo] = React.useState({})
  const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
      api.getInfoFromServer().then( ([userData, initialCards]) => {

        setUserInfo(userData)
        setCards(initialCards)
      })
    }, [])

    return(
        <main className="content">

            <section className="profile">
                <div className="profile__image">
                    <div className="profile__avatar" alt={''} style={{ backgroundImage: `url(${userInfo.avatar})` }}/>
                    <button className='profile__edit-avatar' type="button" aria-label="Редактировать аватар" onClick={props.onEditAvatar} />
                </div>

                <div className="profile__info">
                    <div className="profile__row">
                        <h1 className="profile__title">{userInfo.name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}/>
                    </div>
                    <p className="profile__job-description">{userInfo.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить элемент" onClick={props.onAddPlace}/>
            </section>

            <section className="elements" aria-label="элементы">
              {cards.map((item, index) => 
                <Card 
                  key={index} 
                  card={item} 
                  onCardClick={props.onCardClick} 
                />
              )}
            </section>
        </main>
    )
}

export default Main;