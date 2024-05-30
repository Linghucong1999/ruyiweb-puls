<template>
  <el-form-item label="图片列表">
    <div v-for="(item, index) in tempValue" :key="index">
      <imageSRC :url="item.url" @change="change" />
      <span class="image-select-btn">
        <i class="el-icon-circle-plus-outline"></i>
      </span>
      <span class="image-select-btn">
        <i class="el-icon-remove-outline"></i>
      </span>
    </div>
  </el-form-item>
</template>
<script>
import imageSRC from "@/components/image-select.vue";

export default {
  name: "attr-ruyi-imageSrcList",
  props: {
    imageSrcList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    imageSRC,
  },
  data() {
    return {
      tempValue: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const list = [];
      this.imageSrcList.forEach((item) => {
        list.push({ url: item });
      });
      this.tempValue = list;
    },
    change() {
      this.$emit("update:imageSrcList", this.getRequltImageSrcList);
    },
    getRequltImageSrcList() {
      const list = [];
      this.tempValue.forEach((item) => {
        list.push(item.url);
      });
      return list;
    },
  },
};
</script>
<style lang="less" scoped>
</style>