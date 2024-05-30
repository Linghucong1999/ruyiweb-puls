<template>
  <div class="ruyi-number-input">
    <el-input
      v-model="dataNumber"
      :placeholder="placeholderValue"
      type="number"
      size="small"
    ></el-input>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
import { Input as ElInput } from "element-ui";

export default {
  name: "RuyiNumberInput",
  components: {
    "el-input": ElInput,
  },
  props: {
    numberValue: {
      type: Number,
      default: 0,
    },
    numberTitle: {
      type: String,
      default: "数字输入框",
    },
    placeholderValue: {
      type: String,
      default: "请输入数字",
    },
  },
  data() {
    return {
      dataNumber: this.numberValue,
    };
  },
};
</script>
<style lang="less" scoped>
</style>