<template>
  <div class="change-password inline-block">
    <div class="inlie-block" @click="show">
      <slot></slot>
    </div>
    <el-dialog
      title="重置密码"
      width="600px"
      class="page-dialog-wrapper"
      v-if="dialogResetPassword"
      :visible.sync="dialogResetPassword"
      append-to-body
      @close="closeDialog"
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        status-icon
        ref="formData"
      >
        <el-form-item label="输入旧密码：" prop="oldPassword">
          <el-input
            v-model="form.oldPassword"
            placeholder="请输入旧密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input
            v-model="form.newPassword"
            placeholder="请输入新密码"
            type="password"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="reconPassword">
          <el-input
            v-model="form.reconPassword"
            placeholder="请再次输入新密码"
            type="password"
            clearable
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @close="closeDialog">取消</el-button>
        <el-button type="primary" @click="updatePassword" :loading="loading"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import userModel from "@/libs/userModel";
import { encryption } from "@/utils/dataencryption";
export default {
  data() {
    return {
      dialogResetPassword: false,
      loading: false,
      form: {
        newPassword: "",
        oldPassword: "",
        reconPassword: "",
      },
      rules: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,12}$/,
            message: "必须包含数字和字母",
            trigger: "blur",
          },
        ],
        reconPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            varidate: (rule, value, callback) => {
              if (value !== this.form.newPassword) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
      },
      publicKey: "",
    };
  },
  created() {
    this.getRsa();
  },
  methods: {
    async getRsa() {
      const res = userModel.getRSAkey();
      this.publicKey = res.publicKey;
    },
    show() {
      this.dialogResetPassword = true;
    },
    closeDialog() {
      this.dialogResetPassword = false;
      this.$emit("close");
    },
    updatePassword() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          this.loading = true;
          const oldPassword = encryption(this.form.oldPassword, this.publicKey);
          const newPassword = encryption(this.form.newPassword, this.publicKey);
          const reconPassword = encryption(
            this.form.reconPassword,
            this.publicKey
          );
          this.$api
            .updateUserPassword({
              oldPassword: oldPassword,
              newPassword: newPassword,
              reconPassword: reconPassword,
            })
            .then(() => {
              this.loading = false;
              this.$alert("密码已修改,请重新登录", "提示", {
                confirmButtonText: "确定",
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                center: true,
              }).then(() => {
                userModel.doLogout();
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.page-dialog-wrapper {
  ::v-deep .el-input--suffix .el-input__inner {
    border: none;
    border-bottom: 1px solid #dcdfe6;
    border-radius: 0%;
  }

  ::v-deep .el-input__inner:focus {
    border-color: #409eff;
    outline: 0;
  }
}
</style>