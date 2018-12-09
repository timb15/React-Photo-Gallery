import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PhotoList from './components/PhotoList';
import apiKey from './config';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Header from './components/Header';


const api = apiKey;

class App extends Component {

  state = {
    photos: [],
    catPhotos: [],
    dogPhotos: [],
    monkeyPhotos:[],
    searchTitle: '',
    loading: false
  }

  //fetching the data for the nav links and saving it to state.
  componentDidMount() {

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => this.setState({
        catPhotos: response.data.photos.photo
      }))
      .catch(err => console.log("Error fetching data", err));

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      .then(response => this.setState({
        dogPhotos: response.data.photos.photo
      }))
      .catch(err => console.log("Error fetching data", err));

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=monkeys&per_page=24&format=json&nojsoncallback=1`)
      .then(response => this.setState({
        monkeyPhotos: response.data.photos.photo
      }))
      .catch(err => console.log("Error fetching data", err));
  }

  //function to fetch data when a user submits a value in the searchform
  handleSearch = (query) => {
    this.resetLoading();
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => this.setState({
        photos: response.data.photos.photo,
        searchTitle: query,
        loading: false
      }))
      .catch(err => console.log("Error fetching data", err));
  }

  //Function to reset the loading state to true
  resetLoading() {
    this.setState({loading: true});
  }
  //dynamically rendering the page depending on the route selected.
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path='/' render={(history) => <Header search={this.handleSearch} history={history}/>} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/cats' render={() => <PhotoList pics={this.state.catPhotos} title='Cats'/>} />
            <Route exact path='/dogs' render={() => <PhotoList pics={this.state.dogPhotos} title='Dogs'/>} />
            <Route exact path='/monkeys' render={() => <PhotoList pics={this.state.monkeyPhotos} title='Monkeys' />} />

            {/*Sets the image gallery to display a loading text until the images are fetched. */}
            {
              (this.state.loading)
              ? <h2>Loading...</h2>
        
              : <Route exact path='/searchresults' render={() => <PhotoList pics={this.state.photos} title={`Search results for '${this.state.searchTitle}'`}/>}/>
            }
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
