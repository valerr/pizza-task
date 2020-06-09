/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../actions';
import Context from '../Context';

const Delivery = ({ hideModal, goods }) => {
  const dispatch = useDispatch();
  const userId = useContext(Context);
  const date = Date(Date.now()).toString();

  const [text, setText] = useState({
    touched: false,
    firstName: '',
    lastName: '',
    address: '',
  });

  const [touched, setTouched] = useState({ firstName: false, lastName: false, address: false });

  const handleChange = (type) => ({ target: { value } }) => {
    setText({ ...text, [type]: value });
    setTouched({ ...touched, [type]: true });
  };

  const handleSubmit = async () => {
    dispatch(createOrder(`${text.firstName}${text.lastName}`, text.address, goods, userId, date));
    hideModal();
  };

  const firstNameValid = !!text.firstName.trim();
  const lastNameValid = !!text.lastName.trim();
  const addressValid = !!text.address.trim();

  const isValid = firstNameValid && lastNameValid && addressValid;

  return (
    <div className="modal d-block text-left">
      <section className="modal-main">
        <div className="m-3">
          <form className="m-3" onSubmit={handleSubmit}>
            <h5 className="d-inline">Delivery</h5>
            <button type="button" onClick={hideModal} className="close">x</button>
            <div className="form-row mt-3">
              <div className="form-group col-md-6">
                <label htmlFor="inputFirstName">First name</label>
                <input onChange={handleChange('firstName')} name="firstName" type="text" className="form-control" id="inputFirstName" value={text.firstName} />
                {(touched.firstName && !firstNameValid) && <div id="feedback" className="d-block invalid-feedback">Please provide a valid first name</div>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputLastName">Last name</label>
                <input onChange={handleChange('lastName')} name="lastName" type="text" className="form-control" id="inputLastName" value={text.lastName} />
                {(touched.lastName && !lastNameValid) && <div id="feedback" className="d-block invalid-feedback">Please provide a valid last name</div>}
              </div>
              <div className="form-group ml-1">
                <label htmlFor="inputAddress">Address</label>
                <input onChange={handleChange('address')} name="address" type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={text.address} />
                {(touched.address && !addressValid) && <div id="feedback" className="d-block invalid-feedback">Please provide a valid address</div>}
              </div>
            </div>
            <button disabled={!isValid} type="submit" className="btn btn-primary m-3">Proceed to payment</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Delivery;
