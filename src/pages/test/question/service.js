import request from "../../../services/request";

// 获取测试题目
export async function getQuestionData(params) {
  return request({
    url: '/test/getQuestion',
    method: "POST",
    data: params
  });
}

// 提交测试答案
export async function submitQuestionResult(params) {
  return request({
    url: '/test/submitTest',
    method: "POST",
    data: params
  });
}