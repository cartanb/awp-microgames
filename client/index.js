import '../public/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux';
import jumpDemo from '../games/jump-demo/src/main';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <span>hello world!</span>
    </div>
  </Provider>,
  document.getElementById('app')
);

export default jumpDemo;
