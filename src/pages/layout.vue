<template>
  <div class="page-layout">
    <div class="page-header-wrapper">
      <PageHeader />
    </div>
    <router-view class="sub-page"></router-view>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header.vue";
export default {
  components: {
    PageHeader,
  },
};
</script>

<style lang="less" scoped>
.page-layout {
  height: 100%;
  padding-top: 48px;
}
.sub-page {
  position: relative;
  height: 100%;
}
.page-header-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>