<template>
  <div>
    <el-form-item label="文本内容:">
      <el-input
        v-model="tempText"
        placeholder="请输入文本内容"
        :rows="2"
        type="textarea"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: "attr-ruyi-text",
  props: {
    text: String,
  },
  data() {
    return {
      tempText: "",
    };
  },
  mounted() {
    this.tempText = this.text;
  },
  watch: {
    text() {
      this.tempText = this.text;
    },
    tempText() {
      this.$emit("update:text", this.tempText);
    },
  },
};
</script>
<style lang="less" scoped>
</style>