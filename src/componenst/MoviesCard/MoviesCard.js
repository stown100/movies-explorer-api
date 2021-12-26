import React from 'react';
const MoviesCard = (data) => {
    const [onButton, setOnButton] = React.useState(false);
    return (
        <article className="movies-card__elem">
            <img className="movies-card__elem_img" alt={data.alt} src={data.link} />
            <div className="movies-card__elem_title">
                <h6 className="movies-card__elem_title-text">{data.name}</h6>
                <button className={`movies-card__elem_title-button  ${onButton ? "movies-card__elem_title-button-on" : "movies-card__elem_title-button"}`} onClick={() => setOnButton(!onButton)}>
                </button>
            </div>
            <p className="movies-card__elem_time">{data.time}</p>
        </article>
    )
}

export default MoviesCard;