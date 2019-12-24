import request from "../../../services/request";

// 获取用户信息
export default async function registerUser(params) {
  return request({
    url: '/member/register',
    method: "POST",
    data: params
  });
}
