import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from "./containers/app.jsx";
import T from 'i18n-react';
import { getNavigatorLanguage } from './utils/helpers';

T.setTexts(require(`./languages/${getNavigatorLanguage()}.json`));

injectTapEventPlugin();

const store = configureStore();

render(
    <Provider store={store}>
        <App store={store} props />
    </Provider>,
    document.getElementById('app')
);