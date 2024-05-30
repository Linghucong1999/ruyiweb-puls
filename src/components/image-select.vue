<template>
  <div class="image-select-wrapper">
    <div class="image-select-l">
      <div class="component-image-select" @click="handleClick">
        <img :src="url" alt="..." v-if="url" />
        <div class="image-preview-null" v-else>
          <p><i class="el-icon-plus"></i></p>
          <p>选择图片</p>
        </div>
      </div>
    </div>

    <div class="image-select-r">
      <el-input
        v-model="tempValue"
        placeholder="请输入图片地址"
        :rows="4"
        type="textarea"
      ></el-input>
    </div>
  </div>
</template>
<script>
import Bus from "@/event/bus";

export default {
  props: {
    url: String,
  },
  data() {
    return {
      selectId: +new Date(),
      tempValue: "",
    };
  },
  created() {
    Bus.$on("select-image", this.changeImage);
    this.tempValue = this.url;
  },
  watch: {
    url(val) {
      this.tempValue = val;
    },
    tempValue(val) {
      this.changeImage(this.selectId, val);
    },
  },
  methods: {
    changeImage(id, url) {
      if (id !== this.selectId) {
        return;
      }

      this.$emit("update:url", url);
      this.$emit("change", url);
    },
    handleClick() {
      Bus.$emit("show-select-image", this.selectId);
    },
  },
};
</script>
<style lang="less" scoped>
.image-select-wrapper {
  display: flex;
  .image-select-l {
    width: 108px;
  }
  .image-select-r {
    flex: 1;
  }
}

.component-image-select {
  display: flex;
  width: 100px;
  height: 100px;
  border: 1px dashed @primary;
  border-radius: 3px;
  margin-bottom: 18px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.28s;
  position: relative;
  background: #eee 50% / contain no-repeat;
  justify-content: center;
  align-items: center;

  &:hover {
    color: @primary;
  }
  img {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
  }
  p {
    padding-bottom: 10px;
  }
}

.image-preview-null {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 25px;
  background: rgba(0, 0, 0, 0.2);
}
</style>