import React, { useState } from 'react';
import Items from './Items';

const App = () => {

  return (
    <div className="row h-100 pb-3">
      <div className="col-2 border-right">
        <div className="d-flex mb-2">
          <h5>Contacts</h5>
        </div>
      </div>
      <div className="col h-100 bg-white">
        <div className="d-flex flex-column h-100">
          <Items />
        </div>
      </div>
    </div>
  );
};

export default App;
