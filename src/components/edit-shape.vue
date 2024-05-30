<template>
  <!-- 组件编辑外层拖拽，可编辑按钮，缩放改变盒子大小 -->
  <div
    class="commonents-edit-shape"
    :class="{ active: active }"
    @click="handleTopWrapperClick"
    @mousedown="handleMouseDown"
  >
    <div
      class="edit-shape-point"
      v-for="(item, index) in active ? pointList : []"
      :key="index"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint($event, item)"
    ></div>
    <slot></slot>
  </div>
</template>
<script>
import runAnimation from "@/common/js/runAnimations";
import Bus from "@/event/bus";
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    defaultStyle: {
      require: true,
      type: Object,
    },
    uuid: String,
  },
  data() {
    return {
      //l =left,t=top,r=right,b=bottom
      pointList: ["lt", "rt", "lb", "rb", "l", "r", "t", "b"],
      //上下左右对应东南西北
      directionKey: {
        t: "n",
        b: "s",
        l: "w",
        r: "e",
      },
    };
  },
  mounted() {
    this.animatePlaying = false;
    Bus.$on("RUN_ANIMATIONS", (uuid, animations) => {
      if (uuid !== this.uuid) return;

      // 正在执行的动画不允许插入新动画
      if (this.animatePlaying) return;

      let cssText = this.$el.style.cssText;
      this.animatePlaying = true;
      runAnimation(this.$el, animations, true, () => {
        this.$el.style.cssText = cssText;
        this.animatePlaying = false;
      });
    });
  },
  methods: {
    /**
     * 获取point计算后的样式
     * @param point
     * @return {{}}
     */
    getPointStyle(point) {
      const pos = this.defaultStyle;
      const height = pos.height;
      const width = pos.width;
      let hasT = /t/.test(point);
      let hasB = /b/.test(point);
      let hasL = /l/.test(point);
      let hasR = /r/.test(point);
      let newLeft = 0;
      let newTop = 0;
      if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
      } else {
        // 上下点，宽度固定在中间
        if (hasT || hasB) {
          newLeft = width / 2;
          newTop = hasT ? 0 : height;
        }
        // 左右点，高度固定在中间
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width;
          newTop = height / 2;
        }
      }

      const style = {
        marginLeft: hasL || hasR ? "-5px" : 0,
        marginTop: hasT || hasB ? "-5px" : 0,
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor:
          point
            .split("")
            .reverse()
            .map((m) => this.directionKey[m])
            .join("") + "-resize",
      };

      return style;
    },
    /**
     * 点击后设置选中的元素为当前活跃元素
     */
    handleTopWrapperClick(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    /**
     * 鼠标选中元素拖拽事件
     */
    handleMouseDown(e) {
      // 抛出事件让父组件设置当前元素选中状态
      this.$emit("handleElementClick");

      const pos = { ...this.defaultStyle };
      let startY = e.clientY;
      let startX = e.clientX;
      let startTop = pos.top;
      let startLeft = pos.left;
      let firstTime = new Date().getTime(),
        lastTime = "";
      const move = (moveEvent) => {
        // 移动的时候,不需要向后代元素传递事件,只需要单纯的移动就行
        moveEvent.stopPropagation();
        moveEvent.preventDefault();

        let currX = moveEvent.clientX;
        let currY = moveEvent.clientY;
        pos.top = currY - startY + startTop;
        pos.left = currX - startX + startLeft;
        this.$emit("resize", pos);
      };

      let up = () => {
        lastTime = new Date().getTime();
        if (lastTime - firstTime > 200) {
          this.$emit("resize");
        }

        document.removeEventListener("mousemove", move, true);
        document.removeEventListener("mouseup", up, true);
      };

      document.addEventListener("mousemove", move, true);
      document.addEventListener("mouseup", up, true);
      return true;
    },
    /**
     * 缩放事件
     * @param {*} event
     * @param {*} point
     */
    handleMouseDownOnPoint(event, point) {
      // 抛出事件让父组件设置当前元素选中状态
      this.$emit("handleElementClick");
      event.stopPropagation();
      event.preventDefault();

      const pos = { ...this.defaultStyle };
      let height = pos.height;
      let width = pos.width;
      let top = pos.top;
      let left = pos.left;
      let startX = event.clientX;
      let startY = event.clientY;
      let move = (moveEvent) => {
        let currX = moveEvent.clientX;
        let currY = moveEvent.clientY;
        let disY = currY - startY;
        let disX = currX - startX;
        let hasT = /t/.test(point),
          hasB = /b/.test(point),
          hasL = /l/.test(point),
          hasR = /r/.test(point);
        let newHeight = +height + (hasT ? -disY : hasB ? disY : 0);
        let newWidth = +width + (hasL ? -disX : hasR ? disX : 0);
        pos.height = newHeight > 0 ? newHeight : 0;
        pos.width = newWidth > 0 ? newWidth : 0;
        pos.left = +left + (hasL ? disX : 0);
        pos.top = +top + (hasT ? disY : 0);
        this.$emit("resize", pos);
      };

      let up = () => {
        this.$emit("resize");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
  },
};
</script>
<style lang="less" scoped>
.commonents-edit-shape {
  cursor: move;
  &.active {
    outline: 1px solid #67c23a;
  }
  &:hover {
    outline: 1px solid #67c23a;
  }
}

.edit-shape-point {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 1px solid #67c23a;
  border-radius: 10px;
  position: absolute;
}
</style>