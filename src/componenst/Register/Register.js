import React from "react";
import { useHistory } from "react-router-dom";
import UseInput from "../UseInput/UseInput";
import Form from "../From/Form";

const Register = ({ onRegister }) => {
    const name = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
    const email = UseInput('', { isEmpty: true, minLengthError: 3, isEmail: true });
    const password = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
    const history = useHistory();

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // onRegister({ name, email, password })
        //     .then(() => history.push('/signin'))
        //     .catch(() => history.push('/error'))
            e.preventDefault();
            history.push('/signin');
    }

    return (
        <Form onSubmit={handleSubmit} title="Добро пожаловать" text="Вы уже зарегистрированны?" link="Войти" to="signin">
            <p className="form__text-input">Имя</p>
            <input onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)}
                value={name.value} type="text"
                className={((name.isDirty && name.isEmpty) || (name.isDirty && name.minLengthError) || (name.isDirty && name.maxLengthError))
                    ? "form__input_red"
                    : "form__input"} required>
            </input>
            {((name.isDirty && name.isEmpty) || (name.isDirty && name.minLengthError) || (name.isDirty && name.maxLengthError)) && <span className="form__input_span">
                Введите имя от 2 до 30 символов
            </span>}
            <p className="form__text-input">E-mail</p>
            <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}
                value={email.value} type="email"
                className={((email.isDirty && email.isEmpty) || (email.isDirty && email.minLengthError) || (email.isDirty && email.emailError))
                    ? "form__input_red"
                    : "form__input"} required>
            </input>
            {((email.isDirty && email.isEmpty) || (email.isDirty && email.minLengthError) || (email.isDirty && email.emailError)) && <span className="form__input_span">
                Введите email, длиной не менее 3 символов
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
            <button disabled={!email.inputValid || !password.inputValid} type="submit" className="form__button">Зарегестрироваться</button>

        </Form>
    )
}

export default Register;