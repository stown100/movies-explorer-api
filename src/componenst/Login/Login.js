import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import UseInput from "../UseInput/UseInput";
import Form from "../From/Form";

const Login = ({ onLogin }) => {
    const email = UseInput('', { isEmpty: true, minLengthError: 3, isEmail: true });
    const password = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
    const history = useHistory();

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // onLogin({ email, password })
        //     .then(() => history.push('/movies'))
        //     .catch(() => history.push('/error'))
            e.preventDefault();
            history.push('/movies');
    }

    return (
        <Form onSubmit={handleSubmit} title="Рады видеть!" text="Ещё не зарегестрированы?" link="Регистрация" to="signup">
            <p className="form__text-input">E-mail</p>
            <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}
                value={email.value} type="email"
                className={((email.isDirty && email.isEmpty) || (email.isDirty && email.minLengthError) || (email.isDirty && email.emailError))
                    ? "form__input_red"
                    : "form__input"} required>
            </input>
            {((email.isDirty && email.isEmpty) || (email.isDirty && email.minLengthError) || (email.isDirty && email.emailError)) && <span className="form__input_span">
                Введите email длиной не менее 3 символов
            </span>}

            <p className="form__text-input">Пароль</p>
            <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)}
                value={password.value} type="password"
                className={((password.isDirty && password.isEmpty) || (password.isDirty && password.minLengthError) || (password.isDirty && password.maxLengthError))
                    ? "form__input_red"
                    : "form__input"} required>
            </input>
            {((password.isDirty && password.isEmpty) || (password.isDirty && password.minLengthError) || (password.isDirty && password.maxLengthError)) && <span className="form__input_span">
                Введите пароль от 2 до 30 символов
            </span>}
            <button disabled={!email.inputValid || !password.inputValid} type="submit" className="form__button">Войти</button>

        </Form>
    )
}

export default Login;