import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentMenuSection } from '../actions';

const Menu = () => {
  const dispatch = useDispatch();

  const switchMenu = (type) => () => {
    dispatch(setCurrentMenuSection({ type }));
  };

  const currentMenuSection = useSelector((state) => state.currentMenuSection);

  return (
    <>

      <ul className="nav flex-column nav-pills nav-fill w-100">
        <h5>Menu</h5>
        <li className={cn('nav-item row', { 'bg-active': currentMenuSection === 'pizzas' })}>
          <div className="col-8 text-left">
            <button
              onClick={switchMenu('pizzas')}
              className="nav-link btn-block btn text-left"
              type="button"
            >
              <div className="col-10">Pizzas</div>
            </button>
          </div>
        </li>
        <li className={cn('nav-item row', { 'bg-active': currentMenuSection === 'drinks' })}>
          <div className="col-8 text-left">
            <button
              onClick={switchMenu('drinks')}
              className="nav-link btn-block btn text-left"
              type="button"
            >
              <div className="col-10">Drinks</div>
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Menu;
