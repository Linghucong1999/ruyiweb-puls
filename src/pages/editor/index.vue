<template>
  <div class="page-editor editor-wrapper" v-loading="loading">
    <!-- 左侧导航栏 -->
    <div class="editor-side-bar border-R">
      <el-tabs tab-position="left" v-model="activeSideBar" style="height: 100%">
        <el-tab-pane
          v-for="(item, index) in sideBarMenus"
          :key="index"
          :name="item.value"
        >
          <el-tooltip
            slot="label"
            class="item"
            effect="dark"
            :content="item.label"
            placement="right"
          >
            <i :class="item.elementUiIcon"></i>
          </el-tooltip>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 组件/页面/模板 -->
    <div class="editor-page-edit-wrapper">
      <component-libs v-if="activeSideBar === 'componentLibs'"></component-libs>
      <PageManage v-else-if="activeSideBar === 'pageManage'"></PageManage>
    </div>

    <!-- 页面编辑区域 -->
    <div class="editor-main">
      <div class="control-bar-wrapper">
        <cantrol-bar
          :scale.sync="canvasConfig.scale"
          @import-psd-data="importPsdData"
          @showPreview="showPreview"
          @cancel="cancel"
        ></cantrol-bar>
      </div>
      <editor-pan :scale.sync="canvasConfig.scale"></editor-pan>
    </div>

    <div class="el-attr-edit-wrapper scrollbar-wrapper">
      <el-tabs v-model="activeAttr" stretch>
        <el-tab-pane label="属性" name="属性">
          <attr-edit></attr-edit>
        </el-tab-pane>
        <el-tab-pane label="事件" name="事件">
          <EventEdit></EventEdit>
        </el-tab-pane>
        <el-tab-pane label="动画" name="动画">
          <AnimationEdit />
        </el-tab-pane>
        <el-tab-pane label="JavaScript" name="JavaScript">
          <ScriptEdit />
        </el-tab-pane>
        <el-tab-pane label="页面设置" name="页面设置">
          <PageAttrEdit />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 预览 -->
    <PreviewPage
      v-if="showPreviewComponents"
      :page-data.sync="projectData"
      :pageID="id"
      @closePreview="showPreviewComponents = false"
      @publishFn="publishFn"
      @saveFn="showPreview"
    />

    <!-- 图片 -->
    <ImageLibs />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { sideBarMenus } from "@/utils/commanJson";
import ComponentLibs from "./components/component-libs/index.vue";
import PageManage from "./components/page-manage.vue";
import CantrolBar from "./components/control-bar.vue";
import EditorPan from "./components/editor-panel/index.vue";
import EventEdit from "./components/attr-config/event-edit.vue";
import AnimationEdit from "./components/attr-config/animation-edit.vue";
import ScriptEdit from "./components/attr-config/script-edit.vue";
import PageAttrEdit from "./components/attr-config/page-attr-edit.vue";
import ImageLibs from "@/components/image-libs.vue";
import PreviewPage from "./components/preview.vue";

// 右边页面设置属性组件
import AttrEdit from "./components/attr-config/attr-edit.vue";
export default {
  components: {
    ComponentLibs,
    CantrolBar,
    EditorPan,
    AttrEdit,
    EventEdit,
    AnimationEdit,
    ScriptEdit,
    PageAttrEdit,
    ImageLibs,
    PageManage,
    PreviewPage,
  },
  data() {
    return {
      id: "",
      loading: false,
      activeSideBar: "componentLibs",
      sideBarMenus: sideBarMenus,
      canvasConfig: {
        scale: 1,
      },
      showPreviewComponents: false,
      activeAttr: "属性",
    };
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
  },
  created() {
    this.id = this.$route.query.id;
    if (this.$route.query.page === "newPage") {
      this.$store.dispatch("setProjectData");
    } else {
      this.initPage();
    }
  },
  methods: {
    // 初始化页面数据
    initPage() {
      this.loading = true;
      this.$api
        .getPageDetail({ pageId: this.id })
        .then((res) => {
          this.loading = false;
          this.$store.dispatch("setProjectData", res.body);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * 导入的psd文件数据
     * @param {*} psdData
     */
    importPsdData(psdData) {
      const elementsList = psdData.elements;
      const psdWidth = psdData.document.document.width;
      const scalingRatio = this.projectData.width / psdWidth;
      elementsList.forEach((element) => {
        const { width, height, top, left, imageSrc, opacity, zIndex } = element;
        setTimeout(() => {
          this.$store.dispatch("addElement", {
            elName: "ruyi-image",
            defaultStyle: {
              width: width * scalingRatio,
              height: height * scalingRatio,
              left: left * scalingRatio,
              top: top * scalingRatio,
              opacity: opacity,
              zIndex: zIndex,
            },
            needProps: {
              imageSrc,
            },
          });
        }, 10);
      });
    },
    showPreview() {
      this.$api
        .updatedPage({ pageData: this.projectData })
        .then(() => {
          this.$message.success("数据更新成功");
          this.showPreviewComponents = true;
        })
        .catch(() => {});
    },
    cancel() {
      this.$confirm("是否退出当前项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    },
    async publishFn() {
      const data = { ...this.projectData };
      data.isPublish = true;
      this.$api.updatedPage({ pageData: data }).then(() => {
        this.$message.success("发布成功");
        this.showPreviewComponents = false;
        this.$router.push({ name: "pageList" });
      }).catch(()=>{
        this.$message.error("发布失败");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.editor-wrapper {
  display: flex;
  height: 100%;
  position: relative;
  margin-top: 20px;

  .editor-side-bar {
    width: 55px;
  }
  .editor-main {
    flex: 1;
    position: relative;
  }
}

.editor-page-edit-wrapper {
  width: 210px;
  padding: 0 1px;
}

.control-bar-wrapper {
  position: absolute;
  top: -55px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 1000;
}

.el-attr-edit-wrapper {
  width: 390px;
  padding: 0;
  margin: 0 10px;
}
::v-deep .el-attr-edit-wrapper {
  .el-tabs {
    height: 100%;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 10px;
  }
  .el-tabs__content {
    height: calc(100% - 55px);
    & > div {
      height: 100%;
    }
    .attr-edit-inner {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
}
</style>