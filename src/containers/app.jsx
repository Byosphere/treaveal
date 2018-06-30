import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Home from './home/Home.jsx';

class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <HashRouter>
                <div id="root">
                    <Home />
                </div>
            </HashRouter>
        );
    }
}

export default App;