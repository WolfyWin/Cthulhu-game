import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store'
import Game from "./components/Game";
import './assets/css/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Game />
  </Provider>
);
