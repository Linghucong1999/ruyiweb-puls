<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="login">
    <div class="login-left">
      <div class="code">
        <div class="qrcode" ref="qrcode"></div>
        <div class="qrcode-title">扫码方式：微信</div>
      </div>
    </div>
    <div class="login-right">
      <div class="login-form">
        <div class="login-header">欢迎来到无代码世界</div>
        <div class="login-password" v-if="ifEmail === false">
          <el-form :model="formData" :rules="formRules" ref="loginForm">
            <el-form-item prop="username">
              <el-input
                v-model="formData.username"
                placeholder="用户名"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" v-if="type === 'register'">
              <el-input
                v-model="formData.email"
                placeholder="邮箱"
                auto-complete="off"
                prefix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formData.password"
                name="password"
                placeholder="密码"
                type="password"
                show-password
                prefix-icon="el-icon-lock"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="rest-password">
                <el-tooltip content="重置密码" placement="top-start">
                  <el-button
                    type="text"
                    @click="goPassword"
                    icon="el-icon-question"
                    v-if="type === 'login'"
                    >重置密码</el-button
                  >
                </el-tooltip>
                <div class="switch-do- type">
                  <el-button type="text" @click="switchType">{{
                    type === "login" ? "立即注册" : "马上登录"
                  }}</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="btn-hover" @click="doSubmit('loginForm')">
                <el-button type="primary" class="login-button">{{
                  type === "login" ? "登录" : "注册"
                }}</el-button>
              </div>
            </el-form-item>
          </el-form>

          <div class="login-email" v-if="type === 'login'">
            <el-button type="text" @click="goEmail">通过邮箱登录</el-button>
          </div>
        </div>

        <div class="login-password" v-else>
          <el-form :model="formData" :rules="formRules" ref="emailForm">
            <el-form-item prop="email">
              <el-autocomplete
                v-model="formData.email"
                placeholder="邮箱登录"
                prefix-icon="el-icon-mobile-phone"
                :fetch-suggestions="querySearchAsyncEmail"
                clearable
              ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="code">
              <div class="send-code">
                <el-input
                  v-model="formData.code"
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-message"
                ></el-input>
                <el-button
                  type="primary"
                  size="small"
                  @click="sendEmailCode"
                  :disabled="disableEamilButton"
                >
                  <template v-if="disableEamilButton"
                    >{{ countDown }}s后可重新发送</template
                  >
                  <template v-else>发送验证码</template>
                </el-button>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="btn-hover" @click="doLoginByEmail">
                <el-button type="primary" class="login-button">登录</el-button>
              </div>
            </el-form-item>
          </el-form>

          <div class="login-email">
            <el-button type="text" @click="goEmail">通过用户密码登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userModel from "@/libs/userModel";
import QRCode from "qrcodejs2";
import { encryption } from "@/utils/dataencryption";
import { emailCode } from "@/utils/commanJson";
import { debounce } from "@/utils/loadsh";

