import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import TopNavBar from './TopNavBar';
import App from './App';
import { fetchMovies } from '../actions/MovieActions';

class MoviePage extends React.Component {

  constructor(props) {
    super(props);
    this.currentMovie = {};
    if (!this.props.clickedMovie) {
      this.location = this.props.history.location;
      this.title = location.hash.split('#/')[1].split('-moviePage')[0];
    }
  }

  componentDidMount() {
    if (!this.props.clickedMovie) {
      this.props.fetchMovies();
    }
  }

  render() {
    let currentMovie
    if (this.props.clickedMovie || this.currentMovie.length > 0) {
      currentMovie = this.props.clickedMovie || this.currentMovie;
    } else {
      _.find(this.props.allMovies, {title: this.title});
      _.forEach(this.props.allMovies, (movie) => {
        const title = movie.title.split(" ").join("-").toLowerCase();
        if (title === this.title) {
          this.currentMovie = movie;
          currentMovie = movie;
        }
      });
    }
    if (currentMovie) {
      return(
          <div>
          <div className = "bar"><TopNavBar history = {this.props.history}/></div>
            <div className = 'movie-table'>
              <div className = 'movie-big'>
                <img src = {`${this.props.baseBackDropUrl}${currentMovie.backdrop_path}`} className = 'movie-img-big-container'/>
              </div>
              <div className = 'movie-details'>
                <div className = 'title-header'>
                  <h1>{currentMovie.title}</h1>
                </div>
                <div className = 'table-content'>
                <div className = 'topic-header'>
                  <h2>IMDB Rating: {currentMovie.vote_average}</h2>
                </div>
                <div className = 'topic-header'>
                  <h2>Language: English</h2>
                </div>
                <div className = 'topic-header'>
                  <h2>Date of Release: {currentMovie.release_date}</h2>
                </div>
                <div className = 'topic-header'>
                  <h2>Is it an adult movie ? No</h2>
                </div>
                <div className = 'topic-header'>
                  <h2>Status: Completed</h2>
                </div>
                <div className = 'topic-header'>
                  <h2>Genres: Action, Adventure, Sci-Fi</h2>
                </div>
                </div>
              </div>
            </div>
            <div className = 'movie-details'>
              <div className = 'overview-container'>
                <h1 className = 'title-header'>Overview</h1>
                <p className = 'overview-content'>{currentMovie.overview}</p>
              </div>
            </div>
          </div>
      )
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => {
  if (state && (state.movies.clickedMovie || state.movies.allMovies)) {
    return state.movies;
  } else {
    return {}
  }
}
export default connect(mapStateToProps, { fetchMovies })(MoviePage);
