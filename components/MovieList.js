import React from 'react';
import ReactDOM from 'react-dom';
import DisplayMovie from './DisplayMovie';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/MovieActions';

class MovieList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return(
      <div>
      {this.props.allMovies &&
        <div className = 'main-container'>
          <DisplayMovie history = {this.props.history}/>
        </div>
      }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  if(state.movies.allMovies) {
    return state.movies;
  } else {
    return {}
  }
}

export default connect(mapStateToProps, { fetchMovies })(MovieList);
