<template>
  <div class="ruyi-image-carsousel">
    <Swiper
      class="image-carsousel-swiper"
      v-if="imageSrcList.length > 0"
      :autoPlay="true"
      :showIndicator="true"
      :interval="interval"
      duration="500"
    >
      <Slide
        class="image-carsousel-slide"
        v-for="(item, index) in imageSrcList"
        :key="index"
      >
        <img class="image-carsousel-image" :src="item" alt="..." />
      </Slide>
    </Swiper>
  </div>
</template>
<script>
import { Swiper, Slide } from "vue-swiper-component";
export default {
  name: "RuyiImageCarousel",
  components: {
    Swiper,
    Slide,
  },
  props: {
    imageSrcList: {
      type: Array,
      default: () => {
        return [
          "https://th.wallhaven.cc/small/l8/l8vp7y.jpg",
          "https://th.wallhaven.cc/small/l8/l8v3ey.jpg",
          "https://th.wallhaven.cc/small/we/werowr.jpg",
        ];
      },
    },
    interval: {
      type: Number,
      default: 2500,
    },
  },
};
</script>
<style lang="less" scoped>
.image-carsousel-swiper,
.image-carsousel-slide,
.image-carsousel-image {
  display: block;
  width: 100%;
  height: 100%;
}
.image-carsousel-swiper .wh_swiper {
  height: 100%;
}
</style>