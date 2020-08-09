import request from '../utils/request';

export async function getUserData(params) {
  return request('/api/user/list', {
    data: params,
    method: 'get',
  });
}
