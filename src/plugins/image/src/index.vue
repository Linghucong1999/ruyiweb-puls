<template>
  <div class="ruyi-image">
    <img :src="imageSrc" alt="..." />
  </div>
</template>
<script>
export default {
  name: "RuyiImage",
  props: {
    imageSrc: {
      type: String,
      default: "https://static.zhihu.com/heifetz/assets/sign_bg.47eec442.png",
    },
  },
};
</script>
<style lang="less" scoped>
.ruyi-image {
  width: 100%;
  height: 100%;
}
img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>