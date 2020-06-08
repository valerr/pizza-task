import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../actions';
import i18next from '../locales/translate';
import CurrencySwitch from './CurrencySwitch';

export const itemsSum = (currency, goods) => (
  goods.reduce((acc, elem) => acc + elem.item.price[currency] * elem.quantity, 0)
);

export const OpenCart = ({ showModal, hideModal, goods }) => {
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const curr = useSelector((state) => state.currentCurrency);

  const deliveryCost = 5;

  const symbol = curr === 'dollars' ? '$' : '€';

  return (
    <div className="modal d-block text-left">
      <section className="modal-main">
        <div className="m-3 pl-3">
          <h4 className="d-inline mr-5"> Cart </h4>
          <div className="ml-5 d-inline"><CurrencySwitch /></div>
          <button type="button" onClick={hideModal} className="close">x</button>
          {goods.length === 0 ? <p className="text-center text-secondary mr-1">Cart is empty</p> : goods.map((elem) => (
            <dl className="row mt-3" key={elem.item.id}>
              <dt className="col-sm-4 mt-2">{i18next.t(`name.${elem.item.textId}`)}</dt>
              <dd className="col-sm-2 mt-2">{`${elem.item.price[curr]}${symbol}`}</dd>
              <dd className="col-sm-2 mt-2">{elem.quantity > 1 && `x${elem.quantity}`}</dd>
              <dd className="col-sm-2 mt-2 font-weight-bold">{`=${elem.quantity * elem.item.price[curr]}${symbol}`}</dd>
              <button onClick={() => removeItem(elem.item.id)} type="button" className="btn bg-white btn-sm">&#10006;</button>
            </dl>
          ))}
          <hr />
          <dl className="row">
            <dt className="col-sm-4">Subtotal:</dt>
            <dd className="col-sm-1">{`${itemsSum(curr, goods)}${symbol}`}</dd>
            <dd className="col-sm-6" />
            <dt className="col-sm-4">+ delivery cost:</dt>
            <dd className="col-sm-1">{`${deliveryCost}${symbol}`}</dd>
            <dd className="col-sm-6" />
            <dt className="col-sm-4">Total:</dt>
            <dd className="col-sm-1 font-weight-bold">{`${deliveryCost + itemsSum(curr, goods)}${symbol}`}</dd>
            <dd className="col-sm-6 font-weight-bold" />
          </dl>
          <button type="button" disabled={goods.length === 0} className="btn btn-primary m-3" onClick={() => showModal('delivery')}>proceed</button>
        </div>
      </section>
    </div>
  );
};
