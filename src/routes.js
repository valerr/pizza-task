// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  ordersPath: () => [host, prefix, 'orders'].join('/'),
};
