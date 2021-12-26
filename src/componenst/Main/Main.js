import React from 'react';
import Footer from '../Footer/Footer';
import HeaderMain from '../HeaderMain/HeaderMain';
import Logo from '../../images/weblogo.svg';
import Avatar from '../../images/avatar.jpg';
import Pointer from '../../images/pointer.svg';

function Main() {
    return (
        <>
            <HeaderMain />
            <div className="main">
                <div className="promo">
                    <img className="promo__logo" src={Logo} alt="web-logo"></img>
                    <h1 className="promo__title">
                        Учебный проект студента факультета
                        <br />
                        Веб-разработки.
                    </h1>
                    <p className="promo__text">
                        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                    </p>
                    <button className="promo__button">
                        <a href="https://practicum.yandex.ru/web/" className="promo__button_link">Узнать больше</a>
                    </button>
                </div>

                <div className="about-project">
                    <h4 className="about-project__title">О проекте</h4>
                    <hr className="about-project__hr" />
                    <div className="about-project__text-block">
                        <h5 className="about-project__text-block_subtitle">Дипломный проект влючил 5 этапов</h5>
                        <p className="about-project__text-block_text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                        <h5 className="about-project__text-block_subtitle">На выполнение диплома ушло 5 недель</h5>
                        <p className="about-project__text-block_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                    <div className="about-project__front-back">
                        <div className="about-project__front-back_back">1 неделя</div>
                        <div className="about-project__front-back_front">4 недели</div>
                    </div>
                    <div className="about-project__figcaption">
                        <p className="about-project__figcaption_text1">Back-end</p>
                        <p className="about-project__figcaption_text2">Front-end</p>
                    </div>
                </div>

                <div className="techs">
                    <h4 className="techs__title about-project__title">Технологии</h4>
                    <hr className="techs__hr about-project__hr" />
                    <h3 className="techs__subtitle">7 технологий</h3>
                    <p className="techs__text">На курсе веб-разработки я освоил технологии, которые применил в дипломном проекте.</p>
                    <div className="techs__blocks">
                        <div className="techs__blocks_technology">HTML</div>
                        <div className="techs__blocks_technology">CSS</div>
                        <div className="techs__blocks_technology">JS</div>
                        <div className="techs__blocks_technology">React</div>
                        <div className="techs__blocks_technology">Git</div>
                        <div className="techs__blocks_technology">Express.js</div>
                        <div className="techs__blocks_technology">mongoDB</div>
                    </div>
                </div>

                <div className="about-me">
                    <h4 className="about-me__title about-project__title">Студент</h4>
                    <hr className="about-me__hr about-project__hr" />
                    <div className="about-me__me">
                        <img className="about-me__me_avatar" src={Avatar} alt="Foto" />
                        <h3 className="about-me__me_name">Сергей</h3>
                        <h5 className="about-me__me_title">Фронтенд-разработчик, 26 лет</h5>
                        <p className="about-me__me_text">
                            Хочу развиваться в IT сфере, в частности, в web-разработке. Нравится работать в команде.
                            Хочется делать полезные, удобные и простые в использовании сервисы. Мне нравится web-разработка.
                            Помимо курсов я смотрю обучающие видео, читаю документацию и практикуюсь при помощи решения задач по JS.
                            До этого долго работал в сфере активных продаж. Легко нахожу общий язык с людьми.
                            Не люблю опаздывать на работу, так как уважительно отношусь к своим коллегам.
                            Дополнительно: в свободное время катаюсь на велосипеде, занимаюсь в зале, люблю читать, играть в пинг-понг и волейбол.
                        </p>
                        <div className="about-me__me_links">
                            <a href="https://www.instagram.com/borodulin_developer/" className="about-me__me_links1 about-me__me_links-inst">Instagram</a>
                            <a href="https://github.com/stown100" className="about-me__me_links1 about-me__me_links-git">Github</a>
                        </div>
                    </div>
                </div>

                <div className="portfolio">
                    <h6 className="portfolio__title">Портфолио</h6>
                    <div className="portfolio__block">
                        <a href="https://github.com/stown100/how-to-learn" className="portfolio__block_link">
                            Статичный сайт
                            <img className="portfolio__block_link-pointer" src={Pointer} alt="pointer"></img>
                        </a>
                        <a href="https://stown100.github.io/Russian-travel/" className="portfolio__block_link">
                            Адаптивный сайт
                            <img className="portfolio__block_link-pointer" src={Pointer} alt="pointer"></img>
                        </a>
                        <a href="https://github.com/stown100/react-mesto-api-full" className="portfolio__block_link">
                            Одностраничное приложение
                            <img className="portfolio__block_link-pointer" src={Pointer} alt="pointer"></img>
                        </a>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Main;