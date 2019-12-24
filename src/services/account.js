import request from "./request";

// 获取用户信息
export async function getUserInfo(params) {
  return request({
    url: '/member/getUserInfo',
    method: "POST",
    data: params
  });
}

// 登录
export async function loginIn(params) {
  return request({
    url: '/member/login',
    method: "POST",
    data: params
  });
}