import React from 'react';
import { FaStar, } from 'react-icons/fa';
import { Row, Col, Container, } from 'react-bootstrap';
import "../Css/Movies.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubData } from "../Store/Slice/AllMovesAndSeries"
import { useLanguage } from '../Context/LanguageContext'





export default function Movies() {

    const disPatch = useDispatch()

    const [Movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate()
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

    const { Lang } = useLanguage();






    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: 'dfc6382472dbd6b9e02e4d2b92a765f5',
                page: currentPage,
                language: Lang,

            },
            headers: {
                accept: 'application/json'
            }
        })
            .then(response => {
                console.log(response.data.results);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages)
                console.log(response.data.total_pages);

                disPatch(SubData(response.data.results))
            })





            .catch(error => {
                console.log("error fetching data ", error);
            });
    }, [currentPage, Lang, disPatch]);





    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    }


    const goToDetails = (movie) => {

        navigate("/MoviesDetails", { state: { content: movie, type: "movie" } })
    }


    return (

        <main>

            <Container>
                <div className='text-white'>
                    <h1>Popular</h1>
                </div>
                <hr className="w-73 text-white" />
                <Row className="">

                    {Movies.map(movie => (
                        <Col xl={3} lg={4} md={6} sm={12} className="mb-4">
                            <div className="movie-card border border-white shadow-sm">
                                <div className=' movie  position-relative'>
                                    <img
                                        src={`${imgBaseUrl}${movie.poster_path}`}
                                        alt="movie-img"
                                        className="img-fluid movie-img "
                                        loading="lazy"
                                    />
                                </div>
                                <div className="movie-background  " onClick={() => goToDetails(movie)}>
                                    <div className="rating  lol">
                                        <FaStar color="#f39c12" size="15px" /><span className=" lol">{movie.vote_average.toFixed(1)}</span>
                                    </div>
                                    <div className="classification lol">
                                        <p>Action</p>
                                        <p>Drama</p>
                                    </div>
                                    <hr className='line-through  w-75  text-white ' />
                                    <h5 className='lol '>{movie.title}</h5>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className=" btn  btn-dark" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                        </li>
                        <li className="page-item disabled">
                            <span className="page-link">Page {currentPage} of {totalPages}</span>
                        </li>
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className=" btn btn-dark" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                        </li>
                    </ul>
                </nav>

            </Container>


        </main>

    )
}


