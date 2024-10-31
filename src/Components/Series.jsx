import React from 'react';
import { FaStar, } from 'react-icons/fa';
import { Row, Col, Container, } from 'react-bootstrap';
import "../Css/series.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubData } from "../Store/Slice/AllMovesAndSeries"
import { useLanguage } from '../Context/LanguageContext'







export default function Series() {

    const disPatch = useDispatch()
    const [Series, setSeries] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1);
    const [TotalPages, setTotalPages] = useState(0);

    const navigate = useNavigate()
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

    const { Lang } = useLanguage()


    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/tv/popular', {
            params: {
                include_adult: 'true',
                language: Lang,
                page: CurrentPage,
                api_key: "3dce90e1fc19fa2006881d2790e9f103"
            },

            headers: {

                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGNlOTBlMWZjMTlmYTIwMDY4ODFkMjc5MGU5ZjEwMyIsIm5iZiI6MTcyOTY4Njk5NS40ODE5NDIsInN1YiI6IjY3MThlOWQ5MjdiZDU3ZDkxZjYyMmE2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wXx5Tpji0y0R_MlHysbFha6HepHaKPEwWjxSsE-R7ew'

            }
        })



            .then(response => {
                setSeries(response.data.results)
                setTotalPages(response.data.total_pages)
                console.log(response.data.results)
                disPatch(SubData(response.data.results))


            })

            .catch(error => {
                console.log("error fetching data", error);

            })

    }, [CurrentPage, Lang, disPatch])


    const HandleNextPage = () => {
        if (CurrentPage < TotalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const HandlePreviousPage = () => {
        if (CurrentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }


    const goToDetails = (show) => {
        navigate("/MoviesDetails", { state: { content: show, type: "series" } })

    }




    return (

        <main>

            <Container>
                <div className='text-white'>
                    <h1>Tv Shows</h1>
                </div>
                <hr className="w-73 text-white" />
                <Row className="">
                    {Series.map(show => (
                        <Col xl={3} lg={4} md={6} sm={12} className="mb-4">
                            <div className="movie-card border border-white shadow-sm">
                                <div className=' movie  position-relative'>
                                    <img
                                        src={`${imgBaseUrl}${show.poster_path}`}

                                        alt="movie-img"
                                        className="img-fluid movie-img "
                                        loading="lazy"   // lazy loading
                                    />
                                </div>
                                <div className="movie-background " onClick={() => { goToDetails(show) }}>
                                    <div className="rating  lol">
                                        <FaStar color="#f39c12" size="15px" /><span className=" lol">{show.vote_average.toFixed(1)}</span>
                                    </div>
                                    <div className="classification lol">
                                        <p>Action</p>
                                        <p>Drama</p>
                                    </div>
                                    <hr className='line-through  w-75  text-white ' />
                                    <h5 className='lol '>{show.original_name}</h5>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <button className=" btn btn-dark" onClick={HandlePreviousPage} disabled={CurrentPage === 1} >Previous</button>
                        </li>
                        <li className="page-item disabled">
                            <span className='page-link'>{`Page ${CurrentPage} of ${TotalPages}`}</span>
                        </li>

                        <li className="page-item">
                            <button className="btn btn-dark" onClick={HandleNextPage} disabled={CurrentPage === TotalPages} >Next</button>
                        </li>
                    </ul>
                </nav>

            </Container>
        </main >

    )
}


