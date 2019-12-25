import request from "../../../services/request";

// 获取测试结果
export default async function getResultById(params) {
  return request({
    url: '/test/getResultById',
    method: "POST",
    data: params
  });
}
