// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  ordersPath: () => [host, prefix, 'orders'].join('/'),
  orderPath: (userId) => [host, prefix, 'orders', userId].join('/'),
};
