import { createReducer } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import * as actions from '../actions';

const reducer = createReducer({}, {
  [actions.fetchData]: (state, action) => {
    const { pizzas, orders } = action.payload;
    return {
      ...state,
      pizzas,
      orders,
      cart: [],
    };
  },
});

export default reducer;
