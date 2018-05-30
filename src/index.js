import React from 'react';
import {render} from 'react-dom';
import configureStore from './configureStore';
import {Provider} from 'react-redux';
import App from './components/App';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import 'font-awesome/css/font-awesome.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './style/style.css';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
export default store;

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
