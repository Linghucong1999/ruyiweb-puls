<template>
  <div>
    <el-form-item label="资源地址:">
      <el-input
        v-model="tempValue"
        placeholder="资源地址URL"
        :rows="3"
        type="textarea"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: "attr-ruyi-musicSrc",
  props: {
    musicSrc: String,
  },
  data() {
    return {
      tempValue: "",
    };
  },
  mounted() {
    this.tempValue = this.musicSrc;
  },
  watch: {
    musicSrc(val) {
      this.tempValue = val;
    },
    tempValue() {
      this.$emit("update:musicSrc", this.tempValue);
    },
  },
};
</script>
<style lang="less" scoped>
</style>