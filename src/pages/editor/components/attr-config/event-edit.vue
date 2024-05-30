<template>
  <div class="components-attr-edit">
    <el-scrollbar class="components-attr-edit">
      <div class="attr-edit-inner" v-if="activeElementUUID">
        <div class="animate-edit-btn-wrapper">
          <el-dropdown>
            <el-button type="primary" size="small"
              >添加事件<i class="el-icon-arrow-down el-icon-arrow-right"></i
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in eventTypeList"
                :key="index"
              >
                <div @click="addEvent(item.value)">{{ item.label }}</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p class="gray inline-block fontsize-12 marginL10">
            事件在编辑模式下无效果
          </p>
        </div>
        <div
          class="el-animate-list-wrapper paddingT20"
          v-show="activeElement.events.length"
        >
          <el-collapse accordion>
            <el-collapse-item
              v-for="(item, index) in activeElement.events"
              :key="index"
            >
              <template slot="title">
                <span class="el-animate-title-name">事件{{ index + 1 }}</span>
                <div class="el-animate-title-type-wrapper">
                  <span class="el-animate-title-type">{{
                    item.type | getLabelText(eventTypeList)
                  }}</span>
                </div>
                <span
                  class="el-animate-title-btn"
                  @click.stop.prevent="deleteEvent(index)"
                  ><i class="el-icon-delete"></i
                ></span>
              </template>
              <div class="el-animate-item">
                <div
                  class="attr-item-edit-wrapper"
                  v-show="item.type !== 'share'"
                >
                  <p class="attr-item-title">链接/接口 URL:</p>
                  <div class="col-1 attr-item-edit-input">
                    <el-input
                      v-model="item.url"
                      placeholder="请输入URL"
                      :rows="3"
                      type="textarea"
                    ></el-input>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div v-else>
        <ElNoneAnimation />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import directive from "@/assets/Model/no-direction.json";
import ElNoneAnimation from "@/components/el-none-animation.vue";

export default {
  components: {
    ElNoneAnimation,
  },
  data() {
    return {
      animation: directive,
      eventTypeList: [
        {
          label: "链接跳转",
          value: "link",
        },
        {
          label: "分享",
          value: "share",
        },
        {
          label: "表单提交",
          value: "submitForm",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
    ...mapGetters([
      "activePage",
      "currentPageIndex",
      "activeElementIndex",
      "activeElement",
    ]),
  },
  methods: {
    addEvent(type) {
      this.$store.dispatch("addElementEvent", type);
    },
    deleteEvent(index) {
      this.$store.dispatch("deleteElementEvent", index);
    },
  },
};
</script>

<style lang="less" scoped>
.components-attr-edit {
  height: 100%;
}

.attr-item-title {
  font-weight: bold;
}

.el-animate-list-wrapper {
  .el-animate-title-name {
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
    font-size: 14px;
    width: 55px;
  }
  .el-animate-title-type-wrapper {
    display: inline-block;
    width: 190px;
  }

  .el-animate-title-type {
    display: inline-block;
    vertical-align: middle;
    max-width: 140px;
    height: 24px;
    color: #606266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #f5f7fa;
    border-radius: 60px;
    padding: 4px 20px;
    border: none;
    cursor: pointer;
    margin: 0 20px 0 10px;
    line-height: 14px;
  }

  .el-animate-title-btn {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    height: 24px;
    line-height: 24px;
    width: 24px;
    cursor: pointer;
    border-radius: 4px;
    background: #f5f7fa;
    margin-left: 6px;
    &:hover {
      color: #f0f2f7;
      background: @primary;
    }
  }
}

.attr-item-edit-wrapper {
  padding-left: 4px;
  display: flex;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  .attr-item-title {
    text-align: left;
    width: 80px;
    font-size: 12px;
    line-height: 28px;
  }

  .attr-item-edit-input {
    text-align: left;
    flex: 1;
  }
}
</style>