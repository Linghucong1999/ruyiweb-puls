<template>
  <el-scrollbar class="compinents-attr-edit">
    <p class="page-title fontBold">当前页样式</p>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">背景颜色:</p>
      <div class="attr-item-edit-input no-top">
        <el-color-picker
          v-model="activePage.commonStyle.backgroundColor"
          :show-alpha="true"
          size="mini"
        ></el-color-picker>
      </div>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">背景图片:</p>
      <div class="attr-item-edit-input">
        <imageSelect
          :url.sync="activePage.commonStyle.backgroundImage"
        ></imageSelect>
      </div>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">背景图片布局:</p>
      <div class="attr-item-edit-input" style="margin-left: 10px;">
        <el-select
          v-model="activePage.commonStyle.backgroundRepeat"
          placeholder="背景图片布局"
          clearable
        >
          <el-option
            v-for="item in repeat"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import imageSelect from "@/components/image-select.vue";

export default {
  components: { imageSelect },
  data() {
    return {
      repeat: [
        {
          label: "不重复",
          value: "no-repeat",
        },
        {
          label: "平铺",
          value: "repeat",
        },
        {
          label: "水平平铺",
          value: "repeat-x",
        },
        {
          label: "重复",
          value: "",
        },
      ],
    };
  },
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
.compinents-attr-edit {
  height: 100%;
  //   font-size: 12px;
}

.attr-item-edit-wrapper {
  padding-left: 18px;
  display: flex;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  .attr-item-title {
    text-align: left;
    min-width: 60px;
    font-size: 12px;
    line-height: 24px;
  }
}
</style>