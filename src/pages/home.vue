<template>
  <div class="home p-24 w-100p">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人" />
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loadingTable"
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column v-for="item of cols" :key="item.id" v-bind="item" />
      <!--<el-table-column-->
      <!--prop="key"-->
      <!--label="日期"-->
      <!--width="180"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--prop="name"-->
      <!--label="日期"-->
      <!--width="180"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--prop="age"-->
      <!--label="姓名"-->
      <!--width="180"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--prop="address"-->
      <!--label="地址"-->
      <!--/>-->
    </el-table>
    <el-pagination
      class="text-right m-t-16"
      :current-page.sync="pages.pageNum"
      :page-sizes="[100, 200, 300, 400]"
      :page-size.sync="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="sizeChange"
      @current-change="getTableData"
    />
  </div>
</template>

<script>
import { uniqueId, random } from 'lodash-es'
import { loading, debounceFnStart } from '@/decorator'
import { getDictList } from '@/dicts'
import { uuid } from '../utils'

function mockData (pageSize) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Array(pageSize).fill(1).map(x => ({
        key: uniqueId(),
        name: 'John Brown',
        age: random(10, 50),
        address: uuid(),
        tags: ['nice', 'developer']
      })))
    }, 300)
  })
}

export default {
  name: 'Home',
  data () {
    return {
      pages: {
        pageSize: 10,
        pageNum: 1
      },
      formInline: {
        user: '',
        region: ''
      },
      cols: [{
        prop: 'name',
        label: '日期',
        width: '180'
      },
      {
        prop: 'age',
        label: '姓名'
      }
      ],
      loadingTable: false,
      tableData: []
      // pagination: paginTool(this.getTableData.bind(this))
    }
  },
  created () {
    console.log('获取字典', getDictList('type'))
    this.getTableData()
  },
  methods: {
      @debounceFnStart()
        @loading('loadingTable')
    async getTableData () {
      // const formValues = await this.form.validateFields()
      // const params = { ...formValues, ...this.pagination.getValues() }
      // console.log('传给后端的数据', JSON.stringify(params, null, '\t'))
      console.log(JSON.stringify(this.formInline, null, 4))
      console.log(JSON.stringify(this.pages, null, 2))

      this.tableData = await mockData(10)
      // this.pagination.setTotal(200)
    },
    resetTable () {
      this.form.resetFields()
      this.pagination.initData()
    },
    sizeChange () {
      this.pages.pageNum = 1
      this.getTableData()
    }
  }
}
</script>
