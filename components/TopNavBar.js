import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox';
import FilterBox from './FilterBox';

class TopNavBar extends React.Component {
  render() {
    return(
      <header className = 'pv-nav'>
        <div className = 'pv-nav-container'>
          <img src = "./images/marvel.png" className = 'pv-brand-logo'/>
        </div>
        <div className = 'pv-nav-primary-components'>
        <SearchBox history = {this.props.history}/>
        </div>
      </header>
    )
  }
}

export default TopNavBar;
