<template>
  <div class="ruyi-checkbox">
    <el-checkbox v-model="checked" :label="label" checked></el-checkbox>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
import { Checkbox } from "element-ui";
export default {
  name: "RuyiCheckbox",
  components: {
    "el-checkbox": Checkbox,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "复选框",
    },
  },
  data() {
    return {
      checked: false,
    };
  },
};
</script>