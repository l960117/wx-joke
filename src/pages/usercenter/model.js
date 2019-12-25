import { getTestHistory } from './service'

const inintState ={
  history: []
}
export default {
  namespace: "usercenter",
  state: inintState,
  effects: {
    *getTestHistoryAction({ payload }, { call, put }) {
      const { params } = payload
      const res = yield call(getTestHistory, params)
      if (res.resultCode === 200) {
        yield put({type: 'setTestHistory', payload: res.data})
      }
    }
  },
  reducers: {
    setTestHistory(state, { payload }){
      return { ...state, history: payload}
    }
  }
};
