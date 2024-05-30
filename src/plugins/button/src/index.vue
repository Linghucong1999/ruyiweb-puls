<template>
  <div>
    <el-button type="primary">{{ text }}</el-button>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
import { Button } from "element-ui";
export default {
  name: "RuyiButton",
  components: {
    "el-button": Button,
  },
  props: {
    text: {
      type: String,
      default: "按钮",
    },
  },
};
</script>