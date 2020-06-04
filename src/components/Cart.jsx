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
      <button type="button" onClick={() => showModal('open')} className="btn btn-success">
        Cart:
        {size(goods)}
      </button>
      {renderModal(modal, hideModal)}
    </div>
  );
};

export default Cart;
