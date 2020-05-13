<template>
  <div class="home p-24">
    <!--<a-form-->
    <!--layout="inline"-->
    <!--class="searchForm m-b-16"-->
    <!--:form="form"-->
    <!--&gt;-->
    <!--<a-form-item label="搜索1" colon class="m-b-16">-->
    <!--<a-input v-decorator="formRules.ss1" placeholder="请输入" class="w-17vw" />-->
    <!--</a-form-item>-->
    <!--<a-form-item label="搜索2" colon class="m-b-16">-->
    <!--<a-input v-decorator="formRules.ss2" placeholder="请输入" class="w-17vw" />-->
    <!--</a-form-item>-->
    <!--<a-form-item label="搜索3" colon class="m-b-16">-->
    <!--<a-input v-decorator="formRules.ss3" placeholder="请输入" class="w-17vw" />-->
    <!--</a-form-item>-->
    <!--<a-form-item label="搜索4" colon class="m-b-16">-->
    <!--<a-input v-decorator="formRules.ss4" placeholder="请输入" class="w-17vw" />-->
    <!--</a-form-item>-->
    <!--<a-form-item label="搜索5" colon class="m-b-16">-->
    <!--<a-date-picker v-decorator="formRules.ss5" class="w-100p" />-->
    <!--</a-form-item>-->
    <!--<a-form-item>-->
    <!--<a-button type="primary" :loading="loadingTable" @click="getTableData">-->
    <!--查 询-->
    <!--</a-button>-->
    <!--<a-button :loading="loadingTable" @click="resetTable">-->
    <!--重 置-->
    <!--</a-button>-->
    <!--</a-form-item>-->
    <!--</a-form>-->
    <!--<a-table-->
    <!--:columns="columns"-->
    <!--:data-source="tableData"-->
    <!--:loading="loadingTable"-->
    <!--:pagination="pagination"-->
    <!--@change="change"-->
    <!--/>-->
  </div>
</template>

<script>
import { uniqueId, random } from 'lodash-es'
import { loading, debounceFnStart } from '@/decorator'
import { getDictList } from '@/dicts'
import { uuid } from '../utils'

function mockData ({ pageSize }) {
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
      // form: this.$form.createForm(this),
      // formRules: mapDecorator([
      //   ['ss1'],
      //   ['ss2'],
      //   ['ss3'],
      //   ['ss4'],
      //   ['ss5']
      // ]),
      loadingTable: false,
      columns: [{ title: 'name', dataIndex: 'name', key: 'name', sorter: true }, { title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Address', dataIndex: 'address', key: 'address' }, { title: 'Tags', key: 'tags', dataIndex: 'tags' }],
      tableData: []
      // pagination: paginTool(this.getTableData.bind(this))
    }
  },
  created () {
    console.log('获取字典', getDictList('type'))
  },
  methods: {
    @debounceFnStart()
    @loading('loadingTable')
    async getTableData () {
      const formValues = await this.form.validateFields()
      const params = { ...formValues, ...this.pagination.getValues() }
      console.log('传给后端的数据', JSON.stringify(params, null, '\t'))
      this.tableData = await mockData(params)
      this.pagination.setTotal(200)
    },
    resetTable () {
      this.form.resetFields()
      this.pagination.initData()
    },
    change (...args) { this.pagination.change(...args) }
  }
}
</script>
