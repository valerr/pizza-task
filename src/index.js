// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import gon from 'gon';
import init from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'delivery:*';
}

init(gon);
