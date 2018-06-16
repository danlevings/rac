import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import './styles/app.css';

import TopBar from './components/TopBar';
import Footer from './components/Footer';

import store from './store'

// routes
import routes from './routes';

ReactDOM.render(
    
    <Provider store={store}>
        <BrowserRouter>
            <div className="rac">
            <TopBar />
            {routes}
            <Footer />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
registerServiceWorker();
