<template>
  <div class="components-page-manage scrollbar-wrapper">
    <p class="page-title text-center">页面管理</p>
    <el-scrollbar style="height: 100%" class="components-main-conten">
      <div
        class="page-item-list clearfix"
        v-for="(item, index) in projectData.pages"
        :key="item.uuid"
        :class="{ active: activePageUUID === item.uuid }"
        @click="changeActivePage(item)"
      >
        <div class="page-item-small-list">
          <PageManageList :pageUUID="item.uuid" />
        </div>
        <div class="page-item">
          <div class="inline-block">
            <span class="page-item-index">{{ index + 1 }}</span>
            第{{ index + 1 }}页
          </div>
          <div class="page-item-btn-wrapper pull-right width20">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-more-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div class="btn-item" @click="copyPage(item)">
                    <i class="el-icon-document-copy"></i>复制页面
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="btn-item" @click="addPage(item)">
                    <i class="el-icon-document-add"></i>新增页面
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="btn-item" @click="deletePage(item)">
                    <i class="el-icon-delete"></i>删除页面
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
import PageManageList from "./page-manage-list/index.vue";

export default {
  data() {
    return {};
  },
  components: {
    PageManageList,
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
  },
  methods: {
    changeActivePage(page) {
      this.$store.dispatch("setActivePageUUID", page.uuid);
    },
    copyPage(page) {
      this.$store.dispatch("copyPage", page.uuid);
    },
    addPage(page) {
      this.$store.dispatch("addPage", page ? page.uuid : "");
    },
    deletePage(page) {
      this.$store.dispatch("deletePage", page.uuid);
    },
  },
};
</script>
<style lang="less" scoped>
.components-page-manage {
  height: 100%;
  position: relative;

  //   .page-title {
  //     position: absolute;
  //     top: 16px;
  //     left: 0;
  //     width: 100%;
  //   }
  .page-item-list {
    display: flex;
    flex-direction: column;
    &.active {
      background-color: #eee;
      color: #111;
      .page-item-index {
        background: @primary;
        color: white;
      }
    }

    .page-item-small-list {
      width: 100%;
      height: 260px;
      //   border: 2px solid #666666;
    }
  }
  .page-item {
    height: 70px;
    line-height: 70px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 1px solid #e6e6e6;
    background: white;
    color: #666666;
    padding: 0 10px;
    display: flex;
    & > .pull-right {
      width: 20px;
    }
    & > .inline-block {
      flex: 1;
    }
    &:hover {
      background-color: #eee;
      .page-item-btn-wrapper {
        display: block;
        opacity: 1;
      }
    }

    .page-item-index {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 12px;
      background-color: #ccc;
      color: #fff;
      margin-right: 8px;
    }

    .page-item-btn-wrapper {
      .btn-item {
        display: inline-block;
        padding: 4px 4px;
        font-size: 18px;
        transition: all 0.3s;
        &:hover {
          color: @primary;
          transform: scale(1.05);
        }
      }
    }
  }
}
</style>