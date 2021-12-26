import { Link } from "react-router-dom";
import Logo from "../../images/greenlogo.svg";


const Form = ({ children, title, onSubmit, text, link, to }) => {
    return (
        <div className="register">
            <div className="register__container">
                <form className="form" onSubmit={onSubmit} action="#">
                    <Link to="/" className="header__logo">
                        <img className="header__logo register__logo" src={Logo} alt="logo"></img>
                    </Link>
                    <h2 className="register__title">{title}</h2>
                    {children}
                    <p className="register__text">{text}<Link to={to} className="register__link">{link}</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Form;