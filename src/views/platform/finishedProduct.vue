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
                     @click="message(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'

export default {
  name: 'finishedProduct',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      data: [{
        id: 1,
        event: '3C数码',
        timeLine: 100,
        comment: '无',
        children: [
          {
            id: 2,
            event: '电容',
            timeLine: 10,
            comment: '无',
            children: [
              {
                id: 3,
                event: '其他分类',
                timeLine: 10,
                comment: '无'
              }
            ]
          },
          {
            id: 4,
            event: '三极管',
            timeLine: 10,
            comment: '无',
            children: [
              {
                id: 5,
                event: '其他分类',
                timeLine: 10,
                comment: '无'
              }
            ]
          },
          {
            id: 6,
            event: '电阻',
            timeLine: 90,
            comment: '无'
          }
        ]
      },
      {
        id: 7,
        event: '其他分类',
        timeLine: 100,
        comment: '无',
        children: [
          {
            id: 8,
            event: '电容',
            timeLine: 10,
            comment: '无',
            children: [
              {
                id: 9,
                event: '其他分类',
                timeLine: 10,
                comment: '无'
              }
            ]
          },
          {
            id: 3,
            event: '电阻',
            timeLine: 90,
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
