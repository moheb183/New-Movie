import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../Assets/video-editing-app (3).png"
import me from "../Assets/IMG-20200303-WA0061.jpg"
import "../Shared/Header.css"
import { Container, Row, Col, } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLanguage } from '../Context/LanguageContext';
import { useDispatch } from 'react-redux';
import { setSearchResults } from "../Store/Slice/AllMovesAndSeries";





export default function Header() {
    const navigate = useNavigate()

    const [SearchValue, setSearchValue] = useState("")
    const [SearchResult, setSearchResult] = useState([])
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';
    const dispatch = useDispatch();
    const allMoviesAndSeries = useSelector((state) => state.AllMoviesAndSeries.all);
    const { Lang, setLang } = useLanguage();

    const handleLanguageChange = (Lang) => {
        setLang((Lang));
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
        const value = e.target.value.trim().toLowerCase();
        const arr = allMoviesAndSeries.filter((oneItem) => {
            const titleMatch = oneItem.title && oneItem.title.toLowerCase().includes(value);
            const originalNameMatch = oneItem.original_name && oneItem.original_name.toLowerCase().includes(value);
            return titleMatch || originalNameMatch;
        });

        console.log(arr);
        setSearchResult(arr)

    }



    const goToDetails = (item) => {
        navigate("/MoviesDetails", { state: { content: item, type: "movieFromSearch" } })
    }




    return (

        <Container className="container my-2 py-3  ">

            <Row>
                <Col md={2} lg={2}>
                    <div className=" d-flex " style={{ cursor: 'pointer' }} >
                        <Link to={"/"} className=" list-unstyled text-decoration-none d-flex" >
                            <img src={Logo} alt="Logo" className="Logo m-1" />
                            <h5 className="  text-white fs-5">New Movie</h5>
                        </Link>
                    </div>
                </Col>

                <Col md={6} lg={6}>
                    <div className=" justify-content-start">
                        <ul className=" d-flex justify-content-around list-unstyled text-decoration-none" >
                            <li>
                                <NavLink to={"/"} className="nav-list" activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/Series"} className="nav-list">
                                    Series
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/Movies"} className="nav-list">
                                    Movies
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/Anime"} className="nav-list">
                                    Anime
                                </NavLink>
                            </li>
                        </ul>

                    </div>
                </Col>

                <Col md={4} lg={4}>

                    <div className=" search d-flex  justify-content-between position-relative" >
                        <div className=" d-flex flex-column   align-items-center">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="mx-1 search-input "
                                onChange={handleSearch}
                                value={SearchValue}

                            />

                            {SearchValue &&
                                <div className="border border-white  search-results ">

                                    {SearchResult.map((item) => (
                                        <div className=" search-result-item  rounded d-flex align-items-center lol text-white" onClick={() => goToDetails(item)}>

                                            <img src={`${imgBaseUrl}${item.poster_path}`} alt="lol" className=" img-fluid lol  border border-white w-25  rounded" />
                                            <div className="  lol w-100 ">
                                                <h5 className="lol fs-6">{item.original_name || item.title}</h5>
                                            </div>
                                        </div>

                                    ))

                                    }
                                </div>

                            }





                        </div>

                        {/* <div>
                            <i className=" border border-white ">
                                <img src={me} alt="my_photo" className="  img-fluid " />
                            </i>
                        </div> */}
                        <Dropdown className=" text-white mb-1">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="">
                                Language: {Lang.toUpperCase()}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="bg-transparent text-white  ">
                                <Dropdown.Item onClick={() => handleLanguageChange('en')} className="text-white">EN</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleLanguageChange('fr')} className="text-white">FR</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleLanguageChange('de')} className="text-white">DE</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </Col>
            </Row>
            <hr className=" text-white w-100" />
        </Container >

    )
}