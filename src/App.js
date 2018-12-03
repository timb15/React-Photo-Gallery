import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import NavBar from './components/NavBar';
import PhotoList from './components/PhotoList';
import apiKey from './config';
import Home from './components/Home';

const api = apiKey;

class App extends Component {

  state = {
    searchedPhotos: [],
    catPhotos: []
  }

  
  

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
    .then(response => this.setState({
      catPhotos: response.data.photos.photo
    }));
  }

  handleSearch = (query) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => this.setState({searchedPhotos: response.data.photos.photo}))
      .catch(err => console.log("Error fetching data", err));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <header className="App-header">
            <h1>React Photo Gallery</h1>
            <SearchForm search={this.handleSearch}/>
            <NavBar />
          </header>
          <Route exact path='/' component={Home} />
          <Route exact path='/cats' render={() => <PhotoList pics={this.state.catPhotos} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
