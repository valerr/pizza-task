import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

export const Items = () => {

  const menu = useSelector((state) => state.pizzas)
  return (
    <div className="d-flex flex-wrap">
      {menu.map((item) => (
        <div key={item.id} className="card"  style={{width: '18rem'}}>
          <img className="card-img-top" src={item.imageLink} style={{height: '18rem'}}/>
            <div className="card-body">
              <h4 className="card-text">{item.name}</h4>
              <button onClick={() => addToCart(item)} className="btn btn-primary">+ {item.price}</button>
            </div>
        </div>
      ))}
      </div>
    )
};

export default Items;