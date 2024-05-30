<template>
  <div class="ruyi-text">
    {{ text }}
  </div>
</template>
<script>
export default {
  name: "RuyiText",
  props: {
    text: {
      type: String,
      default: "这是一段文字",
    },
  },
  data() {
    return {
      defaultStyle: {
        height: 40,
      },
    };
  },
};
</script>
<style lang="less" scoped>
</style>