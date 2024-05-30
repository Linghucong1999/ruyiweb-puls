<template>
  <div class="components-libs-wrapper scrollbar-wrapper">
    <p class="page-title text-center">组件库</p>
    <el-scrollbar style="height: 100%">
      <ul class="scrollbar-wrapper">
        <li v-for="(item, index) in componentsList" :key="index">
          <div class="components-libs-title">
            <el-tag type="success">{{ item.title }}</el-tag>
          </div>
          <div
            v-if="item.components && item.components.length"
            class="components-lib-Lists"
          >
            <div
              class="components-libs-item"
              v-for="(element, rowindex) in item.components"
              :key="rowindex"
              @click="handleClick(element)"
            >
              <div class="lib-item-img"><i :class="[element.icon]"></i></div>
              <div class="lib-item-title">{{ element.title }}</div>
            </div>
          </div>

          <div v-else>
            <!-- 组件未开发的就给予一个lottie动画 -->
            <div class="background-components-zero">
              <lottie :options="{ animationData: animation }"></lottie>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
import { camelCase } from "lodash";
import { elementConfig } from "@/utils/commanJson";
import bg from "@/assets/Model/bg.json";
import { ruyi_register_components_object } from "@/plugins/index";

window.ruyi_register_components_object = ruyi_register_components_object;
export default {
  data() {
    return {
      componentsList: elementConfig,
      animation: bg,
    };
  },
  methods: {
    handleClick(element) {
      const props = this.getComponentProps(element.elName);
      this.$store.dispatch("addElement", { ...element, needProps: props });
    },
    /**
     * 根据element获取组件默认的props实列
     */
    getComponentProps(elName) {
      let elComponentData;
      for (let key in ruyi_register_components_object) {
        if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
          elComponentData = ruyi_register_components_object[key];
          break;
        }
      }

      if (!elComponentData) return {};

      const props = {};
      for (let key in elComponentData.props) {
        props[key] = [Object, Array].includes(elComponentData.props[key].type)
          ? elComponentData.props[key].default()
          : elComponentData.props[key].default;
      }

      return props;
    },
  },
};
</script>
<style lang="less" scoped>
.components-libs-title {
  margin-bottom: 10px;
  text-align: center;
}
.components-lib-Lists {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.components-libs-item {
  color: #949292;
  text-align: center;
  // background: #e3e2e2;
  width: 120px;
  display: flex;
  // flex-direction: column;
  padding: 6px 6px;
  margin: 5px;
  border: 1px solid #e6e6e6;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #ecf5ff;
    border: 1px solid #ecf5ff;
    color: @primary;
  }

  .lib-item-title {
    text-align: center;
    margin-left: 5px;
    line-height: 18px;
  }
}

.background-components-zero {
  width: 200px;
  height: 200px;
}

::v-deep .el-tag.el-tag--success {
  width: 125px;
  text-align: center;
}

.components-libs-wrapper {
  user-select: none;
  height: 100%;
  & ul {
    padding: 10px;
  }

  .page-title {
    text-align: center;
    width: 100%;
  }
}
</style>