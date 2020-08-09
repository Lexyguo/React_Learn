import { getUserData } from '../services/user';

export default {
  namespace: 'user',

  state: {
    data: [],
    pageSize: 10,
    current: 1,
    total: 0,
  },

  effects: {
    *getUserData({ payload }, { call, put }) {
      const res = yield call(getUserData, payload);
      yield put({ type: 'userData', payload: res.data });
    },
  },

  reducers: {
    userData(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
