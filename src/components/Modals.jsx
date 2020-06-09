import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OpenCart } from './OpenCart';
import OrderHistory from './OrderHistory';
import Context from '../Context';
import { getOrderHistory } from '../actions';
import Delivery from './Delivery';

const Modals = () => {
  const goods = useSelector((state) => state.cart);
  const goodsCount = goods.reduce((acc, elem) => acc + elem.quantity, 0);

  const dispatch = useDispatch();
  const userId = useContext(Context);

  const [modal, setModal] = useState({ type: null });
  const showModal = (type) => setModal({ type });
  const hideModal = () => setModal({ type: null });

  const renderModal = () => {
    switch (modal.type) {
      case 'openCart':
        return (
          <OpenCart showModal={showModal} hideModal={hideModal} goods={goods} />
        );
      case 'history':
        return (
          <OrderHistory hideModal={hideModal} />
        );
      case 'delivery':
        return (
          <Delivery goods={goods} hideModal={hideModal} />
        );
      default:
        return null;
    }
  };

  const getHistory = () => {
    showModal('history');
    dispatch(getOrderHistory({ userId }));
  };

  return (
    <>
      <button onClick={() => getHistory()} type="button" className="btn btn-warning">My orders</button>
      <button type="button" onClick={() => showModal('openCart')} className="btn btn-light">
        <img src="https://img.icons8.com/metro/26/000000/shopping-cart.png" alt="cart" />
        <span className="badge badge-secondary">{goodsCount}</span>
      </button>
      {renderModal()}
    </>
  );
};

export default Modals;
