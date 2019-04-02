import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateMovies, selectedMovies } from '../actions/MovieActions';
import _ from 'lodash';

class FilterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      ReleaseYear: [
        {
          year: '2012-2013',
          checked: true
        },
        {
          year: '2014-2015',
          checked: true
        },
        {
          year: '2016-2017',
          checked: true
        }],
      Rating: [
        {
          rating: '0-6',
          checked: false
        },
        {
          rating: '6-7',
          checked: false
        },
        {
          rating: '7-8',
          checked: false
        },
      ],
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  onClearFilter(e) {
    e.preventDefault();
    this.yearMovies = this.props.allMovies;
    this.ratingMovies = this.props.allMovies;
    let releaseMov = this.state.ReleaseYear;
    let ratingMov = this.state.Rating;
    _.forEach(releaseMov,(obj) => {
      obj.checked = true
    });
    _.forEach(ratingMov,(obj) => {
      obj.checked = false
    });
    this.setState({
      ReleaseYear: releaseMov,
      Rating: ratingMov
    });
    this.mapMovies();
  }

  mapMovies() {
    if (!this.yearMovies) {
      this.yearMovies = this.props.allMovies;
    }
    if (!this.ratingMovies || this.ratingMovies.length <=0) {
      this.ratingMovies = this.props.allMovies;
    }
    let movies = [];
    _.forEach(this.yearMovies, (year) => {
      _.forEach(this.ratingMovies, (rate) => {
        if(year.title === rate.title) {
          movies.push(rate);
        }
      })
    });
    let filter = [];
    _.forEach(this.props.searchedMovies, (year) => {
      _.forEach(movies, (rate) => {
        if(year.title === rate.title) {
          filter.push(rate);
        }
      })
    });
    this.props.selectedMovies(filter);
    this.props.updateMovies(filter);
  }

  onChangeHandler({ target }) {
    this.isSet = true;
    let Release = this.state.ReleaseYear;
    if (Release[target.name].checked) {
      Release[target.name].checked = false;
    } else {
      Release[target.name].checked = true;
    }
    this.setState({
      ReleaseYear: Release
    });
    let selectedYears = [];
    _.forEach(this.state.ReleaseYear, (obj) => {
      if (obj.checked) {
        selectedYears.push(obj.year.split('-')[0]);
        selectedYears.push(obj.year.split('-')[1]);
      }
    });
    let movies = [];
    if(selectedYears.length > 0) {
      _.forEach(selectedYears, (year) => {
        _.forEach(this.props.allMovies, (movie) => {
          let date = movie.release_date.split('-')[0];
            if (date == year) {
              movies.push(movie);
            }
        });
      });
    }
    this.yearMovies = movies;
    this.mapMovies();
  }

  ratingChangeHandler({ target }) {
    this.isSet = true;
    if (!this.movies || this.movies.length <=0) {
      this.movies = this.props.allMovies;
    }
    let rate = this.state.Rating;
    let currentRate = rate[target.name];
    _.forEach(rate, (obj, i) => {
      if (i !== Number(target.name)) {
        rate[i].checked = false;
      }
    });
    rate[target.name].checked = true;
    this.setState({
      Rating: rate
    });
    let selectedRating = [];
    if (currentRate.checked && currentRate.rating !== 'all') {
      selectedRating.push(currentRate.rating.split('-')[0]);
      selectedRating.push(currentRate.rating.split('-')[1]);
    }
    let movies = [];
    _.forEach(this.props.allMovies, (movie) => {
      let userrating = movie.vote_average;
      if (userrating >= selectedRating[0] && userrating <= selectedRating[1]) {
        movies.push(movie);
      }
    });
    this.ratingMovies = movies;
    this.mapMovies();
  }

  render() {
    let years = [];
    _.forEach(this.state.ReleaseYear, (obj, i) => {
      years.push(<form className = 'check-container' key = {`form${i}`}><label key = {`label${i}`}><input type="checkbox" checked = {obj.checked} name={i} value={i} key = {i} onChange = {this.onChangeHandler}></input>
      {obj.year}</label></form>)
    });
    let ratings = [];
    _.forEach(this.state.Rating, (obj, i) => {
      ratings.push(<form className = 'check-container' key = {`form${i}`}><label key = {`label${i}`}><input type="radio" checked = {obj.checked} name={i} value={i} key = {i} onChange = {this.ratingChangeHandler}></input>
      {obj.rating}</label></form>)
    })
    return(
      <div>
        <div className = 'year-container'>
          <h1>Release Years</h1>
          {years}
        </div>
        <div className = 'year-container'>
          <h1>Imdb Rating</h1>
          {ratings}
        </div>
        <div className = 'clear-filter-container'>
          <button type="submit" value = 'clear-filter' onClick = {this.onClearFilter}>Clear Filter</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.movies.allMovies) {
    return state.movies;
  } else {
    return {}
  }
}

export default connect(mapStateToProps, { updateMovies, selectedMovies })(FilterBox);
