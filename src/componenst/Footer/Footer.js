import React from "react";

function Footer() {
    return (
        <div className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm</p>
            <hr className="footer__br"></hr>
            <div className="footer__bot">
                <div className="footer__bot_buttons">
                    <a href="https://practicum.yandex.ru/web/" className="footer__bot_buttons-child">Яндекс.Практикум</a>
                    <a href="https://github.com/stown100" className="footer__bot_buttons-child">Github</a>
                    <a href="https://www.instagram.com/borodulin_developer/" className="footer__bot_buttons-child">Instagtam</a>
                    <p className="footer__bot-date">&copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;