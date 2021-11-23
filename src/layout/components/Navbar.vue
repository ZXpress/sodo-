<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- this.$route.params.length? (this.$route.params.offerInfoId? "生成订单" : "报价详情") : this.$route.meta.title -->

    <div class="app-breadcrumb at-item">
      <span>{{ title }}</span>
    </div>

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/common/userheader.png" class="user-avatar" />
          <span class="name">{{ this.$store.getters.username }}</span>
          <i class="el-icon-caret-bottom" style="color: #fff" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="http://git.sodo-tech.com/sodo/vue-project/sodo-tech-vueproject"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a href="javascript:;" @click.prevent="repwd">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input
              type="password"
              v-model="ruleForm.newpass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确定新密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { repassword } from "@/api/user";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  // created() {
  //   console.log(this.$route);
  // },
  watch: {
    $route: {
      deep: true,
      handler(newval, oldval) {
        // console.log(newval);
        if (newval.params.id && newval.name == "newprice") {
          this.title = "报价模块 / 报价详情";
        } else if (newval.query.id) {
          this.title = "报价模块 / 生成订单";
        } else {
          this.title = newval.meta.title;
        }
      },
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.newpass !== "") {
          this.$refs.ruleForm.validateField("newpass");
        }
        callback();
      }
    };
    var checknewpass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if (value === this.ruleForm.pass) {
        callback(new Error("新旧密码不能一致"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      title: this.$route.meta.title,
      dialogVisible: false,
      ruleForm: {
        pass: "",
        newpass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        newpass: [{ validator: checknewpass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout(pwd) {
      // console.log(pwd);
      await this.$store.dispatch("user/logout");
      if (!pwd.newPwd) {
        this.$message({
          message: "登出成功！",
          type: "success",
        });
      }
      this.$router.push(`/login`); // 跳转登录页
    },
    repwd() {
      this.dialogVisible = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // console.log(valid);
        if (valid) {
          const pwd = {
            oldPwd: this.ruleForm.pass,
            newPwd: this.ruleForm.newpass,
          };
          await repassword(pwd);
          this.dialogVisible = false;
          this.$message({
            message: "密码修改成功",
            type: "success",
          });
          this.logout(pwd);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-bottom: 0;
}
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  // background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  background-color: #001529;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 64px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 64px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
    // .breadBtn {
    //   background: #84a9fe;
    //   font-size: 14px;
    //   padding: 0 10px;
    //   display: inline-block;
    //   height: 30px;
    //   line-height: 30px;
    //   border-radius: 10px;
    //   margin-left: 15px;
    // }
  }

  .at-item {
    animation-name: bounce-top;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
  }

  @keyframes bounce-top {
    0% {
      -webkit-transform: translateY(-45px);
      transform: translateY(-45px);
    }
    25% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-24px);
      transform: translateY(-24px);
    }
    55% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    65% {
      -webkit-transform: translateY(-12px);
      transform: translateY(-12px);
    }
    75% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    82% {
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
    }
    87% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    93% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 55px;

    &:focus {
      outline: none;
    }

    .name {
      cursor: pointer;
      color: #fff;
      vertical-align: middle;
      margin-left: 5px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .user-dropdown {
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 23px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
