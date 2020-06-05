import React, { useState } from 'react';
import DeliveryModal from './DeliveryModal';

const OpenCart = ({ hideModal, goods }) => {
  const [modalType, setModalType] = useState('open');

  const handleSubmit = () => {
    setModalType('delivery');
  };

  const itemsSum = goods.reduce((acc, item) => acc + Number(item.price), 0);

  const deliveryCost = 5;

  if (modalType === 'open') {
    return (
      <div className="modal d-block text-left">
        <section className="modal-main">
          <div className="m-3">
            <h5 className="text-center d-inline"> Cart </h5>
            <button type="button" onClick={hideModal} className="close">x</button>
            {goods.length === 0 ? <p>Cart is empty</p> : goods.map((i) => (
              <dl className="row mt-3" key={i.id}>
                <dt className="col-sm-3">{i.name}</dt>
                <dd className="col-sm-9">
                  {i.price}
                  $
                </dd>
              </dl>
            ))}
            <hr />
            <dl className="row">
              <dt className="col-sm-3">Subtotal:</dt>
              <dd className="col-sm-9">
                {itemsSum}
                $
              </dd>
              <dt className="col-sm-3">
                +
                delivery cost:
              </dt>
              <dd className="col-sm-9">
                {deliveryCost}
                $
              </dd>
              <dt className="col-sm-3">
                Total:
              </dt>
              <dd className="col-sm-9">
                {deliveryCost + itemsSum}
                $
              </dd>
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

export default OpenCart;
