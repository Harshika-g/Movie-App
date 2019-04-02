import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateMovies, viewMovie, clearFilter, searchedMovies} from '../actions/MovieActions';
import _ from 'lodash';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      list: []
    }
    this.link = this.props.history.location.pathname;
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.clearField = this.clearField.bind(this);
    this.onLinkClickHandler = this.onLinkClickHandler.bind(this);
  }

  clearField(e) {
    e.preventDefault();
    this.setState({
      searchString: '',
      list: []
    });
    this.props.updateMovies(this.props.selectedMovies);
    this.props.searchedMovies(this.props.allMovies);
  }

  onClickHandler(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleChange(e);
      this.props.clearFilter();
    }
  }

  handleChange(e) {
    let currentString = (e.target.value).toLowerCase();
    this.setState({
      searchString: currentString
    });
    let list = [];
    if (currentString.length > 0) {
      _.forEach(this.props.allMovies, (obj, i) => {
        if ((obj.title).toLowerCase().indexOf(currentString) !== -1) {
          list.push(obj)
        }
      });
    } else {
        list = this.props.allMovies;
    }
    let filter = [];
    _.forEach(this.props.selectedMovies, (year) => {
      _.forEach(list, (rate) => {
        if(year.title === rate.title) {
          filter.push(rate);
        }
      })
    });
    this.props.updateMovies(filter);
    this.props.searchedMovies(list);
    this.setState({
      list: list
    });
  }
  onChangeHandler(e) {
    this.handleChange(e);
  }

  onLinkClickHandler(e) {
    const id = e.target.getAttribute('value');
    const movie = _.find(this.props.filteredMovies, { id: Number(id) });
    this.props.viewMovie(movie);
    let title = movie.title.split(" ").join("-").toLowerCase();
    this.props.history.push(`${title}-moviePage`);
  }

  render() {
    const visibility = (this.link === '/') ? 'visible':'hidden';
    let suggestions = [];
    if (this.state.list.length > 0) {
      _.forEach(this.state.list, (obj, i) => {
        suggestions.push(<div className = 'search-text-container' value = {obj.id} key = {i} onClick = {this.onLinkClickHandler}>{obj.title}</div>)
      });
    }
    return(
      <div style = {{visibility:visibility}}>
        <div>
          <input type="text" className = 'search-text-container' autoComplete="off" value = {this.state.searchString} placeholder="Search.." name="search" onChange = {this.onChangeHandler} onKeyPress = {this.onClickHandler}></input>
        </div>
        <button type="submit" className = 'search-close-container'><span className="fa fa-times-circle" onClick = {this.clearField}></span></button>
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

export default connect(mapStateToProps, { updateMovies, viewMovie, clearFilter, searchedMovies })(SearchBox);
