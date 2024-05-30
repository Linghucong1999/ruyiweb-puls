<template>
  <div class="page-home">
    <div class="home-side-bar">
      <el-menu default-active="/home/page-list" router>
        <el-menu-item index="/home/page-list">
          <i class="el-icon-s-home"></i>
          <span slot="title">我的作品</span>
        </el-menu-item>
        <el-menu-item index="/home/my-template">
          <i class="el-icon-document"></i>
          <span slot="title">我的模板</span>
        </el-menu-item>
        <el-menu-item index="/home/page-data">
          <i class="el-icon-date"></i>
          <span slot="title">我的数据</span>
        </el-menu-item>
        <el-menu-item index="/home/template-list">
          <i class="el-icon-s-shop"></i>
          <span slot="title">创意模板</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="my-page-list clearfix">
      <router-view class="sub-page"></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.page-home {
  display: flex;
  height: 100%;
//   background-color: #f0f2f5;
  margin-top: 8px;

  .home-side-bar {
    width: 200px;
    border-right: 1px solid #f3f2f2;
  }

  .my-page-list {
    flex: 1;
    height: 100%;
    .sub-page {
      height: 100%;
    }
  }
}
</style>