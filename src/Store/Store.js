import { configureStore } from "@reduxjs/toolkit";
import AllMoviesAndSeries from "../Store/Slice/AllMovesAndSeries";

export default configureStore({
  reducer: {
    AllMoviesAndSeries,
  },
});
