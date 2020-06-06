// @ts-check

import _ from 'lodash';

const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
  const state = {
    pizzas: [
      {
        id: getNextId(),
        name: 'Cheese',
        price: {
          dollars: 7,
          euros: 6,
        },
        imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      },
      {
        id: getNextId(),
        name: 'Pepperoni',
        price: {
          dollars: 8,
          euros: 7,
        },
        imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      },
      {
        id: getNextId(),
        name: 'Alfredo',
        price: {
          dollars: 8,
          euros: 7,
        },
        imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      },
      {
        id: getNextId(),
        name: 'Texas',
        price: {
          dollars: 7,
          euros: 6,
        },
        imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      },
      {
        id: getNextId(),
        name: 'Spicy',
        price: {
          dollars: 9,
          euros: 8,
        },
        imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      },
      {
        id: getNextId(),
        name: 'Vegetarian',
        price: {
          dollars: 10,
          euros: 9,
        },
        imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      },
      {
        id: getNextId(),
        name: 'Pineapple',
        price: {
          dollars: 11,
          euros: 10,
        },
        imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      },
      {
        id: getNextId(),
        name: 'Margherita',
        price: {
          dollars: 9,
          euros: 8,
        },
        imageLink: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
      },
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
    .get('/api/v1/orders/:id', (req, reply) => {
      const userId = req.params.id;
      const userOrders = state.orders.filter((c) => c.userId === userId);
      const response = {
        data: userOrders,
      };
      reply.send(response);
    })
    .post('/api/v1/orders', (req, reply) => {
      const {
        data: {
          attributes: {
            userId, address, name, items, date,
          },
        },
      } = req.body;
      const orderData = {
        date,
        userId,
        address,
        name,
        id: getNextId(),
        items,
      };
      state.orders.push(orderData);
      reply.code(201);
      const data = {
        data: {
          type: 'orders',
          attributes: orderData,
        },
      };
      reply.send(data);
    });
};
