<template>
  <el-dialog title="协作人管理" :visible.sync="visible" width="650px">
    <div>
      <div class="new-folder-wrapper paddingL30 padingR30">
        <div class="title">按人员搜索添加</div>
        <div class="search-wrapper">
          <div class="input-wrapper">
            <el-select
              v-model="userInput"
              placeholder="请输入用户名|邮箱|昵称搜索"
              class="input-i"
              multiple
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethodUser"
              :loading="loading_user"
            >
              <el-option
                v-for="item in userOptions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </div>

          <div class="tj-btn">
            <el-button type="primary" @click="addUser">添加</el-button>
          </div>
        </div>
      </div>

      <div class="user-list-wrapper">
        <div class="title">已加入成员:</div>
        <div class="user-list">
          <el-tag
            class="user-item"
            v-for="(tag, index) in cooperationUserList"
            :key="index"
            size="small"
            @close="delUser(tag._id, index)"
            closable
          >
            <img
              :src="tag.avatar || userHeadImage"
              alt="..."
              class="userHeadImage"
            />
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      pageId: "",
      callback: null,
      userHeadImage: require("@/common/images/headerImage.png"),
      userInput: "",
      loading_user: false,
      cooperationUserList: [],
      userOptions: [],
    };
  },
  created() {
    this.getCooperationListByPageID();
  },
  methods: {
    getCooperationList() {
      this.$api
        .getCooperationListByPageID({ pageid: this.pageId })
        .then((res) => {
          this.cooperationUserList = res.body || {};
        });
    },
    remoteMethodUser(str) {
      this.loading_user = true;
      this.$api
        .getUserListByKeywords({ keywords: str })
        .then((res) => {
          this.userOptions = res.body || [];
          this.loading_user = false;
        })
        .catch(() => {
          this.loading_user = false;
        });
    },
    addUser() {
      if (!this.userInput.length) return;
      this.$api
        .addCooperation({ pageId: this.pageId, userIds: this.userInput })
        .then((res) => {
          this.cooperationUserList = res.body || [];
          this.userInput = "";
          this.$message.success("添加成功");
        });
    },
    delUser(userId, index) {
      this.$api
        .deleteCooperation({ pageId: this.pageId, userId: userId })
        .then(() => {
          this.cooperationUserList.splice(index, 1);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.title {
  display: block;
  font-weight: 600;
  padding-bottom: 20px;
}

.search-wrapper {
  display: flex;
  .input-wrapper {
    flex: 1;
    padding-right: 20px;
    .input-i {
      width: 100%;
    }
  }
  .tj-btn {
    width: 80px;
  }
}

/*人员列表*/
.user-list-wrapper {
  background: #fafafa;
  min-height: 200px;
  margin-top: 20px;
  padding: 20px;
  .title {
    font-weight: 600;
    padding-bottom: 20px;
  }
}

.userHeadImage {
  width: 14px;
  height: 14px;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
}

.user-item {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>