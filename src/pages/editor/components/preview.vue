<template>
  <preview-wrapper :pageID="pageID" @closePreview="closePreview">
    <p class="page-title paddingL30">页面设置</p>
    <div class="preview-info-wrapper">
      <div class="page-info">
        <div class="page-cover">
          <image-cropper
            :pageID="pageID"
            :url.sync="localPageData.coverImage"
          />
        </div>
        <div class="page--title-des">
          <div class="info-form-wrapper">
            <div class="info-form-l">标题:</div>
            <div class="info-form-r">
              <el-input
                v-model="localPageData.title"
                :placeholder="pageData.title"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="info-form-wrapper">
            <div class="info-form-l">描述:</div>
            <div class="info-form-r">
              <el-input
                v-model="localPageData.description"
                :placeholder="pageData.description"
                type="textarea"
              ></el-input>
            </div>
          </div>
        </div>
      </div>

      <div class="info-form-wrapper">
        <div class="info-form-l">
          <el-checkbox v-model="localPageData.shareConfig.shareWx"
            >设置微信分享样式</el-checkbox
          >
        </div>
      </div>

      <!-- 微信分享样式 -->
      <div
        v-show="localPageData.shareConfig.shareWx"
        class="share-wx-config-wrapper marginB30"
      >
        <div class="info-form-r page-info">
          <div class="page-cover">
            <image-cropper :url.sync="localPageData.shareConfig.coverImage" />
          </div>
          <div class="page-title-des">
            <div class="info-form-wrapper">
              <div class="info-form-l">分享标题:</div>
              <div class="info-form-r">
                <el-input v-model="localPageData.shareConfig.title"></el-input>
              </div>
            </div>
            <div class="info-form-wrapper">
              <div class="info-form-l">分享描述:</div>
              <div class="info-form-r">
                <el-input
                  v-model="localPageData.shareConfig.description"
                  :rows="2"
                  type="textarea"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 翻页模式 -->
      <div class="info-form-wrapper">
        <div class="info-form-l com-width">翻页方式:</div>
        <div class="info-form-r">
          <el-select
            v-model="localPageData.flipType"
            :popper-append-to-body="false"
          >
            <el-option label="上下翻页" :value="0"></el-option>
            <el-option label="左右翻页" :value="1"></el-option>
            <el-option label="翻书效果" :value="2"></el-option>
          </el-select>
        </div>
      </div>

      <div class="info-form-wrapper">
        <div class="info-form-l com-width"></div>
        <div class="info-form-r">
          <el-checkbox v-model="localPageData.slideNumber"
            >显示页码</el-checkbox
          >
        </div>
      </div>

      <div class="info-form-wrapper">
        <div class="info-form-l com-width">作品访问状态:</div>
        <div class="info-form-r">
          <el-select
            v-model="localPageData.status"
            :popper-append-to-body="false"
          >
            <el-option label="允许访问" :value="1"></el-option>
            <el-option label="不允许访问" :value="0"></el-option>
          </el-select>
        </div>
      </div>

      <div class="foot-btn-wrapper">
        <el-button type="primary" @click="publishFn">保存并发布</el-button>
        <el-button @click="saveFn">保存</el-button>
        <el-button @click="closePreview">取消</el-button>
      </div>
    </div>
  </preview-wrapper>
</template>
<script>
import PreviewWrapper from "@/components/preview-wrapper.vue";
import imageCropper from "@/components/image-cropper.vue";

export default {
  props: {
    pageID: {
      type: String,
      require: true,
    },
    pageData: {
      type: Object,
      require: true,
    },
  },
  components: {
    PreviewWrapper,
    imageCropper,
  },
  computed: {
    localPageData: {
      get() {
        return this.pageData;
      },
      set() {
        this.$emit("update:pageData", this.pageData);
      },
    },
  },
  methods: {
    closePreview() {
      this.$emit("closePreview", false);
    },
    publishFn() {
      this.$emit("publishFn");
    },
    saveFn() {
      this.$emit("saveFn");
    },
  },
};
</script>
<style lang="less" scoped>
.preview-info-wrapper {
  padding: 30px 30px 60px;
}

.page-info {
  display: flex;
  .page-cover {
    width: 120px;
    height: 120px;
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

.foot-btn-wrapper {
  position: absolute;
  left: 0;
  bottom: 8px;
  height: 60px;
  padding: 8px 30px;
}

.share-wx-config-wrapper {
  margin-top: 14px;
  padding: 12px;
  background-color: #f0f3f4;
}
</style>