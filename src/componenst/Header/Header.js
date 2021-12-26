import { Route, useHistory, Link } from "react-router-dom";
import logo from '../../images/greenlogo.svg'
import Burger from '../Burger/Burger';

function Header() {
    return (
        <Route>
            <div className="header">
                <Link to="/" className="header__logo">
                    <img className="header__logo" src={logo} alt="logo"></img>
                </Link>
                <div className="header__film">
                    <button className="header__films"><Link to="movies" className="header__link">Фильмы</Link></button>
                    <button className="header__save-films"><Link to="saved-movies" className="header__link">Сохранённые фильмы</Link></button>
                    <button className="header__account"><Link to="profile" className="header__link">Аккаунт</Link></button>
                </div>
                <Burger />
            </div>
        </Route>
    )
}

export default Header;