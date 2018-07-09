<template>
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
          <el-button type="text"
                     @click="message(scope.row)">移动分类</el-button>
          <el-button v-if = 'scope.row._level != 1'  type="text"
                     @click="message(scope.row)">参数管理</el-button>
          <el-button v-show = 'scope.row._level != 1' type="text"
                     @click="message(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'

export default {
  name: 'partsClassify',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      data: [{
        id: 1,
        event: '无源器件',
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
      },
      {
        id: 1,
        event: '有源器件',
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
  methods: {
    message(row) {
      console.log(row)
      this.$message.info(row.event)
    }
  }
}
</script>
<style scoped>
.el-button+.el-button{
  margin: 0px !important; 
}
</style>
