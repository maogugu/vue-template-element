<template>
  <el-container class="h-100vh">
    <el-aside>
      <sider-menu />
    </el-aside>
    <el-container>
      <el-header class="bg-white p-x-16 flex-between-center border-b-1 border-color-e6e6e6">
        <span />
        <span>欢迎您，admin</span>
      </el-header>
      <el-main>
        <el-container class="m-24 bg-white">
          <router-view />
        </el-container>
      </el-main>
    </el-container>
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
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
