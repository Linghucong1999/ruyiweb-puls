<template>
  <div
    class="upload-psd-btn-wrapper"
    :class="{ 'allow-ipload': loading }"
    v-loading="loading"
  >
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-upload="beforeUpload"
      accept=".psd"
      :show-file-list="false"
    >
      <slot></slot>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    beforeUpload(file) {
      if (file.size > 30 * 1024 * 1024) {
        this.$message.error("文件大小不能超过30M");
        return false;
      }
      const name = file.name.split(".");
      const suffix = name[name.length - 1];
      if (!["psd"].includes(suffix)) {
        this.$message.error("请上传psd文件");
        return false;
      }
      this.uploadPsd(file);
      return false;
    },
    uploadPsd(file) {
      this.loading = true;
      const formData = new FormData();
      formData.append("file", file);
      this.$api
        .psdUplod(formData)
        .then((res) => {
          this.loading = false;
          this.$emit("upload-success", res.body || {});
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.upload-psd-btn-wrapper {
  display: inline-block;
}
.allow-upload {
  cursor: not-allowed;
}
</style>