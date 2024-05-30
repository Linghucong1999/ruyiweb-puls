<template>
  <div class="components-preview">
    <div class="setting-bg"></div>
    <div class="left-panel">
      <div
        class="iframe-wrapper"
        :style="{
          width: $config.canvasH5Width + 'px',
          height: $config.canvasH5Height + 'px',
        }"
      >
        <iframe
          :src="$config.baseURL + '/ruyi/view/' + pageID"
          frameborder="0"
          style="background-color: transparent; width: 100%; height: 100%"
        ></iframe>
      </div>
    </div>
    <div class="right-panel">
      <slot></slot>
    </div>
    <span class="close-btn" @click="closePreview">
      <i class="el-icon-close"></i>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    pageID: String,
  },
  methods: {
    closePreview() {
      this.$emit("closePreview", false);
    },
  },
};
</script>
<style lang="less" scoped>
.components-preview {
  // width: 100%;
}
.setting-bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}
.left-panel {
  position: fixed;
  top: 0;
  right: 640px;
  left: 0;
  bottom: 0;
  z-index: 10000;
  overflow: hidden;
  .iframe-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -185px;
    margin-top: -334px;
    background: white;
  }
}
.right-panel {
  position: fixed;
  width: 640px;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background-color: #fff;
  overflow-y: auto;
  color: #333;
}

.close-btn {
  position: fixed;
  right: 20px;
  top: 8px;
  font-size: 28px;
  color: #7f8593;
  transition: all 0.3s;
  z-index: 10001;
  cursor: pointer;
  &:hover {
    color: @primary;
  }
}
</style>