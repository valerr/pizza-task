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

  const renderMenuItem = (type) => (
    <li className={cn('nav-item row', { 'bg-active': currentMenuSection === type })}>
      <div className="col-8 text-left">
        <button
          onClick={switchMenu(type)}
          className="nav-link btn-block btn text-left"
          type="button"
        >
          <div className="col-10 menu">{type}</div>
        </button>
      </div>
    </li>
  );

  return (
    <>
      <ul className="nav flex-column nav-pills nav-fill w-100">
        <h5>Menu</h5>
        {renderMenuItem('pizzas')}
        {renderMenuItem('drinks')}
      </ul>
    </>
  );
};

export default Menu;
