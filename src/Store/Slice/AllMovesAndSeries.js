// AllMoviesAndSeries.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
};

const AllMoviesAndSeries = createSlice({
  name: "AllMoviesAndSeries",
  initialState,
  reducers: {
    SubData: (state, action) => {
      state.all = state.all.concat(action.payload);
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { SubData, setSearchResults } = AllMoviesAndSeries.actions;
export default AllMoviesAndSeries.reducer;
