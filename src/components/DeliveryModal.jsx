/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createOrder } from '../actions';
import Context from '../Context';

const DeliveryModal = ({ hideModal, goods }) => {
  const dispatch = useDispatch();
  const userId = useContext(Context);
  const date = Date(Date.now()).toString();

  const handleSubmit = async (values) => {
    dispatch(createOrder(`${values.firstName}${values.lastName}`, values.address, goods, userId, date));
  };


  const f = useFormik({ onSubmit: handleSubmit, initialValues: { firstName: '', lastName: '', address: '' } });

  return (
    <form className="m-3" onSubmit={f.handleSubmit}>
      <h5 className="d-inline">Delivery</h5>
      <button type="button" onClick={hideModal} className="close">x</button>
      <div className="form-row mt-3">
        <div className="form-group col-md-6">
          <label htmlFor="inputFirstName">First name</label>
          <input onChange={f.handleChange} name="firstName" value={f.values.firstName} type="text" className="form-control" id="inputFirstName" />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputLastName">Last name</label>
          <input onChange={f.handleChange} name="lastName" value={f.values.lastName} type="text" className="form-control" id="inputLastName" />
        </div>
        <div className="form-group ml-1">
          <label htmlFor="inputAddress">Address</label>
          <input onChange={f.handleChange} name="address" type="text" value={f.values.address} className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary m-3">Proceed to payment</button>
    </form>
  );
};

export default DeliveryModal;
