import React, { useState } from 'react';
import DeliveryModal from './DeliveryModal';
import i18next from '../locales/translate';

export const itemsSum = (currency, goods) => (currency === 'dollars'
  ? goods.reduce((acc, elem) => acc + elem.item.price.dollars * elem.quantity, 0)
  : goods.reduce((acc, elem) => acc + elem.item.price.euros * elem.quantity, 0));

export const OpenCart = ({ hideModal, goods }) => {
  const [modalType, setModalType] = useState('open');

  const handleSubmit = () => {
    setModalType('delivery');
  };

  const dollarsCost = itemsSum('dollars', goods);
  const eurosCost = itemsSum('euros', goods);

  const deliveryCost = 5;

  if (modalType === 'open') {
    return (
      <div className="modal d-block text-left">
        <section className="modal-main">
          <div className="m-3">
            <h5 className="text-center d-inline"> Cart </h5>
            <button type="button" onClick={hideModal} className="close">x</button>
            {goods.length === 0 ? <p>Cart is empty</p> : goods.map((elem) => (
              <dl className="row mt-3" key={elem.item.id}>
                <dt className="col-sm-3">{i18next.t(`name.${elem.item.textId}`)}</dt>
                <dd className="col-sm-1">{`${elem.item.price.dollars}$`}</dd>
                <dd className="col-sm-2">{`${elem.item.price.euros}€`}</dd>
                <dd className="col-sm-2">{elem.quantity > 1 && `x${elem.quantity}`}</dd>
                <dd className="col-sm-2">
                  <span className="font-weight-bold">{`=${elem.quantity * elem.item.price.dollars}$`}</span>
                </dd>
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
              <dd className="col-sm-1">{`${deliveryCost + dollarsCost}$`}</dd>
              <dd className="col-sm-6">{`${deliveryCost + eurosCost}€`}</dd>
            </dl>
            <button type="button" disabled={goods.length === 0} className="btn btn-primary m-3" onClick={handleSubmit}>proceed</button>
          </div>
        </section>
      </div>
    );
  } return (
    <div className="modal d-block text-left">
      <section className="modal-main">
        <DeliveryModal hideModal={hideModal} goods={goods} />
      </section>
    </div>
  );
};
