<template>
  <div class="gray paddingT30 text-center">
    <div style="font-weight: bold">请在画板上选择要编辑的元素</div>
    <div>
      <lottie :options="{ animationData: animation }"></lottie>
    </div>
  </div>
</template>
<script>
import directive from "@/assets/Model/no-direction.json";

export default {
  data() {
    return {
      animation: directive,
    };
  },
};
</script>
<style lang="less" scoped>
</style>