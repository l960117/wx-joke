import request from "../../../services/request";

// 获取用户信息
export async function registerUser(params) {
  return request({
    url: '/member/register',
    method: "POST",
    data: params
  });
}

// 获取图形验证码
export async function getCaptcha() {
  return request({
    url: `/member/captcha?${new Date().getTime()}`,
    method: 'GET',
    data: {}
  })
}
