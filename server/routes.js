// @ts-check

import _ from 'lodash';

const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
  const state = {
    menu: [
      {
        id: getNextId(),
        textId: 'pizza_cheese_1',
        type: 'pizza',
        price: {
          dollars: 7,
          euros: 6,
        },
      },
      {
        id: getNextId(),
        textId: 'pizza_pepperoni_1',
        type: 'pizza',
        price: {
          dollars: 8,
          euros: 7,
        },
      },
      {
        id: getNextId(),
        textId: 'pizza_alfredo_1',
        type: 'pizza',
        price: {
          dollars: 8,
          euros: 7,
        },
      },
      {
        id: getNextId(),
        textId: 'pizza_meat_1',
        type: 'pizza',
        price: {
          dollars: 7,
          euros: 6,
        },
      },
      {
        id: getNextId(),
        textId: 'pizza_spicy_1',
        type: 'pizza',
        price: {
          dollars: 9,
          euros: 8,
        },
      },
      {
        id: getNextId(),
        textId: 'pizza_vegetarian_1',
        type: 'pizza',
        price: {
          dollars: 10,
          euros: 9,
        },
      },
      {
        id: getNextId(),
        textId: 'pizza_hawaiian_1',
        type: 'pizza',
        price: {
          dollars: 11,
          euros: 10,
        },
      },
      {
        id: getNextId(),
        textId: 'pizza_margherita_1',
        type: 'pizza',
        price: {
          dollars: 9,
          euros: 8,
        },
      },
      {
        id: getNextId(),
        textId: 'drink_milkshake_1',
        type: 'drink',
        price: {
          dollars: 9,
          euros: 8,
        },
      },
      {
        id: getNextId(),
        textId: 'drink_tea_1',
        type: 'drink',
        price: {
          dollars: 9,
          euros: 8,
        },
      },
    ],
    orders: [],
  };

  if (defaultState.pizzas) {
    state.menu.push(...defaultState.pizzas);
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
    .get('/api/v1/menu', (_req, reply) => {
      const resources = state.menu.map((c) => ({
        type: 'menu',
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
