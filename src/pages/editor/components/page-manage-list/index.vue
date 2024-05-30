<template>
  <div class="editor-pane" ref="editorPane">
    <div class="editor-pane-inner">
      <div
        class="editor-main"
        :style="{
          transform: 'scale(' + scale + ')',
          width: projectData.width + 'px',
          height: projectData.height + 'px',
        }"
      >
        <div
          class="page-preview-wrapper"
          ref="canvas-panel"
          id="cancas-panel"
          :style="getCommonStyle(notActiveProjectData.commonStyle)"
        >
          <editShape
            v-for="item in notActiveProjectData.elements"
            :key="item.uuid"
            :uuid="item.uuid"
            :default-style="item.commonStyle"
            :style="
              getCommonStyle({
                width: item.commonStyle.width,
                height: item.commonStyle.height,
                left: item.commonStyle.left,
                top: item.commonStyle.top,
                position: item.commonStyle.position,
              })
            "
          >
            <component
              :is="item.elName"
              :style="
                getCommonStyle({
                  ...item.commonStyle,
                  top: 0,
                  left: 0,
                })
              "
              class="element-on-edit-pane"
              v-bind="item.propsValue"
            ></component>
          </editShape>
        </div>
        <div class="page-wrapper-mask"></div>
      </div>
    </div>
  </div>
</template>
  <script>
import editShape from "@/components/edit-shape.vue";
import { mapGetters, mapState } from "vuex";
import { ruyi_register_components_object } from "@/plugins/index";
import editorProjectConfig from "../../DataModel";
import { menuOptions } from "@/utils/commanJson";
export default {
  props: {
    scale: {
      type: Number,
      default: 0.4,
    },
    pageUUID: {
      type: String,
      default: "",
    },
  },
  components: {
    ...ruyi_register_components_object, // 批量注册组件
    editShape,
  },
  data() {
    return {
      getCommonStyle: null,
      menuOptions: menuOptions,
      notActiveProjectData: {},
    };
  },
  created() {
    if (this.pageUUID === "") {
      this.notActiveProjectData = {
        commonStyle: {},
        config: {},
      };
    } else {
      this.notActiveProjectData = this.filterPages.find((item) => {
        return item.uuid === this.pageUUID;
      });
    }
    this.getCommonStyle = editorProjectConfig.getCommonStyle;
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
    }),
    ...mapGetters([
      "activePage",
      "currentPageIndex",
      "activeElementIndex",
      "activeElement",
      "filterPages",
    ]),
  },
};
</script>
  <style lang="less" scoped>
.editor-pane {
  display: flex;
  justify-content: center;
}

.editor-pane-inner {
  .page-wrapper-mask {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}

.editor-main {
  border-radius: 4px;
  box-shadow: 0 3px 10px #dcdcdc;
  //   margin: 25px auto;
  position: relative;
  background: white;
  transform-origin: center top;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==");
}
.page-preview-wrapper {
  height: 100%;
  position: relative;
}
.element-on-edit-pane {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.page-wrapper-menu-operation {
  position: absolute;
  right: 0;
  top: 45px;
  width: 0;
  background-color: #dcdcdc;
  text-align: center;
  border-radius: 4px;
  display: none;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  opacity: 0;
  .menu-item {
    padding: 10px;
    cursor: pointer;
    &.i {
      font-size: 24px;
      line-height: 30px;
    }
  }
  &.active {
    display: inline-block;
    width: 58px;
    opacity: 1;
  }
}
</style>