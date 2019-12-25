import request from "../../../services/request";

// 重置密码
export async function resetPassword(params) {
  return request({
    url: '/member/changePassword',
    method: "POST",
    data: params
  });
}
