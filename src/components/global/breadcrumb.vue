<template>
  <div class="c-breadcrumb-head-box-wraper">
    <div class="c-breadcrumb-head-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in route.meta.breadcrumb" :key="index" :to="{name: item.name}">{{ item.title }}</el-breadcrumb-item>
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
 * <breadcrumbHeader :route="$route"></breadcrumbHeader>
 * @param {Object} route
 */
export default {
  name: 'Breadcrumb',
  props: {
    route: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      breadList: [],
      query: this.$route.query
    }
  },
  watch: {
    route (n, o) {
      this.breadList = this.createBreadList(n)
    }
  },
  created () {
    console.log(this.route)
    console.log(this.route)
    console.log(this.route)
    this.breadList = this.createBreadList(this.route)
  },
  methods: {
    createBreadList (route) {
      const breadList = []
      route.matched.forEach((item, index) => {
        if (index > 1 && item.meta.title) {
          breadList.push({ name: item.name, title: item.meta.title, navhide: item.meta.navhide })
        }
      })
      return breadList
    },
    to (name, index) {
      if (index < this.breadList.length - 1) {
        this.$router.push({ name: name })
      }
    }
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
    .active {
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .tabs-list-wraper {
    padding: 0 32px;
    .ant-tabs-bar {
      margin: 0 !important;
      border-bottom: 1px solid #fff !important;
    }
  }
}
</style>
