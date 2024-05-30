<template>
  <div class="components-image-cropper">
    <div class="inline-block cropper-res-img">
      <img :src="url || defaultCoverImage" />
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="beforeUpload"
        accept=".gif,.jpg,.jpeg,.png,.bmp"
        :show-file-list="false"
      >
        <el-button class="cropper-res-img-title" size="samll" slot="trigger"
          >点击上传</el-button
        >
      </el-upload>
    </div>

    <el-dialog
      title="图片裁剪"
      :visible.sync="dialogVisible"
      center
      width="400px"
    >
      <div class="cropper-wrapper">
        <VueCropper
          ref="cropper"
          :img="option.img"
          :outputType="option.outputType"
          :full="option.full"
          :canMove="option.canMove"
          :original="option.original"
          :canMoveBox="option.canMoveBox"
          :autoCrop="option.autoCrop"
          :fixedBox="option.fixedBox"
          :centerBox="option.centerBox"
          :infoTrue="option.info"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="small" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updataImage" size="small"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { blobToFile } from "@/utils/dataencryption";

export default {
  components: {
    VueCropper,
  },
  props: {
    url: String,
    pageID: String,
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      defaultCoverImage: require("@/common/images/2024-moving-forward-768-2.jpg"),
      option: {
        img: "",
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图
        outputType: "jpg",
        canMove: true, //上传图片是否可以移动
        original: false, //上传图片按照原始比例渲染
        canMoveBox: true, //截图框能否拖动
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 120,
        autoCropHeight: 120,
        fixedBox: false,
        centerBox: false,
        info: false, //裁剪框的大小信息
      },
    };
  },
  methods: {
    beforeUpload(file) {
      if (file.size > 4 * 1024 * 1024) {
        this.$message.error("上传图片大小不能超过4M");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data;
      };
      // 转换成base64
      reader.readAsDataURL(file);
      this.dialogVisible = true;
      return false;
    },
    updataImage() {
      this.loading = true;
      this.$refs.cropper.getCropBlob((data) => {
        const file = blobToFile(data);
        const params = new FormData();
        params.append("file", file);
        this.$api
          .uploadCommonImage(params, this.pageID)
          .then((res) => {
            this.loading = false;
            this.dialogVisible = false;
            this.$emit("updata-url", res.body.coverImage);
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.cropper-res-img {
  width: 100px;
  height: 100px;
  border: 1px dashed @primary;
  border-radius: 3px;
  margin-bottom: 18px;
  text-align: center;
  cursor: pointer;
  transition: all 0.28s;
  position: relative;
  background: #eee 50% / contain no-repeat;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    color: @primary;
  }
  .cropper-res-img-title {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80px;
    transform: translateY(-50%);
    transform: translateX(-50%);
    text-align: center;
    padding: 6px 8px;
    border-radius: 4px;
    color: @primary;
    background: transparent;
    transition: all 0.28s;
    border: none;
    &:hover {
      background: @primary;
      color: white;
    }
  }
  img {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
  }
}
.cropper-wrapper {
  height: 400px;
  z-index: 100003;
}
</style>