import request from "../../services/request";

// 获取测试题目
export default async function getJokeData() {
  return request({
    url: '/joke/getJokeData',
    method: "GET",
    data: {}
  });
}
