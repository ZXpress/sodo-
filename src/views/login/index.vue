<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">
        <img src="@/assets/common/sodologo.png" alt="" />
        <span>SodoCloud授权管理系统</span>
      </h3>
    </div>

    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账号密码登录" name="first">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="phone">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="phone"
                v-model="loginForm.phone"
                placeholder="请输入手机号"
                name="phone"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="pwd">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="pwdType"
                ref="pwd"
                v-model="loginForm.pwd"
                :type="pwdType"
                placeholder="请输入密码"
                name="pwd"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>

            <el-button
              class="loginBtn"
              :loading="loading"
              type="primary"
              @click.native.prevent="handleLogin"
              >登录</el-button
            >
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="手机号登录" name="second">
          <el-form
            ref="codeLoginForm"
            :model="codeLoginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="phone">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="phone"
                v-model="codeLoginForm.phone"
                placeholder="请输入手机号"
                name="phone"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <div class="verifyimgcode">
              <el-form-item prop="verifyCode" class="code">
                <el-input
                  ref="verifyCode"
                  v-model="codeLoginForm.verifyCode"
                  placeholder="请输入验证码"
                  name="verifyCode"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>
              <img
                class="verifyimg"
                @click="changeverifyimg"
                :src="imgsrc"
                alt=""
              />
            </div>

            <div class="messagecode">
              <el-form-item prop="messagecode" class="code">
                <el-input
                  v-model="codeLoginForm.messagecode"
                  type="text"
                  placeholder="请输入短信验证码"
                  name="messagecode"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleCodeLogin"
                />
              </el-form-item>
              <el-button plain class="verifyimg" @click="getmessagecode"
                >获取验证码</el-button
              >
            </div>

            <el-button
              class="loginBtn"
              :loading="loading"
              type="primary"
              @click.native.prevent="handleCodeLogin"
              >登录</el-button
            >
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { validPobile } from "@/utils/validate";
import { mapActions } from "vuex"; // 引入vuex的辅助函数
import { getFakeCaptcha } from "@/api/user";

export default {
  name: "Login",
  data() {
    // 自定义校验函数
    const validatePhone = function (rule, value, callback) {
      // 校验value
      // if (validMobile(value)) {
      //   // 如果通过 直接执行callback
      //   callback()
      // } else {
      //   callback(new Error('手机号格式不正确'))
      // }
      validPobile(value) ? callback() : callback(new Error("手机号格式不正确"));
    };

    return {
      // 获取图形验证码
      imgsrc:
        "http://" +
        window.location.host +
        "/verifyImg?time=" +
        new Date().getTime(),

      activeName: "first", // tabs标签页默认选中

      loginForm: {
        phone: "",
        pwd: "",
        verifyCode: "",
        messagecode: "",
      },
      codeLoginForm: {
        phone: "",
        // pwd: "",
        verifyCode: "",
        messagecode: "",
      },
      loginRules: {
        phone: [
          { required: true, trigger: "blur", message: "手机号不能为空" },
          {
            validator: validatePhone,
            trigger: "blur",
          },
        ],
        pwd: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          {
            min: 6,
            max: 16,
            message: "密码的长度在6-16位之间 ",
            trigger: "blur",
          },
        ],
        messagecode: [
          { required: true, trigger: "blur", message: "验证码不能为空" },
          {
            min: 1,
            max: 6,
            message: "验证码的最大长度为6位 ",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      pwdType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    // 点击切换验证码
    changeverifyimg() {
      this.imgsrc =
        "http://" +
        window.location.host +
        "/verifyImg?time=" +
        new Date().getTime();
    },

    // 点击获取短信验证码
    async getmessagecode() {
      const result = await getFakeCaptcha(this.codeLoginForm);
      console.log(result);
    },

    // tabs标签页切换事件
    handleClick(tab, event) {
      console.log(tab, event);
    },

    ...mapActions(["user/login"]),

    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
      this.$nextTick(() => {
        this.$refs.pwd.focus();
      });
    },

    handleLogin() {
      this.$refs.loginForm.validate(async (isOK) => {
        if (isOK) {
          try {
            this.loading = true;
            // 只有校验通过了 我们才去调用action
            await this["user/login"](this.loginForm);
            // 应该登录成功之后
            // async标记的函数实际上一个promise对象
            // await下面的代码 都是成功执行的代码
            this.$message({
              message: "登陆成功！",
              type: "success",
            });
            this.$router.push("/");
          } catch (error) {
            console.log(error);
          } finally {
            //  不论执行try 还是catch  都去关闭转圈
            this.loading = false;
          }
        }
      });
    },

    handleCodeLogin() {
      this.$refs.codeLoginForm.validate(async (isOK) => {
        if (isOK) {
          try {
            this.loading = true;
            // 只有校验通过了 我们才去调用action
            await this["user/login"](this.codeLoginForm);
            // 应该登录成功之后
            // async标记的函数实际上一个promise对象
            // await下面的代码 都是成功执行的代码
            this.$message({
              message: "登陆成功！",
              type: "success",
            });
            this.$router.push("/");
          } catch (error) {
            console.log(error);
          } finally {
            //  不论执行try 还是catch  都去关闭转圈
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url("~@/assets/common/login.jpg"); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #68b0fe !important; // 根据字体颜色更改配色
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }

  .code {
    width: 450px;
    margin-right: 20px;
  }

  .verifyimg {
    width: 170px;
    height: 48.6px;
    border-radius: 5px;
    padding: 0;
  }

  .el-form-item__error {
    color: #fff;
  }

  .el-tabs__header {
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 450px;
    z-index: 99;
  }

  .el-tabs__nav {
    left: 50%;
    transform: translateX(-50%) !important;
  }

  .el-tabs__nav-wrap::after {
    height: 0px;
  }

  .el-tabs__active-bar {
    background-color: #fff;
  }

  .el-tabs__item {
    color: #303133;
  }

  .el-tabs__item.is-active {
    color: #fff;
  }

  .verifyimgcode {
    display: flex;
  }

  .messagecode {
    display: flex;
  }

  .loginBtn {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: #407ffe;
    width: 450px;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    top: 150px;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 10px auto;
      text-align: center;
      font-weight: bold;
      img {
        width: 64px;
        vertical-align: middle;
        margin-right: 20px;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
