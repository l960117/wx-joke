import Taro from '@tarojs/taro';
import { baseUrl } from './config';
 
export default (options = { method: 'GET', data: {} }) => {
  let cookie = Taro.getStorageSync('Cookies')
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      let cookies = res
      console.log("cookie", cookies)
      Taro.setStorageSync('Cookies', cookies)
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}