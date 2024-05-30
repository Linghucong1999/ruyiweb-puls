<template>
  <div class="components-page-header">
    <div class="page-header-inner">
      <div class="inline-block logo-wrapper">
        <img
          class="cursor-pointer"
          @click="goHome"
          src="../assets/icons/mcd-logo.svg"
        />
        <!-- <img class="cursor-pointer" @click="goHome" src="../common/images/ie-mcd-logo.png" /> -->
        <slot name="left-slot"></slot>
      </div>

      <div class="header-center-wrapper">
        <slot></slot>
      </div>

      <div class="user-wrapper">
        <slot name="right-slot"></slot>
        <userHeaderBtn />
      </div>
    </div>
  </div>
</template>
<script>
import userHeaderBtn from './user-header-btn.vue';

export default {
  components: {
    userHeaderBtn,
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
<style lang="less" scoped>
.components-page-header {
  box-shadow: 0 2px 3px 0 rgba(100, 100, 100, 0.06);

  .page-header-inner {
    display: flex;
    padding: 0 18px;

    .logo-wrapper {
      width: 360px;
      font-size: 18px;
      line-height: 48px;

      img {
        display: inline-block;
        height: 48px;
        vertical-align: middle;
      }

      span {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .header-center-wrapper {
      flex: 1;
      text-align: center;
    }
  }

}
</style>