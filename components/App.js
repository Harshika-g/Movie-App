import React from 'react';
import ReactDOM from 'react-dom';
import TopNavBar from './TopNavBar';
import MovieList from './MovieList';
import FilterBox from './FilterBox';

class App extends React.Component {
  render() {
    return(
      <div>
      <div className = "bar"><TopNavBar history = {this.props.history}/></div>
      <div className = 'filter-button'>
      <FilterBox/></div>
      <MovieList history = {this.props.history}/>
      </div>
    )
  }
}

export default App;
