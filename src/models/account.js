import Taro from '@tarojs/taro'
import {
  loginIn,
  getUserInfo
} from '../services/account'

export default {
  namespace: 'account',
  state: { 
    token: Taro.getStorageSync('token'),
    userId: Taro.getStorageSync('userId'),
    userInfo:{

    }
  },
  effects: {
    *loginAction({ payload }, { call, put }) {
      const { params, fail, success } = payload
      const res = yield call(loginIn, params);
      if (res.resultCode === 200) {
        Taro.setStorageSync('token', res.data.token)
        Taro.setStorageSync('userId', res.data.id)
        yield put({ type: 'setToken', payload: { ...res.data}})
        yield put({ type: 'setUserId', payload: {...res.data}})
        yield put({ type: 'setUserInfo', payload: {...res.data}})
        success && success()
      } else {
        fail && fail(res)
      }
    },
    *loginOutAction({ payload}, { call, put }) {
      Taro.setStorageSync('token', '')
      Taro.setStorageSync('guid', '')
      yield put({ type: 'setToken', payload: {token: ''}})
      yield put({ type: 'setUserId', payload: {id: ''}})
      yield put({ type: 'setUserInfo', payload: {}})
    },
    *registerAction({ payload }, { call, put }) {
    },
    *getUserInfoAction({ payload }, { call, put }) {
      const { loginExpired, fail, params } = payload
      const res = yield call(getUserInfo, params);
      if (res.resultCode === 200) {
        yield put({ type: 'setUserInfo', payload: {...res.data} })
      } else if (res.resultCode === 401) {
        Taro.setStorageSync('token', '')
        Taro.setStorageSync('guid', '')
        yield put({ type: 'setToken', payload: {token: ''}})
        yield put({ type: 'setUserId', payload: {id: ''}})
        yield put({ type: 'setUserInfo', payload: {}})
        loginExpired && loginExpired()
      } else {
        Taro.setStorageSync('token', '')
        Taro.setStorageSync('guid', '')
        yield put({ type: 'setToken', payload: {token: ''}})
        yield put({ type: 'setUserId', payload: {id: ''}})
        yield put({ type: 'setUserInfo', payload: {}})
        fail && fail()
      }
    }
  },
  reducers: {
    setToken(state, { payload }){
      return { ...state, token: payload.token}
    },
    setUserId(state, { payload }){
      return { ...state, userId: payload.id}
    },
    setUserInfo(state, { payload }){
      return { ...state, userInfo: payload}
    },
    setAvatar(state, { payload }){
      state.userInfo.avatar = payload.avatar
      return { ...state }
    }
  }
};
