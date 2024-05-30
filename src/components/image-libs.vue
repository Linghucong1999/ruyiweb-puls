<template>
  <el-dialog
    title="我的图片"
    class="components-image-libs-wrapper"
    :visible.sync="dialogVisible"
    width="600px"
  >
    <div class="components-image-libs">
      <div class="image-lib-side-bar"></div>
      <div class="image-lib-inner">
        <div class="image-lib-btn">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeUpload"
            accept=".jpg,.png,.gif"
            :show-file-list="false"
            :multiple="true"
          >
            <el-button type="primary" size="samll" slot="trigger"
              >点击上传</el-button
            >
            <span slot="tip" class="el-upload__tip marginL20"
              >自能上传jgp/png/gif文件，且不能超过2M</span
            >
          </el-upload>
        </div>
        <el-scrollbar
          class="image-list-wrapper scroll-wrapper"
          v-if="imageList.length"
        >
          <div
            v-for="(item, index) in imageList"
            :key="index"
            @click="handleImageClick(item.url)"
            class="image-itme"
          >
            <img :src="item.url" alt="..." />
          </div>
        </el-scrollbar>
        <div v-else>
          <elNoneAnimation />
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import Bus from "@/event/bus";
import elNoneAnimation from "./el-none-animation.vue";

export default {
  components: { elNoneAnimation },
  data() {
    return {
      dialogVisible: false,
      uploading: false,
      imageList: [],
      selectId: "",
      hasLoadData: false,
    };
  },
  created() {
    Bus.$on("show-select-image", (selectId) => {
      this.dialogVisible = true;
      this.selectId = selectId;
    });
  },
  watch: {
    dialogVisible(val) {
      if (val && !this.uploading) {
        this.getMyImages();
      }
    },
  },
  methods: {
    beforeUpload(file) {
      if (file.size > 1024 * 1024 * 2) {
        this.$message.error("图片大小不能超过2M");
        return false;
      }

      const name = file.name.split(".");
      const suffix = name[name.length - 1];
      if (!["jpg", "png", "gif"].includes(suffix)) {
        this.$message.error("只能上传jpg/png/gif文件");
        return false;
      }
      this.uploadImage(file);
      return false;
    },
    uploadImage(file) {
      const params = new FormData();
      params.append("file", file);
      this.uploading = true;
      this.$api
        .uploadImage(params)
        .then((res) => {
          this.uploading = false;
          // this.imageList.splice(0, 0, res.body);
          this.imageList.unshift(res.body);
        })
        .catch(() => {
          this.uploading = false;
        });
    },
    handleImageClick(url) {
      Bus.$emit("select-image", this.selectId, url);
      this.dialogVisible = false;
    },
    getMyImages() {
      this.$api.getMyImages().then((res) => {
        this.imageList = res.body || [];
      });
    },
  },
};
</script>
<style lang="less" scoped>
.image-list-wrapper {
  height: 400px;
  padding-top: 20px;

  .image-item {
    width: 150px;
    height: 120px;
    float: left;
    background: #eee 50% / contain no-repeat;
    cursor: pointer;
  }
}
</style>

