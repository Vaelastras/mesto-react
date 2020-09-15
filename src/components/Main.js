import React from "react";

function Main(props) {

    return(
        <main className="content">

            <section className="profile">
                <div className="profile__image">
                    <img className="profile__avatar"/>
                    <button className='profile__edit-avatar' type="button" aria-label="Редактировать аватар" onClick={props.onEditAvatar} />
                </div>

                <div className="profile__info">
                    <div className="profile__row">
                        <h1 className="profile__title">Жак-Ив Кусто</h1>
                        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}/>
                    </div>
                    <p className="profile__job-description">Исследователь океана</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить элемент" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements" aria-label="элементы"></section>
        </main>
    )
}

export default Main;