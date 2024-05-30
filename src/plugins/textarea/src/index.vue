<template>
  <div class="ruyi-textarea">
    <el-input
      type="textarea"
      :placeholder="placeholder"
      v-model="inputText"
      :maxlength="maxLength"
      :minlength="minLength"
      show-word-limit
      autosize
      :rows="row"
    ></el-input>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
import { Input as ElInput } from "element-ui";
export default {
  name: "RuyiTextarea",
  props: {
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    text: {
      type: String,
      default: "",
    },
    maxLength: {
      type: Number,
      default: 120,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    row: {
      type: Number,
      default: 3,
    },
  },
  components: {
    "el-input": ElInput,
  },
  data() {
    return {
      inputText: this.text,
    };
  },
};
</script>
<style lang="less" scoped>
</style>