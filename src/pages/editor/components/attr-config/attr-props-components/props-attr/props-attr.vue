<template>
  <div v-if="currentElementProps.length">
    <div class="attr-title marginB10 fontBold">组件属性</div>
    <el-form>
      <component
        v-for="item in currentElementProps"
        :key="item"
        :is="'attr-ruyi-' + item"
        v-bind.sync="activeElement.propsValue"
      ></component>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import attrComponents from "./index";
export default {
  components: {
    ...attrComponents,
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
    ...mapGetters([
      "currentPageIndex",
      "activeElementIndex",
      "activePage",
      "activeElement",
    ]),
    currentElementProps() {
      if (!this.activeElement.propsValue) {
        return [];
      }
      let keyList = Object.keys(this.activeElement.propsValue);
      const editPropsComponentNameList = Object.keys(attrComponents);
      keyList = keyList.filter((key) => {
        return editPropsComponentNameList.includes("attr-ruyi-" + key);
      });
      return keyList;
    },
  },
};
</script>
<style lang="less" scoped>
</style>