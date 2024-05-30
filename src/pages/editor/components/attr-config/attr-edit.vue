<template>
  <el-scrollbar class="components-attr-edit">
    <div class="attr-edit-inner" v-if="activeElementUUID">
      <div class="props-attr-style">
        <PropsAttr />
      </div>
      <div class="common-attr-style">
        <base-attr></base-attr>
      </div>
    </div>
    <div v-else>
      <ElNoneAnimation />
    </div>
  </el-scrollbar>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import BaseAttr from "./attr-props-components/base-attr.vue";
import ElNoneAnimation from "@/components/el-none-animation.vue";
import PropsAttr from "./attr-props-components/props-attr/props-attr.vue";

export default {
  data() {
    return {};
  },
  components: {
    BaseAttr,
    ElNoneAnimation,
    PropsAttr,
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
    ...mapGetters(["currentPageIndex", "activeElementIndex"]),
  },
};
</script>
<style lang="less" scoped>
.components-attr-edit {
  height: 100%;
}
:v-deep .el-form-item {
  margin-bottom: 0;
}
</style>