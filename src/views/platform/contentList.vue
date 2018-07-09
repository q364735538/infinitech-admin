<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button> -->
      <el-button class="filter-item" style="float:right;margin-left:10px;" @click="JumpRoute" type="info">内容分类</el-button>
      <el-button class="filter-item" style="float:right;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column width="110px" align="center" label="标题内容">
         <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.permissions_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.permissions_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('table.roleName')" prop="roleName">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog title="内容分类" :visible.sync="centerDialogVisible" fullscreen center>
      <span>
        <div class="app-container">
          <tree-table :data="data"
                      :evalFunc="func"
                      :evalArgs="args"
                      :expandAll="expandAll"
                      border>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" v-show = 'scope.row._level != 3'
                           @click="message(scope.row)">添加/修改</el-button>
                <el-button type="text" v-show = 'scope.row._level != 1'
                           @click="message(scope.row)">移动分类</el-button>
                <el-button type="text"
                           @click="message(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </tree-table>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList, fetchPv } from '@/api/article'
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/power'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'
export default {
  name: 'complexTable',
  components: { treeTable },
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      centerDialogVisible: false,
      temp: {
        id: undefined,
        name: '',
        permissions_name: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      func: treeToArray,
      expandAll: false,
      data: [{
        id: 1,
        event: '帮助',
        comment: '无',
        children: [
          {
            id: 2,
            event: '子分类',
            comment: '无',
            children: [
              {
                id: 3,
                event: '子分类',
                comment: '无'
              }
            ]
          },
          {
            id: 4,
            event: '子分类',
            comment: '无'
          }
        ]
      },
      {
        id: 1,
        event: '联系我们',
        comment: '无',
        children: [
          {
            id: 2,
            event: '电容',
            comment: '无',
            children: [
              {
                id: 3,
                event: '其他分类',
                comment: '无'
              }
            ]
          },
          {
            id: 4,
            event: '电阻',
            comment: '无'
          }
        ]
      }],
      args: [null, null, 'timeLine']
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    message(row) {
      console.log(row)
      this.$message.info(row.event)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    JumpRoute() {
      this.centerDialogVisible = true
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style scoped>
.el-button+.el-button{
  margin: 0px !important; 
}
</style>