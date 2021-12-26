import React from 'react';
import Close from '../../images/closeicon.svg'

const Burger = () => {
    const [toggle, setToggle] = React.useState(false);
    const [closes, setCloses] = React.useState(false);
    return (
        <>
            <div className="burger" onClick={() => {
                setToggle(true)
                setCloses(false)
                }}>
                {/* <span className={`span  ${toggle && "span_hidden"} ${closes && "span_hidden"}`}></span> */}
                <span className={toggle ? 'span_hidden' : 'span'}></span>
            </div>
            <div className={`burger__block ${closes && "burger__block_hidden"} ${toggle && "burger__block_visible"}`}>
                <img className="burger__close" src={Close} alt="close" onClick={() => {
                    setCloses(true)
                    setToggle(false)
                    }}>
                    </img>
                <div className="burger__block_text">
                    <button className="burger__block_text-text" href="">Главная</button>
                    {/* <button className="header__black_main"><Link to="films" className="register__button_link">Фильмы</Link></button> */}
                    <button className="burger__block_text-text" href="">Фильмы</button>
                    {/* <button className="header__black_films"><Link to="films" className="register__button_link">Фильмы</Link></button> */}
                    <button className="burger__block_text-text">Сохранённые фильмы</button>
                    {/* <button className="header__black_save-films"><Link to="films" className="register__button_link">Сохранённые фильмы</Link></button> */}
                </div>
                <button className="burger__block_button-account header__black_account">Аккаунт</button>
                {/* <button className="header__black_account"><Link to="films" className="register__button_link">Аккаунт</Link></button> */}
            </div>
        </>
    )
}
export default Burger;