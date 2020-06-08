import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modals from './Modals';
import { addToCart } from '../actions';
import i18next from '../locales/translate';

const Items = () => {
  const dispatch = useDispatch();

  const addItemToCart = (id) => {
    dispatch(addToCart(id));
  };

  const currentMenuSection = useSelector((state) => state.currentMenuSection);

  const menu = useSelector((state) => state.menu);

  const pizzas = menu.filter((i) => i.type === 'pizza');

  const drinks = menu.filter((i) => i.type === 'drink');

  const renderItems = (items) => (
    items.map((item) => (
      <div key={item.id} className="card m-1" style={{ width: '18rem', height: 'auto' }}>
        <img className="card-img-top" src={i18next.t(`imageUrl.${item.textId}`)} style={{ maxWidth: '18rem' }} alt="pizza" />
        <div className="card-body">
          <h4 className="card-title">{i18next.t(`name.${item.textId}`)}</h4>
          <p className="card-text" style={{ height: '110px' }}>{i18next.t(`description.${item.textId}`)}</p>
          <button type="button" onClick={() => addItemToCart(item.id)} className="btn btn-warning">
            +
            &nbsp;
            {item.price.dollars}
            $
            &nbsp;
            {item.price.euros}
            €
          </button>
        </div>
      </div>
    ))
  );

  return (
    <>
      <Modals />
      <div className="d-flex flex-wrap">
        {currentMenuSection === 'pizzas' ? renderItems(pizzas) : renderItems(drinks)}
      </div>
    </>
  );
};

export default Items;
