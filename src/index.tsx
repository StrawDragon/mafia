// polyfill for requestAnimationFrame
// http://fb.me/react-polyfills
import 'raf/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GameCard from './game_card';
import { Provider } from 'react-redux';
import store from './common/store';
import 'antd/dist/antd.css?global';
import './common/styles/global.css';

ReactDOM.render(
  <Provider store={store}>
    <GameCard />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
