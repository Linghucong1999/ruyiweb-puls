<template>
  <div class="user-info-plane-dialog inline-block">
    <div class="inline-block" @click="show">
      <slot></slot>
    </div>

    <el-dialog
      title="个人中心"
      class="page-dialog-warapper"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="500px"
      append-to-body
      @close="closeDialog"
    >
      <div class="user-info-plane">
        <div class="user-image-wrapper">
          <div class="user-image-inner">
            <img :src="userData.avatar || userHeadImage" />

            <div class="user-image-upload" v-if="showEdit">
              <el-tooltip
                content="点击头像更换 (只支持jpg、png、jpeg格式且大小不超过3M的图片)"
                placement="top"
                effect="dark"
              >
                <el-upload
                  class="user-image-upload-input"
                  accept="image/jpeg,image/png,image/jpg"
                  :action="avaterurl"
                  :before-upload="beforeUploadAvatar"
                  :show-file-list="false"
                  :file-list="uploadFilesImage"
                  :on-remove="handleRemove"
                  :on-exceed="handleExceed"
                  :headers="avatarToken"
                  :on-success="handleAvatarSuccess"
                  :on-preview="handlePictureCardPreview"
                >
                  <i class="el-icon-upload"></i>
                </el-upload>
              </el-tooltip>
            </div>
          </div>
        </div>

        <el-form label-width="100px" ref="table">
          <el-form-item label="昵称：">
            <div v-if="!editName">
              <span class="inline-block">{{ userData.name }}</span>
              <el-button
                v-if="showEdit"
                size="mini"
                icon="el-icon-edit"
                @click="setEditName(true)"
                type="text"
                circle
              ></el-button>
            </div>
            <div class="edit-name-wrapper" v-else>
              <div class="edit-name-input">
                <el-input
                  v-model="name"
                  :placeholder="userData.name"
                ></el-input>
              </div>
              <el-button
                size="mini"
                icon="el-icon-close"
                @click="setEditName(false)"
                circle
              ></el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-check"
                @click="saveNickName"
                circle
              ></el-button>
            </div>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input :value="userData.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input :value="userData.email"></el-input>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-input :value="userData.created | dateFormat"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    userData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      userHeadImage: require("@/common/images/headerImage.png"),
      uploadFilesImage: [],
      dialogImageUrl: "",
      editName: false,
      name: "",
    };
  },
  computed: {
    avaterurl() {
      return this.$config.baseURL + this.$api.updataUserAvatarURL;
    },
    avatarToken() {
      return {
        Authorization: this.$store.getters.authorization,
      };
    },
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$emit("close");
    },
    beforeUploadAvatar(filelist) {
      const isJPG =
        filelist.type === "image/jpeg" || filelist.type === "image/png";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return false;
      }

      const isLt3M = filelist.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
        return false;
      }
      return true;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async handleAvatarSuccess() {
      this.$message.success("上传成功");
      this.$emit("success");
    },
    // 移除图片
    handleRemove() {
      // console.log(filelist);
    },
    handleExceed(files) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`
      );
    },
    setEditName(type) {
      this.editName = !!type;
    },
    saveNickName() {
      this.$api.updateUserNickname({ name: this.name }).then((res) => {
        this.$store.commit("updateUserInfo", res.body);
        this.setEditName(false);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-dialog-warapper {
  .user-image-wrapper {
    text-align: center;
    padding-bottom: 20px;
    .user-image-inner {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;

      .user-image-upload {
        width: 100%;
        height: 100%;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        .user-image-upload-input {
          width: 100%;
          height: 100%;
          text-align: center;

          .el-icon-upload {
            line-height: 100px;
            font-size: 30px;
            color: #eee;
            opacity: 0;
            transition: all 0.5s ease-in-out;
          }
        }
        &:hover {
          .el-icon-upload {
            opacity: 1;
          }
        }
      }
    }
  }

  .edit-name-input {
    display: inline-block;
    width: 250px;
    margin-right: 16px;
  }

  ::v-deep .el-input {
    width: 250px;
  }

  ::v-deep .el-input__inner {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #dcdfe6;
  }

  ::v-deep .el-input__inner:focus {
    border-color: #409eff;
    outline: 0;
  }
}
</style>