import React from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { itemsSum } from './OpenCart';
import i18next from '../locales/translate';

const OrderHistory = ({ hideModal }) => {
  const userOrders = useSelector((state) => state.userOrders);

  const currency = useSelector((state) => state.currentCurrency);
  const symbol = currency === 'dollars' ? '$' : '€';

  const orders = (elem) => {
    const list = elem.items.map((i) => `${i18next.t(`name.${i.item.textId}`)} ${i.item.type} x${i.quantity}`);
    return list.join(', ');
  };

  const renderHistory = () => (
    userOrders.map((elem) => (
      <dl key={uniqueId()} className="row mt-3">
        <dt className="col-sm-3">Date</dt>
        <dd className="col-sm-9">{elem.date}</dd>
        <dt className="col-sm-3">Address</dt>
        <dd className="col-sm-9">{elem.address}</dd>
        <dt className="col-sm-3">Goods</dt>
        <dd className="col-sm-9">{orders(elem)}</dd>
        <dt className="col-sm-3">Total sum</dt>
        <dd className="col-sm-9">{`${itemsSum(currency, elem.items)}${symbol}`}</dd>
      </dl>
    ))
  );

  return (
    <div className="modal d-block text-left">
      <section className="modal-history">
        <div className="m-3">
          <h4 className="d-inline"> History </h4>
          <button type="button" onClick={hideModal} className="close">x</button>
          {userOrders.length > 0 ? renderHistory() : <p className="text-center mt-5 text-secondary">Nothing here yet!</p>}
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
