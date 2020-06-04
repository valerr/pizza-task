import React, { useState } from 'react';

const OpenCart = ({ hideModal, goods }) => {
  const [modalType, setModalType] = useState('open');

  const handleSubmit = () => {
    setModalType('delivery');
  };

  if (modalType === 'open') {
    return (
      <div className="modal d-block text-left">
        <section className="modal-main">
          <h3 className="text-center m-2"> Cart </h3>
          <ul className="list-group text-left">
            {goods.length === 0 ? <p>Cart is empty</p> : goods.map((i) => (
              <li className="list-group-item" key={i.id}>
                {i.name}
                {' '}
                {i.price}
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-primary m-3" onClick={hideModal}>close</button>
          <button type="button" className="btn btn-primary m-3" onClick={handleSubmit}>proceed</button>
        </section>
      </div>
    );
  } if (modalType === 'delivery') {
    return (
      <div className="modal d-block text-left">
        <section className="modal-main">
          <p>Ok!</p>
          <button type="button" className="btn btn-primary m-3" onClick={hideModal}>close</button>
        </section>
      </div>
    );
  }
};

export default OpenCart;
