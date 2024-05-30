<template>
  <div>
    <div v-if="pageData">
      <div class="page-thumbnail-panel" v-loading="loading">
        <span class="unpublish" v-if="!pageData.isPublish && showPublishState"
          >未发布</span
        >
        <div class="thumbnail-panel-cover">
          <div class="header-mask">
            <div class="details-btn" @click="preview(pageData._id)">预览</div>
          </div>
          <div class="image-wrapper">
            <img :src="pageData.coverImage || defaultImageCover" />
          </div>
        </div>
      </div>
      <div class="page-item-title border-T ellipsis">
        <el-tag
          :type="
            !pageData.isPublish && showPublishState ? 'warning' : 'success'
          "
          effect="plain"
          >{{ pageData.title || "未命名作品" }}</el-tag
        >
      </div>

      <div class="thumbnail-panel-btn" v-if="btnList.length">
        <el-button
          class="btn-wrapper"
          v-if="btnList.includes('edit')"
          @click="edit"
          type="text"
          size="mini"
          >编辑</el-button
        >
        <el-button
          class="btn-wrapper"
          type="text"
          size="mini"
          v-if="btnList.includes('useTemplate')"
          @click="copyPage"
          >使用模板</el-button
        >
        <el-button
          class="btn-wrapper"
          v-if="btnList.includes('copyTemplate')"
          type="text"
          size="mini"
          @click="copyPage"
          >复制</el-button
        >
        <div class="btn-wrapper-more" v-if="showMoreBtn">
          <el-dropdown @command="command" placement="top-start" size="mini">
            <el-button type="text" size="mini"
              >更多<i class="el-icon-more el-icon--right"></i
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(item, index) in operationDataList">
                <el-dropdown-item
                  :key="index"
                  :command="item.eventType"
                  :class="item.extraClassName"
                  :icon="item.iconClass"
                  v-if="btnList.includes(item.eventType)"
                  >{{ item.title }}</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div v-else v-loading="loading" class="page-thumbnail-panel-footer create">
      <el-button
        type="primary"
        size="small"
        @click="newPage"
        icon="el-icon-plus"
        >新建页面</el-button
      >
    </div>
  </div>
</template>
<script>
import editDataModel from "@/pages/editor/DataModel";
import { operationDataList } from "@/utils/commanJson";
import addCooperationer from "./add-cooperationer/index.js";
import { debounce } from "@/utils/loadsh";

export default {
  props: {
    pageTye: {
      type: String,
      default: "H5",
    },
    pageData: {
      type: Object,
      default: () => {},
    },
    showPublishState: {
      type: Boolean,
      default: true,
    },
    btnList: {
      type: Array,
      default: () => [],
    },
    showMoreBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      defaultImageCover: require("@/common/images/sign_bg.47eec442.png"),
      operationDataList: operationDataList,
    };
  },
  methods: {
    newPage: debounce(function () {
      const newPageData = editDataModel.getProjectConfig();
      this.loading = true;
      this.$api
        .createPage(newPageData)
        .then((res) => {
          this.loading = false;
          if (res.body) {
            this.$router.push({
              name: "Edit",
              query: { id: res.body._id, page: "newPage" },
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }, 200),
    preview(id) {
      this.$emit("showPreview", id);
    },
    command(type) {
      switch (type) {
        case "publish":
          this.publish();
          break;
        case "copyUrl":
          this.copyURL();
          break;
        case "setTemplate":
          this.setTemplate();
          break;
        case "viewPageData":
          this.viewPageData();
          break;
        case "cooperation":
          this.cooperation();
          break;
        case "delete":
          this.delete();
          break;
        case "unCooperation":
          this.unCooperation();
          break;
        case "publishTemplate":
          this.publishTemplate();
          break;
      }
    },
    //编辑
    edit() {
      this.$router.push({ name: "Edit", query: { id: this.pageData._id } });
    },
    // 复制页面
    copyPage() {
      this.loading = true;
      this.$api
        .copyPage({ id: this.pageData._id })
        .then(() => {
          this.loading = false;
          // this.$router.push({ name: "Editor", query: { id: res.body._id } });
          this.$emit("refresh");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    publish() {
      this.loading = true;
      this.$api
        .publish({ id: this.pageData._id })
        .then(() => {
          this.loading = false;
          this.$message.success("发布成功");
          this.preview(this.pageData._id);
          this.$emit("refresh");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    copyURL() {},
    setTemplate() {
      this.loading = false;
      this.$api
        .setTemplatePage({ id: this.pageData._id })
        .then(() => {
          this.loading = false;
          this.$message.success("已添加进我的模板");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    viewPageData() {
      this.$router.push({
        name: "pageDataDetail",
        query: { id: this.pageData._id },
      });
    },
    cooperation() {
      addCooperationer(this.pageData._id);
    },
    delete() {
      this.$alert("确认删除页面？删除后将无法访问此项目", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.deletePage({ id: this.pageData._id }).then(() => {
          this.$message.success("删除成功");
          this.$emit("refresh");
        });
      });
    },
    unCooperation() {
      this.$alert("确认退出协作编辑？退出后将无法编辑此项目", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api
          .deleteCooperation({
            pageId: this.pageData._id,
            userId: this.$store.state.user.userInfo._id,
          })
          .then(() => {
            this.$message.success("退出协作编辑成功");
            this.$emit("refresh");
          });
      });
    },
    publishTemplate() {
      this.loading = true;
      this.$api
        .publish({ id: this.pageData._id })
        .then(() => {
          this.loading = true;
          this.$message.success("发布成功");
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.page-thumbnail-panel {
  width: 230px;
  height: 296px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  position: relative;
  transition: all 0.3s ease-in-out 0s;
  box-shadow: 13px -3px 19px -10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 10px #ccc;
    transform: translate3d(0, -2px, 0);

    .header-mask {
      opacity: 1;
    }
  }

  .header-mask {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    border-radius: 4px 4px 0 0;
    padding-top: 92px;
    color: #f8f1f1;
    text-align: center;
    cursor: pointer;
    transition: top 0.28s ease-in-out, opacity 0.28s ease-in-out,
      height 0.28s ease-in-out;
  }

  .unpublish {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 12px;
    display: block;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    background-color: #cdd0d3;
    border-radius: 4px 0 12px 0;
  }
}
.thumbnail-panel-cover {
  flex: 1;
  position: relative;

  .image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 5px;
    z-index: 10;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.page-item-title {
  height: 36px;
  width: 100%;
  line-height: 36px;
  padding: 0 8px;
  // font-size: 16px;
  text-align: center;
  font-weight: bold;
}

.thumbnail-panel-btn {
  height: 36px;
  width: 100%;
  display: flex;
  flex-direction: row;

  .btn-wrapper {
    flex: 1;
    text-align: center;
  }
  .btn-wrapper-more {
    flex: 1;
    text-align: center;
    line-height: 36px;
  }
}
</style>