<template>
  <div class="user-head-btn-components">
    <el-dropdown v-if="isLogined">
      <div class="inline-block">
        <div class="user-header-btn-img">
          <img :src="userData.avatar || userHeadImage" alt="" />
        </div>
        <div class="user-head-btn-name">{{ userData.name }}</div>
      </div>
      <el-dropdown-menu v-if="isLogined">
        <el-dropdown-item>
          <user-info
            :user-data.sync="userData"
            :show-edit="true"
            @success="handleSuccesAvatar"
          >
            <i class="el-icon-user"></i>个人中心
          </user-info>
        </el-dropdown-item>
        <el-dropdown-item>
          <reset-password>
            <i class="el-icon-lock"></i>修改密码
          </reset-password>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="doLogout">
            <i class="el-icon-switch-button"></i>退出登录
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-else class="inline-block" @click="goLogin">登录/注册</div>
  </div>
</template>
<script>
import userInfo from "./user-info.vue";
import ResetPassword from "./reset-password.vue";
import { cloneDeep } from "lodash";
import userModel from "@/libs/userModel";

export default {
  components: {
    userInfo,
    ResetPassword,
  },
  data() {
    return {
      userHeadImage: require("@/common/images/headerImage.png"),
    };
  },
  computed: {
    isLogined() {
      return this.$store.state.user.access_token;
    },
    userData() {
      const userInfo = cloneDeep(this.$store.state.user.userInfo) || {};
      // Object.assign(userInfo.avatar, this.$config.baseURL + userInfo.avatar);
      return userInfo;
    },
  },
  methods: {
    async handleSuccesAvatar() {
      await userModel.getUserInfoData();
    },
    doLogout() {
      this.$api.logoutClearToken().then(() => {
        userModel.doLogout();
      });
    },
    goLogin() {
      userModel.goLogin();
    },
  },
};
</script>
<style lang="less" scoped>
.user-head-btn-components {
  cursor: pointer;

  .inline-block {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    line-height: 40px;

    .user-header-btn-img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      background: #f5f5f5;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .user-head-btn-name {
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>