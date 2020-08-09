import Mock from 'mockjs';

export default {
  'GET /api/user/list': Mock.mock({
    'data|100': [
      {
        id: '@increment(1)',
        name: '@cname',
        age: '@integer(0, 100)',
        address: '@county(true)',
      },
    ],
  }),
};
