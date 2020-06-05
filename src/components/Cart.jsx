import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { size } from 'lodash';
import OpenCart from './OpenCart';

const Cart = () => {
  const goods = useSelector((state) => state.cart);

  const renderModal = (modal, hideModal) => {
    if (modal.type === null) return null;
    return (
      <OpenCart hideModal={hideModal} goods={goods} />
    );
  };

  const [modal, setModal] = useState({ type: null });
  const showModal = (type) => setModal({ type });
  const hideModal = () => setModal({ type: null });

  return (
    <div className="d-block text-right mt-1">
      <button type="button" onClick={() => showModal('open')} className="btn btn-light">
        <img src="https://img.icons8.com/metro/26/000000/shopping-cart.png" alt="cart" />
        <span className="badge badge-secondary">{size(goods)}</span>
      </button>
      {renderModal(modal, hideModal)}
    </div>
  );
};

export default Cart;
