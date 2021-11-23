import request from "@/utils/request";

export function login(params) {
  // 返回一个axios对象 => promise  // 返回了一个promise对象
  return request({
    url: "/staff/v2/login",
    method: "post",
    params,
  });
}

// 获取短信验证码
export function getFakeCaptcha(params) {
  // const data = {
  //   phone: body.phone,
  //   verifyCode: body.verifyCode,
  // };
  return request("/staff/verify_code_img", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    // data: {
    //   phone: data.phone,
    //   verifyCode: data.verifyCode,
    // },
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

// export function getInfo(token) {}

// export function logout() {}
