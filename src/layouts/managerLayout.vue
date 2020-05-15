<template>
  <el-container class="h-100vh">
    <el-aside :width="collapsed?'64px':'240px'">
      <sider-menu :is-collapse="collapsed" />
    </el-aside>
    <el-main class="p-0">
      <el-header class="bg-white p-x-16 flex-between-center">
        <i
          class="fs-18 p-x-24 cursor-pointer text-hover-blue"
          :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="toggleCollapsed"
        />
        <span>欢迎您，admin</span>
      </el-header>
      <breadcrumb />
      <el-main class="bg-f0f2f5">
        <el-container class="bg-white">
          <router-view />
        </el-container>
      </el-main>
    </el-main>
  </el-container>
</template>
<script>
import SiderMenu from '@/components/SiderMenu'

export default {
  name: 'BaseLayout',
  components: {
    SiderMenu
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="scss" scoped>
/*.el-aside,.el-menu{*/
  /*transition: width .4s*/
/*}*/
</style>
