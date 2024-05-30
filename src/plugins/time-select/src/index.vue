<template>
  <div class="ruyi-time-select">
    <el-time-select
      v-model="valueTime"
      placeholder="选择时间"
      :picker-options="{
        start: `${startTime}`,
        step: `${stepTime}`,
        end: `${endTime}`,
      }"
    ></el-time-select>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
import { TimeSelect } from "element-ui";
export default {
  name: "RuyiTimeSelect",
  props: {
    time: {
      type: String,
      default: "",
    },
    startTime: {
      type: String,
      default: "08:30",
    },
    endTime: {
      type: String,
      default: "18:30",
    },
    stepTime: {
      type: String,
      default: "00:15",
    },
  },
  components: {
    "el-time-select": TimeSelect,
  },
  data() {
    return {
      valueTime: "",
    };
  },
};
</script>
<style lang="less" scoped>
</style>