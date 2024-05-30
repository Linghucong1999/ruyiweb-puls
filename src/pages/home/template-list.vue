<template>
  <div class="clearfix my-page-list">
    <div class="page-search-wrapper bg-white">
      <el-tabs v-model="searchParams.pageMode" @tab-click="handlePageModeClick">
        <el-tab-pane
          :name="item.value"
          :disabled="item.disabled"
          v-for="(item, index) in pageModeList"
          :key="index"
        >
          <div slot="label">
            <span class="nav-tabs-label">{{ item.label }}</span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="scroll-wrapper page-list-wrapper">
      <el-scrollbar style="height: 100%" v-if="pageList.length">
        <div class="page-content" v-loading="loading">
          <!--页面列表-->
          <div class="page-item-wrapper">
            <div
              class="page-item"
              v-for="(item, index) in pageList"
              :key="index"
            >
              <thumbnailPanel
                @refresh="getPageList"
                @showPreview="showPreviewFn"
                :pageData="item"
                :btnList="['useTemplate']"
                :showMoreBtn="false"
                :showPublishState="false"
                class="page-item-thumbnail"
              />
            </div>
          </div>
        </div>
      </el-scrollbar>
      <notFundData v-else class="not-data-wrappe-lottie" />
    </div>
    <!--预览-->
    <previewPage
      v-if="showPreview"
      :pageId="previewId"
      @closePreview="showPreview = false"
    ></previewPage>
  </div>
</template>

<script>
import notFundData from "@/components/notFundData.vue";
import thumbnailPanel from "@/components/thumbnail.vue";
import previewPage from "./components/preview-template.vue";
export default {
  components: {
    notFundData,
    thumbnailPanel,
    previewPage,
  },
  data() {
    return {
      loading: false,
      pageList: [],
      pageModeList: [],
      searchParams: {
        pageMode: "H5",
      },
      previewId: "",
      showPreview: false,
      dataList: "", // 页面总数据
      renderDelay: 50, // 延迟渲染时间
    };
  },
  created() {
    this.pageModeList = this.$config.pageModeList;
    this.getPageList();
  },
  methods: {
    /**
     * 切换页面类型
     * */
    handlePageModeClick(val) {
      this.searchParams.pageMode = val.name;
      this.getPageList();
    },
    //渲染数据
    async renderData(index) {
      if (index >= this.dataList.length) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, this.renderDelay));
      this.pageList.push(this.dataList[index]);
      await this.renderData(index + 1);
    },
    /**
     * 获取所有页面
     */
    getPageList() {
      this.$api.getPublishTemplates(this.searchParams).then((res) => {
        this.pageList = [];
        this.dataList = res.body || [];
        this.renderData(0);
      });
    },
    showPreviewFn(id) {
      this.previewId = id;
      this.showPreview = true;
    },
  },
};
</script>

<style lang="less" scoped>
.my-page-list {
  height: 100%;
}

.page-list-wrapper {
  height: 100%;
}

.my-page-nav-list {
  height: 40px;
  line-height: 40px;
  z-index: 2;
  margin-bottom: 20px;
  .my-page-nav-item {
    float: left;
    padding-right: 32px;
    text-align: center;
    cursor: pointer;
    &.active {
      color: @primary;
    }
    &:hover {
      color: @primary;
    }
  }
}

.full-input-w {
  width: 100%;
}

.nav-tabs-label {
  display: inline-block;
  padding: 0 16px;
  height: 60px;
  line-height: 60px;
}

.page-search-wrapper {
  padding: 0;
}

.page-item-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .page-item {
    float: left;
    margin-right: 20px;
    margin-bottom: 40px;
  }
}
::v-deep.el-tabs__header {
  margin: 0;
}
::v-deep.el-tabs__nav-wrap {
  padding: 0 30px;
}
</style>

