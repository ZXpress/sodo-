// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from "axios";
import store from "@/store";
import router from "@/router";
import { Message } from "element-ui";
import { getTimeStamp } from "@/utils/auth";
const TimeOut = 3600; // 定义超时时间

// 创建一个axios的实例
const service = axios.create({
  // 如果执行 npm run dev  值为 /staff
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000, // 定义5秒超时
  // axios 配置
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // config 是请求的配置信息
    // 注入token
    if (store.getters.token) {
      // 只有在有token的情况下 才有必要去检查时间戳是否超时
      if (IsCheckTimeOut()) {
        // 如果它为true表示 过期了
        // token没用了 因为超时了
        store.dispatch("user/logout"); // 登出操作
        // 跳转到登录页
        router.push("/login");
        this.$message.error("token超时了");
        return Promise.reject(new Error("token超时了"));
      }
      // 配置请求头中的token
      config.headers["Authorization"] = `Bearer ${store.getters.token}`;
    }
    return config; // 必须要返回的
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response);
    // axios默认加了一层data
    const { code, err, data } = response.data;
    // const { status, msg, data } = response;
    //   要根据success的成功与否决定下面的操作
    if (response.request.responseType == "blob") {
      return response.data;
    } else {
      if (code == 0) {
        return data;
      } else if (code == -2) {
        this.$message.error("token失效");
        Message.error("token失效"); // 提示错误消息
        store.dispatch("user/logout"); // 登出操作
      } else {
        // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
        Message.error(err); // 提示错误消息
        return Promise.reject(new Error(err));
      }
    }
  },
  (error) => {
    console.log(error);
    // error 信息 里面 response的对象
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === -2
    ) {
      // 当等于10002的时候 表示 后端告诉我token超时了
      store.dispatch("user/logout"); // 登出action 删除token
      router.push("/login");
    } else {
      Message.error(error.msg); // 提示错误信息
    }
    return Promise.reject(error); // 返回执行错误 让当前的执行链跳出成功 直接进入catch捕获错误
  }
);

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now(); // 当前时间戳
  var timeStamp = getTimeStamp(); // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut;
}

export default service; // 导出axios实例
