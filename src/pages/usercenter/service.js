import request from "../../services/request";

// 重置密码
export async function resetPassword(params) {
  return request({
    url: '/member/changePassword',
    method: "POST",
    data: params
  });
}

// 获取历史
export async function getTestHistory(params) {
  return request({
    url: '/member/getTestHistory',
    method: "POST",
    data: params
  })
}