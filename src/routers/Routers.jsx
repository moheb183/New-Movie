import React, { Suspense } from 'react';

import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
// import Movies from "../Components/Movies"
// import Series from "../Components/Series"
import Anime from "../Components/Anime"
import NotFound from "../Components/NotFound";
import MoviesDetails from "../Components/MoviesDetails"

const LazyMovies = React.lazy(() => import("../Components/Movies"))
const LazySeries = React.lazy(() => import("../Components/Series"))

export default function RoutersPage() {

    return (
        <Suspense >
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/Movies" element={< LazyMovies />} />
                <Route path="/Series" element={< LazySeries />} />
                <Route path="/Anime" element={< Anime />} />
                <Route path="/MoviesDetails" element={<MoviesDetails />} />
                <Route path="*" element={<NotFound />} />



            </Routes>

        </Suspense>

    )
}