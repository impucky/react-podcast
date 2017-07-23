import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './css/style.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Permanent Marker', 'sans-serif']
  }
});

render(<App/>, document.getElementById('main'));

