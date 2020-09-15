import React from "react";

function Main() {
    return(
        <main className="content">
            <section className="profile">
                <div className="profile__image">
                    <img className="profile__avatar"/>
                    <button className='profile__edit-avatar' type="button" aria-label="Редактировать аватар"></button>
                </div>

                <div className="profile__info">
                    <div className="profile__row">
                        <h1 className="profile__title">Жак-Ив Кусто</h1>
                        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль"/>
                    </div>
                    <p className="profile__job-description">Исследователь океана</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить элемент"></button>
            </section>
            <section className="elements" aria-label="элементы"></section>
        </main>
    )
}

export default Main;