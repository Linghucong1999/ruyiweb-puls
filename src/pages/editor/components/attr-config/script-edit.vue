<template>
  <div class="components-script-edit">
    <p class="page-title fontBold">脚本编辑</p>
    <p class="gray paddingL10 fontsize-12">JavaScript脚本再编辑模式下无效果</p>
    <div class="paddingT20">
      <el-input
        v-model="projectData.script"
        placeholder="请输入代码"
        type="textarea"
        :rows="20"
      ></el-input>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
    ...mapGetters([
      "activePage",
      "currentPageIndex",
      "activeElementIndex",
      "activeElement",
    ]),
  },
};
</script>
<style lang="less" scoped>
</style>