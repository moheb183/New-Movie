import { Container, Row, Col } from "react-bootstrap"
import { FaStar, } from 'react-icons/fa';
import "../Css/moviesdetails.css"
import { useLocation } from "react-router-dom";




export default function MoviesDetails() {

    const location = useLocation()
    const { content, type } = location.state
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <main className=" pb-3">
            <Container className=" ">

                <Row>
                    <Col xl={4} lg={5} md={6} sm={12} className="my-2">
                        <div className="movie-card-details border border-white shadow-sm">
                            <div className=' movie-con  position-relative '>
                                <img
                                    src={`${imgBaseUrl}${content.poster_path}`}
                                    alt="movie-img"
                                    className="img-fluid movie-img "
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </Col>

                    <Col xl={8} md={6} sm={12}>
                        <div className="parent-details  text-white  text-capitalize my-3">
                            <div className=" d-flex  align-items-center  my-2">
                                <h2 className="text-success  m-1">{type === "movie" ? content.title : content.original_name}</h2> <FaStar size={15} color="gold" />
                                <span>{content.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="d-flex mx-3">
                                <p className=" review text-warning">reviews by: ({content.vote_count})</p>
                            </div>
                            <hr className="" />
                            <div className="  overview m-2 ">
                                <span className="  text-success">Overview:</span>
                                <p className="">{content.overview}</p>
                            </div>
                            <hr className="" />


                            <div className=" genres m-2">
                                <p className="text-success me-2 d-inline-block" >Genres:</p>
                                <span>action|Drama</span>
                            </div>


                            <hr className="" />

                            <div className=" category-d m-2 ">
                                <p className="text-success  me-2 d-inline-block">category:</p>
                                <span >adults only</span>
                            </div>
                            <hr className="" />

                            <div className=' p-2  '>
                                <button className=' btn btn-success mx-2'>Watch Now</button>
                                <button className="btn btn-success">Download Links</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

