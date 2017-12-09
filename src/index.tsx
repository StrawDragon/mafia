// polyfill for requestAnimationFrame
// http://fb.me/react-polyfills
import 'raf/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GameCard from './game_card';
import 'antd/dist/antd.css';

ReactDOM.render(
  <GameCard />,
  document.getElementById('root') as HTMLElement
);
