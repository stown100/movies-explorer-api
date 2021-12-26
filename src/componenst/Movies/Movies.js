import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Preloader from '../Preloader/Preloader'

function Movies() {
    const [onButton, setOnButton] = React.useState(false);
    return (
        <div className="movies">
            <Header />
            <form className="search">
                <input className="search__input" placeholder="Фильм"></input>
            </form>
            <div className="filter-checkbox">
                <button className={`filter-checkbox__button_of ${onButton ? "filter-checkbox__button_on" : "filter-checkbox__button_of"}`} onClick={() => setOnButton(!onButton)}>
                </button>
                <p className="search__slider_text">Короткометражки</p>
            </div>
            <div className="movies-card">
                {MoviesCardList
                    ? MoviesCardList.map((data) =>
                        <MoviesCard name={data.name} link={data.link} alt={data.alt} time={data.time} key={data._id} />)
                    : <Preloader />}
            </div>
            <div className="even">
                <button className="even__button">Ещё</button>
            </div>
            <Footer />
        </div>
    )
}

export default Movies;