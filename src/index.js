import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store, {history} from './store/store';
import routes from './routes/routes';

require('core-js/fn/object/values')
require('core-js/fn/object/entries')

import './styles/reset.css';
import './styles/main.css';
import './styles/top25.css';
import './styles/footer.css';
import './styles/singlePage.css';
import './styles/animation.css';
import './styles/aboutPage.css';
import './styles/addWidgetModal.css';
import './styles/categoryPage.css';
import './styles/modals.css';
import './styles/header.css';
import './styles/editInfo.css';
import './styles/allProducts.css';

render(
  
  <Provider store={store}>
    <MuiThemeProvider>
      <Router
        history={history}
        routes={routes}
        onUpdate={() => window.scrollTo(0, 0)}/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
