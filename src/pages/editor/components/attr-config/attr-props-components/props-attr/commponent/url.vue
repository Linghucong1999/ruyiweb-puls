<template>
  <div>
    <el-form-item label="链接地址:">
      <el-input
        type="textarea"
        v-model="tempValue"
        :rows="3"
        placeholder="请输入URL链接"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: "attr-ruyi-url",
  props: {
    url: String,
  },
  data() {
    return {
      tempValue: "",
    };
  },
  mounted() {
    this.tempValue = this.url;
  },
  watch: {
    url(val) {
      this.tempValue = val;
    },
    tempValue() {
      this.$emit("update:url", this.tempValue);
    },
  },
};
</script>
<style lang="less" scoped>
</style>