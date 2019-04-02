import { Fetch_Movies, View_Movie, Update_Movies, Search_Movie, Filter_Movie, Clear_Filter, Clear_Search }  from './types';

export const fetchMovies = () => (dispatch) => {
  fetch('https://api.themoviedb.org/4/list/1?page=1&api_key=bd0830ad7ef334b313907c035d767bd1')
    .then(response => response.json())
    .then(movies => dispatch({
      type: Fetch_Movies,
      payload: movies.results
    }));
}

export const viewMovie = (movie, searchByTitle = false) => (dispatch) => {
  dispatch({
    type: View_Movie,
    payload: movie,
    searchByTitle,
  })
}

export const updateMovies = (movies) => (dispatch) => {
  dispatch({
    type: Update_Movies,
    payload: movies,
  })
}

export const searchedMovies = (movies) => (dispatch) => {
  dispatch({
    type: Search_Movie,
    payload: movies,
  })
}

export const selectedMovies = (movies) => (dispatch) => {
  dispatch({
    type: Filter_Movie,
    payload: movies,
  })
}

export const clearFilter = (clearBool = true) => (dispatch) => {
  dispatch({
    type: Clear_Filter,
    payload: clearBool
  })
}

export const clearSearch = (clearBool = true) => (dispatch) => {
  dispatch({
    type: Clear_Search,
    payload: clearBool
  })
}
