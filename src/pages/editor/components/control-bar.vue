<template>
  <div class="components-contrl-bar">
    <div class="button-item scale-wrapper">
      <span class="scale-btn" @click="updateScale('reduce')">
        <i class="el-icon-zoom-out"></i>
      </span>

      <span class="scale-input"
        >{{ parseFloat(scaleValue * 100).toFixed() }}%</span
      >

      <span class="scale-btn" @click="updateScale('plus')">
        <i class="el-icon-zoom-in"></i>
      </span>
    </div>

    <div
      class="button-item"
      :class="{ disabled: !canUndo }"
      @click="editorUndo"
    >
      <i class="iconfont iconundo1"></i>
      <p>撤销</p>
    </div>
    <div
      class="button-item"
      :class="{ disabled: !canRedo }"
      @click="editorRedo"
    >
      <i class="iconfont iconredo1"></i>
      <p>重做</p>
    </div>
    <UploadPsd @upload-success="uploadSuccessPsd">
      <div class="button-item">
        <i class="iconfont iconps"></i>
        <p>导入PSD</p>
      </div>
    </UploadPsd>
    <div class="button-item" @click="showPreview">
      <i class="iconfont iconyulan"></i>
      <p>预览保存</p>
    </div>
    <div
      class="button-item"
      :class="{ disabled: canAllDelte }"
      @click="allDeleteElement"
    >
      <i class="iconfont iconiconset0335"></i>
      <p>清空页面</p>
    </div>
    <div class="button-item" @click="cancel">
      <i class="iconfont icontuichu"></i>
      <p>退出</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import UploadPsd from "@/components/upload-psd.vue";
export default {
  props: {
    scale: {
      type: Number,
      default: 1,
    },
  },
  components: {
    UploadPsd,
  },
  data() {
    return {
      scaleValue: 1, //画板缩放
    };
  },
  computed: {
    ...mapGetters(["canUndo", "canRedo", "canAllDelte"]),
  },
  created() {
    this.scaleValue = this.scale;
  },
  methods: {
    ...mapActions(["editorUndo", "editorRedo", "allDeleteElement"]),
    /**
     * 更新面板大小
     */
    updateScale(type, value) {
      if (type === "plus") {
        this.scaleValue =
          this.scaleValue + (value || 0.1) > 2
            ? 2
            : this.scaleValue + (value || 0.1);
      } else if (type === "reduce") {
        this.scaleValue =
          this.scaleValue - (value || 0.1) > 0.5
            ? this.scaleValue - (value || 0.1)
            : 0.5;
      } else if (type === "reset") {
        this.scaleValue = value || 1;
      }
      //告诉父组件更新scale值
      this.$emit("update:scale", this.scaleValue);
    },
    /**
     * 获取解析后的psd文件数据
     * @param {*} dataList
     */
    uploadSuccessPsd(dataList) {
      this.$emit("import-psd-data", dataList);
    },
    /**
     * 显示预览
     */
    showPreview() {
      this.$emit("showPreview");
    },
    /**
     * 退出编辑
     */
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
<style lang="less" scoped>
.components-contrl-bar {
  display: inline-block;
  z-index: 3;
  height: 30px;

  .button-item {
    display: inline-block;
    width: 68px;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    vertical-align: bottom;
    transition: color 0.28s transform 0.28s;
    user-select: none;
    &:hover {
      color: @primary;
      font-weight: bold;
    }

    & > i {
      font-size: 18px;
      display: inline-block;
      transition: all 0.28s;
    }
  }
  .scale-wrapper {
    width: 100px;
    margin-right: 10px;
    &:hover {
      color: inherit;
      transform: none;
    }
    & > .scale-btn {
      display: inline-block;
      vertical-align: middle;
      padding: 6px 2px;
      font-size: 20px;
      transition: all 0.28s;
      &:hover {
        color: @primary;
      }
    }
  }

  .disabled {
    cursor: not-allowed;
    pointer-events: none;
    color: @gray !important;
  }
}
</style>