import React from 'react';
import Header from '../Header/Header';
import MyCards from '../MyCards/MyCards';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

const SavedMovies = () => {
    const [onButton, setOnButton] = React.useState(false);
    return (
        <div className="saved-movies">
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
                {MyCards
                    ? MyCards.map(( data ) =>
                        <MoviesCard name={data.name} link={data.link} alt={data.alt} time={data.time} key={data._id} />)
                    : <Preloader />
                }
            </div>
            <div className="even"></div>
            <Footer />
        </div>
    )
}

export default SavedMovies;