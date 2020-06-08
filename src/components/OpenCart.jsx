import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../actions';
import i18next from '../locales/translate';

export const itemsSum = (currency, goods) => (currency === 'dollars'
  ? goods.reduce((acc, elem) => acc + elem.item.price.dollars * elem.quantity, 0)
  : goods.reduce((acc, elem) => acc + elem.item.price.euros * elem.quantity, 0));

export const OpenCart = ({ showModal, hideModal, goods }) => {
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const dollarsCost = itemsSum('dollars', goods);
  const eurosCost = itemsSum('euros', goods);

  const deliveryCost = 5;

  return (
    <div className="modal d-block text-left">
      <section className="modal-main">
        <div className="m-3">
          <h5 className="text-center d-inline"> Cart </h5>
          <button type="button" onClick={hideModal} className="close">x</button>
          {goods.length === 0 ? <p>Cart is empty</p> : goods.map((elem) => (
            <dl className="row mt-3" key={elem.item.id}>
              <dt className="col-sm-3 mt-2">{i18next.t(`name.${elem.item.textId}`)}</dt>
              <dd className="col-sm-1 mt-2">{`${elem.item.price.dollars}$`}</dd>
              <dd className="col-sm-2 mt-2">{`${elem.item.price.euros}€`}</dd>
              <dd className="col-sm-2 mt-2">{elem.quantity > 1 && `x${elem.quantity}`}</dd>
              <dd className="col-sm-2 mt-2 font-weight-bold">{`=${elem.quantity * elem.item.price.dollars}$`}</dd>
              <button onClick={() => removeItem(elem.item.id)} type="button" className="btn bg-white btn-sm">&#10006;</button>
            </dl>
          ))}
          <hr />
          <dl className="row">
            <dt className="col-sm-3">Subtotal:</dt>
            <dd className="col-sm-1">{`${dollarsCost}$`}</dd>
            <dd className="col-sm-6">{`${eurosCost}€`}</dd>
            <dt className="col-sm-3">+ delivery cost:</dt>
            <dd className="col-sm-1">{`${deliveryCost}$`}</dd>
            <dd className="col-sm-6">{`${deliveryCost}€`}</dd>
            <dt className="col-sm-3">Total:</dt>
            <dd className="col-sm-1 font-weight-bold">{`${deliveryCost + dollarsCost}$`}</dd>
            <dd className="col-sm-6 font-weight-bold">{`${deliveryCost + eurosCost}€`}</dd>
          </dl>
          <button type="button" disabled={goods.length === 0} className="btn btn-primary m-3" onClick={() => showModal('delivery')}>proceed</button>
        </div>
      </section>
    </div>
  );
};
