import React from "react";

const UseValidation = (value, validations) => {
    const [isEmpty, setEmpty] = React.useState(true);
    const [minLengthError, setMinLengthError] = React.useState(false);
    const [maxLengthError, setMaxLengthError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [inputValid, setInputValid] = React.useState(false)

    React.useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLengthError':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'maxLengthError':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\].,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
                default:
                    break;
            }
        }
    }, [value])

    //Валидация кнопки
    React.useEffect(() => {
        if (isEmpty || maxLengthError || minLengthError || emailError) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [isEmpty, maxLengthError, minLengthError, emailError])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid,
    }
}

export default UseValidation;