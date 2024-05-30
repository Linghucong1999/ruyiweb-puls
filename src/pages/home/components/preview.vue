<template>
  <preview-wrapper
    :pageID="pageID"
    @closePreview="closePreview"
    v-loading="loading"
  >
    <p class="page-title paddingL30">页面预览</p>
    <div class="preview-info-wrapper" v-if="!loading">
      <el-form label-width="90px" label-position="left">
        <el-form-item label="页面二维码:">
          <QRCode :value="pageLink" :size="120" level="H" />
          <p v-if="!pageData.isPublish" class="gray fontsize-12 lineheight-18">
            为防范钓鱼安全风险，预览仅供开发使用，有效期50分钟。
          </p>
        </el-form-item>
        <el-form-item label="页面链接:">
          <div>
            <el-button type="primary" @click="doCopy">复制链接</el-button>
          </div>
          <div class="share-wx-config-wrapper">
            {{ $config.baseURL + "/ruyi/view/" + pageID }}
          </div>
        </el-form-item>
        <el-form-item label="页面状态:">
          <span :class="[pageData.isPublish ? 'primary' : 'orange']">{{
            pageData.isPublish ? "已发布" : "未发布"
          }}</span>
        </el-form-item>
      </el-form>

      <div class="page-info">
        <div class="page-cover">
          <img :src="shareData.coverImage || defaultCoverImage" alt="..." />
        </div>
        <div class="page-title-des paddingT10">
          <div class="info-form-wrapper">
            {{ shareData.title }}
          </div>
          <div class="info-form-wrapper ellipsis">
            {{ shareData.description }}
          </div>
        </div>
      </div>

      <div class="clearfix paddingT30 text-center">
        <a :href="pageLink" target="_blank">
          <el-button type="primary">打开链接</el-button>
        </a>
      </div>
    </div>
  </preview-wrapper>
</template>
<script>
import previewWrapper from "@/components/preview-wrapper.vue";
import QRCode from "qrcode.vue";

export default {
  components: {
    previewWrapper,
    QRCode,
  },
  props: {
    pageID: String,
  },
  data() {
    return {
      loading: true,
      defaultCoverImage: require("@/common/images/caishenye.png"),
      pageData: {},
    };
  },
  computed: {
    pageLink() {
      return this.$config.baseURL + "/ruyi/view/" + this.pageID;
    },
    shareData() {
      if (!this.pageData.shareConfig) {
        return {};
      }
      if (this.pageData.shareConfig.shareWx) {
        return {
          coverImage: this.pageData.shareConfig.coverImage,
          title: this.pageData.shareConfig.title,
          description: this.pageData.shareConfig.description,
        };
      } else {
        return {
          coverImage: this.pageData.coverImage,
          title: this.pageData.title,
          description: this.pageData.description,
        };
      }
    },
  },
  created() {
    this.getData();
  },
  methods: {
    closePreview() {
      this.$emit("closePreview", false);
    },
    getData() {
      this.loading = true;
      this.$api
        .getPageDetail({ pageId: this.pageID })
        .then((res) => {
          this.loading = false;
          this.pageData = res.body;
        })
        .catch(() => {
          this.loading = false;
          this.$message.error("获取页面数据失败");
        });
    },
    doCopy() {
      // 注册了Vue.use(VueClipboard);剪贴板,直接调用copyText就行
      this.$copyText(this.pageLink).then(() => {
        this.$message.success("复制成功");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.preview-info-wrapper {
  padding: 30px 30px 60px;
  font-size: 16px;
}

.page-info {
  display: flex;
  padding: 12px;
  background-color: #f0f3f4;
  .page-cover {
    width: 80px;
    height: 80px;
    overflow: hidden;
  }
  .page-title-des {
    padding-left: 20px;
    flex: 1;
  }
}
.info-form-wrapper {
  display: flex;
  padding-bottom: 16px;
  .info-form-l {
    line-height: 42px;
    &.com-width {
      width: 120px;
    }
  }
  .info-form-r {
    flex: 1;
    padding-left: 10px;
  }
}
.share-wx-config-wrapper {
  margin-top: 14px;
  padding: 12px;
  background-color: #f0f3f4;
}
</style>