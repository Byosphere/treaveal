import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from "./containers/app.jsx";

injectTapEventPlugin();

const store = configureStore();

render(
    <Provider store={store}>
            <App store={store} props />
    </Provider>,
    document.getElementById('app')
);