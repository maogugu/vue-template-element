<template>
  <div class="c-breadcrumb-head-box-wraper">
    <div class="c-breadcrumb-head-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in $route.meta.breadcrumb" :key="index" :to="{name: item.name}">{{ item.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <p>
        {{ route.meta.title }}
      </p>
    </div>
  </div>
</template>

<script>

/**
 * 右侧头部面包屑导航
 * <breadcrumb :route="$route"></breadcrumb>
 * @param {Object} route
 */
export default {
  name: 'Breadcrumb',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {

  }
}
</script>
<style  scoped lang="scss">
.c-breadcrumb-head-box-wraper {
  background-color: #fff;
  border-top:1px solid #e6e6e6;
  box-shadow:0px 6px 6px 0px rgba(0,0,0,0.08);
  position: relative;
  z-index: 10;
  .c-breadcrumb-head-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 98px;
    padding: 16px 32px;
    p {
      margin-top: 16px;
      font-size: 20px;
      font-weight: 600;
      color: #000000d9;
    }
  }
}
</style>
