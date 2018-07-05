<template>
  <div>
    <el-col :xs="12"
            :sm="12"
            :lg="8">
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>热门器件</span>
        </div>
        <div v-for="o in 4"
             :key="o"
             class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </el-col>
    <el-col :xs="12"
            :sm="12"
            :lg="8">
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>热门方案</span>
        </div>
        <div v-for="o in 4"
             :key="o"
             class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </el-col>
    <el-col :xs="12"
            :sm="12"
            :lg="8">
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>热门成品</span>
        </div>
        <div v-for="o in 4"
             :key="o"
             class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { fetchList } from '@/api/transaction'

export default {
  data() {
    return {
      list: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
}
</style>