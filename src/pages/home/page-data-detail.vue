<template>
  <div class="page-data-detail">
    <notFundData></notFundData>
  </div>
</template>
<script>
import notFundData from "@/components/notFundData.vue";

export default {
  components: {
    notFundData,
  },
};
</script>
<style lang="less" scoped>
.page-data-detail {
  height: 100%;
}
</style>