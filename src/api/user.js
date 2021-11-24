import request from "@/utils/request";

export function login(params) {
  return request({
    url: "/admin/login",
    method: "post",
    params,
  });
}

// 获取短信验证码
export function getFakeCaptcha(params) {
  return request("/staff/verify_code_img", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params,
  });
}

// 修改密码
export function repassword(params) {
  return request({
    url: "/staff/pwd/edit",
    method: "post",
    params,
  });
}
