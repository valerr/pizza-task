import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OpenCart } from './OpenCart';
import OrderHistory from './OrderHistory';
import Context from '../Context';
import { getOrderHistory } from '../actions';

const Cart = () => {
  const goods = useSelector((state) => state.cart);
  const goodsCount = goods.reduce((acc, elem) => acc + elem.quantity, 0);
  const dispatch = useDispatch();
  const userId = useContext(Context);

  const [modal, setModal] = useState({ type: null });
  const showModal = (type) => setModal({ type });
  const hideModal = () => setModal({ type: null });

  const renderModal = () => {
    if (modal.type === null) return null;
    if (modal.type === 'open') {
      return (
        <OpenCart hideModal={hideModal} goods={goods} />
      );
    } return (
      <OrderHistory hideModal={hideModal} />
    );
  };

  const getHistory = () => {
    showModal('history');
    dispatch(getOrderHistory({ userId }));
  };

  return (
    <div className="d-block text-right mt-1">
      <button onClick={() => getHistory()} type="button" className="btn btn-warning">My orders</button>
      <button type="button" onClick={() => showModal('open')} className="btn btn-light">
        <img src="https://img.icons8.com/metro/26/000000/shopping-cart.png" alt="cart" />
        <span className="badge badge-secondary">{goodsCount}</span>
      </button>
      {renderModal()}
    </div>
  );
};

export default Cart;
