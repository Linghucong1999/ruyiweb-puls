<template>
  <div style="display: flex">
    <div class="step">
      <div class="header-title">找回密码</div>
      <div class="header-secondary-title">验证码将会发送至你注册的邮箱</div>
      <div class="password-input">
        <el-input
          v-model="email"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-message"
        ></el-input>
        <el-input
          v-model="code"
          placeholder="请输入验证码"
          prefix-icon="el-icon-chat-square"
          v-if="active === 1"
        >
          <el-button
            type="text"
            slot="append"
            @click="disableEamilButton ? '' : sendEmailCode()"
          >
            <template v-if="disableEamilButton"
              >{{ countDown }}s后可重新发送</template
            >
            <template v-else>重新发送验证码</template>
          </el-button>
        </el-input>
      </div>
      <div class="password-button">
        <el-button
          type="primary"
          @click="active === 1 ? codeNext() : next()"
          slot="append"
          >下一步</el-button
        >
      </div>
      <div class="password-footer">
        <el-link type="primary">手机号找回</el-link>
        <el-link type="info">手机或邮箱不可用?</el-link>
      </div>
    </div>
  </div>
</template>
<script>
import userModel from "@/libs/userModel";
export default {
  name: "Step",
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      email: "",
      code: "",
      countDown: 0,
      disableEamilButton: false, //发送验证码后禁用
    };
  },
  methods: {
    next() {
      this.$emit("next", this.email);
    },
    async sendEmailCode() {
      if (this.email === "") {
        this.$message.error("请输入邮箱");
        return;
      }

      const res = await userModel.sendEmailAndCode({ email: this.email });
      if (res.status === false) return;
      this.disableEamilButton = true;
      this.countDown = 60;
      const countDownInterval = setInterval(() => {
        this.countDown--;
        if (this.countDown === 0) {
          this.disableEamilButton = false;
          clearInterval(countDownInterval);
        }
      }, 1000);
    },

    //填写完验证码的下一步
    async codeNext() {
      if (this.code === "") {
        this.$message.error("请输入验证码");
        return;
      }
      const res = await userModel.doResetPasswordByEmail({
        email: this.email,
        code: this.code,
      });
      if (res.status) {
        let number=this.active+1;
        this.$emit("next", number);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.step {
  width: 380px;
  margin: auto;
  .header-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .header-secondary-title {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
  }

  .password-input {
    margin-bottom: 25px;
    width: 350px;

    /deep/ .el-input__inner {
      border: none;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      margin-bottom: 10px;
    }
    /deep/ .el-input-group__append {
      background-color: transparent;
      border: none;
    }
  }

  .password-button {
    .el-button--primary {
      width: 350px;
      margin-bottom: 20px;
    }
  }

  .password-footer {
    display: flex;
    justify-content: space-between;
    width: 350px;
  }
}
</style>