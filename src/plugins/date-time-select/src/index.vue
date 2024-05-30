<template>
  <div class="ruyi-date-time-select">
    <el-date-picker
      v-model="valueTime"
      placeholder="选择日期时间"
      type="datetime"
    ></el-date-picker>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
import { DatePicker } from "element-ui";
export default {
  name: "RuyiDateTimeSelect",
  components: {
    "el-date-picker": DatePicker,
  },
  props: {},
  data() {
    return {
      valueTime: "",
    };
  },
};
</script>
<style lang="less" scoped>
</style>