export default {
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        username: "",
        password: "",
        code: "",
      },
      formRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            pattern: /^.{6,12}$/,
            message: "密码长度应为6-12位",
            trigger: "blur",
          },
          // {
          //   pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,12}$/,
          //   message: "必须包含数字和字母",
          //   trigger: "blur",
          // },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      type: "login",
      ifEmail: false, //是否通过邮箱注册
      disableEamilButton: false, //发送验证码后禁用
      countDown: 60, //倒计时
      formUrl: "",
      publickey: "",
      continueCountDown: true, // 用于控制倒计时的变量
    };
  },
  created() {
    this.getRsa();
    this.formUrl = this.$route.query.from
      ? window.decodeURIComponent(this.$route.query.from)
      : "";
  },
  mounted() {
    this.createQrcode();
  },
  methods: {
    //获取RSA
    async getRsa() {
      const res = await userModel.getRSAkey();
      this.publickey = res.publicKey;
    },
    doSubmit: debounce(function (form) {
      this.$refs[form].validate((vaild) => {
        if (vaild) {
          const fn = this.type === "login" ? this.doLogin : this.doRegister;
          fn();
        } else {
          this.$message.error("请输入完整信息");
          return;
        }
      });
    }, 1000),
    async doLogin() {
      const formData = { ...this.formData };
      formData.password = encryption(this.formData.password, this.publickey);
      const res = await userModel.doLogin(formData);
      if (Object.keys(res.body).length !== 0) {
        this.formUrl
          ? this.$router.push(this.formUrl)
          : userModel.goBeforeLoginUrl();
      } else {
        this.$message.error(res.message);
      }
    },
    async doRegister() {
      const formData = { ...this.formData };
      formData.password = encryption(this.formData.password, this.publickey);
      const res = await userModel.doRegister(formData);
      if (Object.keys(res.body).length !== 0) {
        this.formUrl
          ? this.$router.push(this.formUrl)
          : userModel.goBeforeLoginUrl();
      } else {
        this.$message.error(res.message);
      }
    },
    goPassword() {
      this.$router.push({ name: "Password" });
    },
    switchType() {
      if (this.type === "login") {
        this.type = "register";
      } else {
        this.type = "login";
      }
    },
    goEmail() {
      this.ifEmail = !this.ifEmail;
    },
    sendEmailCode: debounce(async function () {
      if (this.formData.email === "") {
        this.$message.error("请输入邮箱");
        return;
      }

      this.disableEamilButton = true;
      this.countDown = 60; //按钮倒计时
      //发送按钮定时器
      const countDownInterval = () => {
        setTimeout(() => {
          if (!this.continueCountDown) return;
          this.countDown--;
          if (this.countDown === 0) {
            this.disableEamilButton = false;
          } else {
            countDownInterval(); // 下一个倒计时
          }
        }, 1000);
      };
      countDownInterval();

      //发送验证码
      const res = await userModel.sendEmailAndCode({
        email: this.formData.email,
      });

      if (res.status === false) {
        this.$message.error(res.message);
        this.continueCountDown = false;
        this.disableEamilButton = false;
        return;
      }
    }, 300),
    doLoginByEmail: debounce(function () {
      this.$refs["emailForm"].validate(async (vaild) => {
        if (vaild) {
          const formData = { ...this.formData };
          const res = await userModel.doLoginByEmail(formData);
          if (Object.keys(res.body).length !== 0) {
            this.$message.success("登录成功");
            this.formUrl
              ? this.$router.push(this.formUrl)
              : userModel.goBeforeLoginUrl();
          } else {
            this.$message.error(res.message);
          }
        } else {
          this.$message.error("请输入正确的邮箱和验证码");
        }
      });
    }, 1000),
    //生成二维码
    createQrcode() {
      new QRCode(this.$refs.qrcode, {
        width: 137,
        height: 137,
        text: "https://weixin.qq.com/",
        colorDark: "#0F88EB",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H, //二维码纠错级别
      });
    },
    // 匹配邮箱
    querySearchAsyncEmail(queryString, cb) {
      let results = [];
      const queryList = [];
      emailCode.map((item) => {
        queryList.push({
          value: queryString.split("@")[0] + item.value,
        });
      });
      results = queryString
        ? queryList.filter((item) => {
            return (
              item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
          })
        : queryList;
      cb(results);
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  height: 100vh;
  flex-direction: row;
  background: url("../common/images/sign_bg.47eec442.png") no-repeat center
    center / cover;
  background-size: 100% 100%;
}

.login-left {
  margin: auto 0;

  width: 340px;
  height: 540px;
  box-shadow: 0 0 8px 8px rgba(255, 255, 255, 0.2);
  border-radius: 15px 0px 0px 15px;
  background-color: #fbfbfc;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .code {
    margin: auto;

    .qrcode {
      width: 147px;
      height: 147px;
      border: 1px solid #e6e6e6;
      padding: 5px;
    }

    .qrcode-title {
      text-align: center;
      margin-top: 10px;
      font-weight: bolder;
    }
  }
}

.login-right {
  margin: auto 0;

  width: 340px;
  height: 540px;
  border-radius: 0px 15px 15px 0px;
  box-shadow: 0 0 8px 8px rgba(255, 255, 255, 0.2);
  background-color: #fbfbfc;

  .login-form {
    margin: 20px;
    padding: 50px 0;

    .login-header {
      height: 20px;
      width: 100%;
      line-height: 20px;
      margin: 30px 0;
      font-size: 20px;
      font-weight: bolder;
    }

    /deep/ .el-input__inner {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #d9d9d9;
      background-color: #fbfbfc;
    }

    .rest-password {
      display: flex;
      justify-content: space-between;
    }

    .login-button {
      width: 100%;
    }

    .login-email {
      display: flex;
      justify-content: flex-end;
    }

    .send-code {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      /deep/ .el-button--small {
        margin-left: 20px;
        padding: 9px 2px;
      }
    }
  }
}
</style>