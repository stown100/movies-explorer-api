import React from 'react'
import { Route, useHistory, Link } from "react-router-dom";
import Header from '../Header/Header';
import UseInput from '../UseInput/UseInput';

const Profile = ({ onSignOut }) => {
    const name = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
    const email = UseInput('', { isEmpty: true, minLengthError: 3, isEmail: true });

    return (
        <Route>
            <div className="profile">
                <Header />
                <div className="profile__title">Привет, Сергей!</div>
                <form className="profile__form" action="#" noValidate>
                    <input onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)}
                        value={name.value} type="text"
                        className={((name.isDirty && name.isEmpty) || (name.isDirty && name.minLengthError) || (name.isDirty && name.maxLengthError))
                            ? "profile__form_input-red" : "profile__form_input"}
                        placeholder="Имя" required>
                    </input>
                    {((name.isDirty && name.isEmpty) || (name.isDirty && name.minLengthError) || (name.isDirty && name.maxLengthError)) && <span className="form__input_span">
                        Введите имя от 2 до 30 символов
                    </span>}

                    <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}
                        value={email.value} type="email"
                        className={((email.isDirty && email.isEmpty) || (email.isDirty && email.minLengthError) || (email.isDirty && email.emailError))
                            ? "profile__form_input-red" : "profile__form_input"} placeholder="email" required>

                    </input>
                    {((email.isDirty && email.isEmpty) || (email.isDirty && email.minLengthError) || (email.isDirty && email.emailError)) && <span className="form__input_span">
                        Введите email длиной не менее 3 символов
                    </span>}
                    <button className="profile__form_button">Редактировать</button>
                    <Link to="/" className="profile__exit" onClick={onSignOut}>Выйти из аккаунта</Link>
                </form>

            </div>
        </Route>
    )
}

export default Profile;