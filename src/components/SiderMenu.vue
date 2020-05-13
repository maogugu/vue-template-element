<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo h-100p "
    :router="true"
  >
    <div class="logo bg-white m-16 h-32">
      <p class="lh-32 text-center text-red-45 fs-24">此处是logo</p>
    </div>
    <el-submenu index="base">
      <template slot="title">
        <i class="el-icon-location" />
        <span>全屏layout</span>
      </template>
      <el-menu-item index="/base/home">base_home</el-menu-item>
      <el-menu-item index="/base/home2">base_home2</el-menu-item>
      <el-menu-item index="/base/login">login</el-menu-item>
    </el-submenu>
    <el-submenu index="manager">
      <template slot="title">
        <i class="el-icon-location" />
        <span>管理平台layout</span>
      </template>
      <el-menu-item index="/manager/home">manager_home</el-menu-item>
      <el-menu-item index="/manager/home2">manager_home2</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: 'SiderMenu',
  methods: {

  }
}
</script>
<style scoped lang="scss">
</style>
