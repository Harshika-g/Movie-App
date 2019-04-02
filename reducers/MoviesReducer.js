import { Fetch_Movies, View_Movie, Update_Movies, Search_Movie, Filter_Movie, Clear_Filter, Clear_Search } from '../actions/types';

const getInitialState = {};

export default function(state = getInitialState, action) {
  switch (action.type) {
    case Fetch_Movies:
    let movieTitles = [];
      action.payload.forEach(function(_obj) {
        movieTitles.push(_obj.title);
      });
      return {
        ...state,
        allMovies: action.payload,
        baseBackDropUrl: 'http://image.tmdb.org/t/p/w780',
        filteredMovies: action.payload,
        searchedMovies: action.payload,
        selectedMovies: action.payload,
        movieTitles,
        baseUrl: 'http://image.tmdb.org/t/p/w185',
      }
      break;
    case View_Movie:
      return {
        ...state,
        baseBackDropUrl: 'http://image.tmdb.org/t/p/w780',
        clickBool: true,
        clickedMovie: action.payload ? action.payload: []
      }
      break;
    case Update_Movies:
      return {
        ...state,
        filteredMovies: action.payload,
      }
      break;
    case Search_Movie:
      return {
        ...state,
        searchedMovies: action.payload
      }
      break;
    case Filter_Movie:
      return {
        ...state,
        selectedMovies: action.payload
      }
      break;
    case Clear_Filter:
      return {
        ...state,
        shouldClearFilter: action.payload
      }
      break;
    case Clear_Search:
      return {
        ...state,
        shouldClearSearch: action.payload
      }
      break;
    default:
     return state;
      break;
  }
}
