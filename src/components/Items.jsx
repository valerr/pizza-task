import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './Cart';
import { addToCart } from '../actions';

export const Items = () => {
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const menu = useSelector((state) => state.pizzas);
  return (
    <>
      <Cart />
      <div className="d-flex flex-wrap">
        {menu.map((item) => (
          <div key={item.id} className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={item.imageLink} style={{ height: '18rem' }} />
            <div className="card-body">
              <h4 className="card-text">
                {item.name}
              </h4>
              <button type="button" onClick={() => addItemToCart(item)} className="btn btn-warning">
                +
                {item.price}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Items;
