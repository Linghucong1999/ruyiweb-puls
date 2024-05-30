<template>
  <div class="header">
    <img src="@/common/images/header-logo.png"/>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.header{
    height: 60px;
    background-color: #fff;
    line-height: 60px;
    box-shadow: 0px 5px 5px rgba(155, 155, 155, 0.2);
}
</style>