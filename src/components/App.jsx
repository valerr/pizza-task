import React from 'react';
import Items from './Items';
import Menu from './Menu';

const App = () => (
  <div className="row h-100 pb-3">
    <div className="col-2 border-right">
      <div className="d-flex mb-2 mt-2">
        <Menu />
      </div>
    </div>
    <div className="col bg-white">
      <div className="d-flex flex-column">
        <Items />
      </div>
    </div>
  </div>
);

export default App;
