<template>
  <el-form-item label="图片">
    <ImageSRC :url.sync="tempValue" />
  </el-form-item>
</template>
<script>
import ImageSRC from "@/components/image-select.vue";

export default {
  name: "attr-ruyi-imageSrc",
  props: {
    imageSrc: String,
  },
  components: {
    ImageSRC,
  },
  data() {
    return {
      tempValue: "",
    };
  },
  mounted() {
    this.tempValue = this.imageSrc;
  },
  watch: {
    imageSrc(val) {
      this.tempValue = val;
    },
    tempValue() {
      this.$emit("update:imageSrc", this.tempValue);
    },
  },
};
</script>
<style lang="less" scoped>
</style>