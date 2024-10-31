import React, { useEffect, useState } from 'react';
import "../Css/slider.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext';


const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';


export default function Slider() {
    const { Lang, setLang } = useLanguage()
    const navigate = useNavigate()
    const [movieSlider, setMovieSlider] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 6;

    useEffect(() => {
        axios
            .get('https://api.themoviedb.org/3/movie/upcoming', {
                params: {
                    language: Lang ,
                    page: '1',
                    api_key: 'dfc6382472dbd6b9e02e4d2b92a765f5'
                },
                headers: {
                    accept: 'application/json'
                }
            })
            .then(response => setMovieSlider(response.data.results))
            .catch(error => console.log("error fetching data", error));
    }, [Lang]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % movieSlider.length
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + movieSlider.length) % movieSlider.length
        );
    };



    const goToDetails = (oneMovie) => {
        navigate("/MoviesDetails", { state: { content: oneMovie, type: "moviesFromSlider" } })
    }



    return (
        <Container fluid className="slider-container">
            <h1 className="text-center slider-title">Upcoming Movies </h1>
            <Row className="slider-row">
                <Col xl={1} className="arrow-column">
                    <FaArrowLeft className="arrow-icon" onClick={handlePrev} />
                </Col>
                <Col xl={10}>
                    <div className="movie-slider-container">
                        <div
                            className="movie-slider-wrapper"
                        >
                            {[...movieSlider, ...movieSlider].slice(currentIndex, currentIndex + itemsToShow).map((oneMovie) => (
                                <div key={oneMovie.id} className="movie-card-slider">
                                    <div className="movie-image-wrapper" >
                                        <img
                                            src={`${imgBaseUrl}${oneMovie.poster_path}`}
                                            alt="movie-img-slider"
                                            className="movie-img-slider"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="movie-background-slider" onClick={() => goToDetails(oneMovie)}>
                                        <div className="rating-slider  lol ">
                                            <FaStar color="#f39c12" size="15px" className='lol' />
                                            <span className='lol'>{oneMovie.vote_average.toFixed(1)}</span>
                                        </div>
                                        <div className="classification lol">
                                            <p>Action</p>
                                            <p>Drama</p>
                                        </div>
                                        <h5 className='lol'>{oneMovie.original_title}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col xl={1} className="arrow-column">
                    <FaArrowRight className="arrow-icon" onClick={handleNext} />
                </Col>
            </Row>
        </Container>
    );
}
