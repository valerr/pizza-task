// @ts-check

import _ from 'lodash';

const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {

  const state = {
    pizzas: [
      { id: getNextId(), name: 'Cheese', price: '7$', imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg' },
      { id: getNextId(), name: 'Pepperoni', price: '8$', imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg' },
      { id: getNextId(), name: 'Alfredo', price: '8$', imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg'},
      { id: getNextId(), name: 'Texas', price: '9$', imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg'},
      { id: getNextId(), name: 'Spicy', price: '8$', imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg'},
      { id: getNextId(), name: 'Vegetarian', price: '8$', imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg'},
      { id: getNextId(), name: 'Pineapple', price: '8$', imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg'},
      { id: getNextId(), name: 'Margherita', price: '6$', imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg'},
    ],
    orders: [],
  };

  if (defaultState.pizzas) {
    state.pizzas.push(...defaultState.pizzas);
  }
  if (defaultState.orders) {
    state.orders.push(...defaultState.orders);
  }

  return state;
};

export default (app, io, defaultState = {}) => {
  const state = buildState(defaultState);

  app
    .get('/', (_req, reply) => {
      reply.view('index.pug', { gon: state });
    })
    .get('/api/v1/pizzas', (_req, reply) => {
      const resources = state.pizzas.map((c) => ({
        type: 'pizzas',
        id: c.id,
        attributes: c,
      }));
      const response = {
        data: resources,
      };
      reply.send(response);
    })
    .post('/api/v1/orders', (req, reply) => {
      const { data: { attributes: { adress, items } } } = req.body;
      const orderData = {
        adress,
        id: getNextId(),
        items,
      };
      state.orders.push(orderData);
      reply.code(201);
      const data = {
        data: {
          type: 'orders',
          id: order.id,
          attributes: orderData,
        },
      };

      reply.send(data);
      io.emit('newOrder', data);
    })
};
