<template>
  <div class="clearfix my-page-list">
    <div class="page-search-wrapper bg-white">
      <el-tabs v-model="searchParams.pageMode" @tab-click="handlePageModeClick">
        <el-tab-pane
          v-for="(item, index) in pageModeList"
          :key="index"
          :name="item.value"
          :label="item.label"
          :disabled="item.disabled"
        ></el-tab-pane>
      </el-tabs>
    </div>

    <el-scrollbar class="page-list-wrapper scroll-wrapper" ref="scrollWrapper">
      <div class="page-content">
        <div class="my-page-nav-list">
          <div
            class="my-page-nav-item"
            @click="doSearch('my')"
            :class="{ active: searchParams.type === 'my' }"
          >
            我的作品({{ myCount }})
          </div>

          <div
            class="my-page-nav-item"
            @click="doSearch('cooperation')"
            :class="{ active: searchParams.type === 'cooperation' }"
          >
            协作作品({{ shareCount }})
          </div>
        </div>

        <div class="page-item-wrapper" v-loading="loading">
          <div class="page-item">
            <Thumbnail :page-tye="searchParams.pageMode" />
          </div>

          <div class="page-item-list">
            <div
              class="page-item"
              v-for="(item, index) in pageList"
              :key="index"
            >
              <Thumbnail
                @refresh="getAllPageList"
                :page-data="item"
                @showPreview="preview"
                :btn-list="operationBtnType(item.isPublish)"
                class="page-item-thumbnail"
              />
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <preview-page
      v-if="showPreview"
      :pageID="previewId"
      @closePreview="showPreview = false"
    ></preview-page>
  </div>
</template>
<script>
import Thumbnail from "@/components/thumbnail.vue";
import previewPage from "./components/preview.vue";

export default {
  components: { Thumbnail, previewPage },
  data() {
    return {
      loading: false,
      searchParams: {
        type: "my",
        pageMode: "H5",
      },
      pageModeList: [],
      myCount: 0,
      shareCount: 0,
      pageList: [],
      showPreview: false,
      previewId: "",
      dataList: [], // 页面总数据
      renderDelay: 50, // 渲染延迟时间
    };
  },
  created() {
    this.pageModeList = this.$config.pageModeList;
    this.getAllPageList();
  },
  methods: {
    // 渲染数据
    async renderData(index) {
      if (index >= this.dataList.length) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, this.renderDelay));
      this.pageList.push(this.dataList[index]);
      await this.renderData(index + 1);
    },
    handlePageModeClick(val) {
      this.searchParams.pageMode = val;
      this.getAllPageList();
    },
    doSearch(type) {
      this.searchParams.type = type;
      this.getAllPageList();
    },
    //获取所有页面
    getAllPageList() {
      this.$api
        .getAllPage(this.searchParams)
        .then((res) => {
          this.pageList = [];
          this.dataList = res.body.pages || [];
          this.myCount = res.body.myPageCount;
          this.shareCount = res.body.myCooperationPageCount;
          this.renderData(0);
        })
        .catch(() => {
          // console.log(err);
        });
    },
    //预览
    preview(id) {
      this.previewId = id;
      this.showPreview = true;
    },
    //按钮类型
    operationBtnType(isPublished) {
      const baseBtn = ["edit", "copyTemplate", "setTemplate"];
      if (this.searchParams.type === "my") {
        baseBtn.push("cooperation", "delete");
      } else if (this.searchParams.type === "cooperation") {
        baseBtn.push("unCooperation");
      }
      baseBtn.push(isPublished ? "copyUrl" : "publish", "viewPageData");

      return baseBtn;
    },
  },
};
</script>
<style lang="less" scoped>
.my-page-list {
  height: 100%;
}

.page-list-wrapper {
  height: calc(100% - 40px);
}

.my-page-nav-list {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  .my-page-nav-item {
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
.page-item-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.page-item {
  margin-right: 20px;
  margin-bottom: 20px;
}
.page-item-thumbnail {
  animation: thumbnail 0.3s ease-in-out;
}
@keyframes thumbnail {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>