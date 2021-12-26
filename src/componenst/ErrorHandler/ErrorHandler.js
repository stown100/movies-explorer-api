import React from 'react';
import { Route, useHistory } from "react-router-dom";

function ErrorHandler() {
    const history = useHistory()
    return (
        <Route>
            <div className="error">
                <h2 className="error__number">404</h2>
                <p className="error__text">Страница не найдена</p>
                <button className="error__link" onClick={history.goBack}>Назад</button>
            </div>
        </Route>
    )
}

export default ErrorHandler;