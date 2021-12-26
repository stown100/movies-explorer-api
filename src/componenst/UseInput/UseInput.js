import React from "react";
import UseValidation from "../UseValidation/UseValidation";

const UseInput = (initialValue, validations) => {
    const [value, setValue] = React.useState(initialValue);
    const [isDirty, setIsDirty] = React.useState(false);
    const valid = UseValidation(value, validations)

    //Обрабатывает изменения внутри инпута
    const onChange = (e) => {
        setValue(e.target.value);
    }
    //Отрабатывает в тот момент, когла пользователь покинул инпут
    const onBlur = (e) => {
        setIsDirty(true)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid,
    }
}

export default UseInput;