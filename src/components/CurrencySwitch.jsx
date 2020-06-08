import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCurrency } from '../actions';

const CurrencySwitch = () => {
  const currency = useSelector((state) => state.currentCurrency);
  const dispatch = useDispatch();

  const changeCurrency = () => {
    dispatch(setCurrentCurrency());
  };

  return (
    <button onClick={() => changeCurrency()} type="button" className="btn btn-light">{currency === 'dollars' ? 'USD' : 'EUR'}</button>
  );
};

export default CurrencySwitch;
