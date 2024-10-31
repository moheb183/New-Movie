import React from 'react';
import "../Css/Background.css";
import videoSrc from '../Assets/Money Netflix.mp4';
import { FaStar, FaImdb, FaPlay, FaDownload } from 'react-icons/fa';
import { Row, Col, Container } from 'react-bootstrap';

export default function Background() {
    return (

        <div className="video-container">
            <video autoPlay loop muted>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <Container  className="video-container ">
                <Row >
                    <Col xl={12} >
                        <div className="content   text-overlay">
                            <div className="con  my-2 lol  text-capitalize">
                                <Row className="lol">
                                    <Col xl={7} className="lol">
                                        <div className="  mx-2  lol">
                                            <div className="m-2  lol">
                                                <h2 className='lol'>La Casa De Papel</h2>
                                                <p className='lol'>
                                                    Money Heist Spanish: La casa de papel, la casa de papel,lit.
                                                    'The House of Paper' is a Spanish heist crime drama television
                                                    series created by Álex Pina. The series traces two long-prepared
                                                    heists led by the Professor.
                                                </p>
                                            </div>
                                            <div className=" d-flex  flex-column m-2 justify-content-start  align-items-start p-2 lol ">
                                                <p className="company-name lol">A Netflix Original Series</p>
                                                <p className="category lol">Action | Drama</p>
                                                <p className='year lol'>2020</p>
                                                <div className='lol'>
                                                    <FaImdb color="gold" size="20px" className='lol' />
                                                   <div className='lol d-inline-block mx-1'>
                                                   <FaStar size="10px" className="lol" />
                                                   <span className="rating lol">9.5</span>
                                                   </div>
                                                </div>
                                            </div>
                                            <div className=' lol my-2'>
                                                <button className=' watch btn btn-success  lol mx-2'>
                                                    Watch <FaPlay aria-hidden="true" color="green" className=" lol" />
                                                </button>
                                                <button className='btn btn-success  lol'>
                                                    Download <FaDownload aria-hidden="true" color="green" className=' lol' />
                                                </button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
