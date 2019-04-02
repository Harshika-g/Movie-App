import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router';
import { viewMovie } from '../actions/MovieActions';

class DisplayMovie extends React.Component {

  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e) {
    const id = e.target.getAttribute('value');
    const movie = _.find(this.props.filteredMovies, { id: Number(id) });
    this.props.viewMovie(movie);
    let title = movie.title.split(" ").join("-").toLowerCase();
    this.props.history.push(`${title}-moviePage`);
  }

  render() {
    if (this.props.filteredMovies) {
      this.items = this.props.filteredMovies.map((item, i) =>
        <div key = {i} value = {item.title} className = 'movie'><img className = 'table-movie' onClick = {this.onClickHandler} value = {item.id} key={item.id} src = {`${this.props.baseUrl}${item.poster_path}`}/></div>
      );
    }
    return(
      <div>
        {this.props.allMovies &&
          <div className = 'movies-container'>
          {this.items}
          </div>
        }
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

export default connect(mapStateToProps, { viewMovie })(DisplayMovie);
