import React from 'react';
import SearchForm from './SearchForm';
import NavBar from './NavBar';

const Header = ({search, history}) => (
    <header className="App-header">
        <h1>React Photo Gallery</h1>
        <SearchForm search={search} history={history}/>
        <NavBar />
    </header>
)

export default Header;