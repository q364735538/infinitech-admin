<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column align="center" label="型号" width="150">
        <template slot-scope="scope">
          <span class="link-type" @click="productIofn(scope.row.id)">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="厂商">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="商品类型">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="来源">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="平台有无货" width="95">
        <template slot-scope="scope">
          有
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="130" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="产品信息" :visible.sync="centerDialogVisible" fullscreen center>
      <span>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="产品详情" name="first">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label-width="150px" label="名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="图片">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="form.dialogImageUrl" alt="">
                  </el-dialog>
                  <div class="el-upload__tip">请上传不大于1M图片，必须是.jpg、gif类型</div>
                </el-form-item>
                <el-form-item label-width="150px" label="datasheet(数据表)">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange"
                    :file-list="form.fileList3">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
                <div v-for="( item, index ) in form.input" :key="index">
                  <el-form-item label-width="150px" :label="item.name">
                    <el-input v-model="item.value"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label-width="150px" label="产地">
                  <span>{{form.sources}}</span>
                </el-form-item>
                <el-form-item label-width="150px" label="上市时间">
                  <span>{{form.time}}</span>
                </el-form-item>
                <el-form-item label-width="150px" label="平台有无货">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="有货"></el-radio>
                    <el-radio label="无货"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="描述">
                  <tinymce :height="300" v-model="form.content"></tinymce>
                </el-form-item>
                <el-form-item style="text-align:center">
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="供应商" name="second">
              <el-table :data="list" v-loading="listLoading"  fit highlight-current-row
                style="width: 100%;min-height:1000px;">
                <el-table-column align="center" label="供应商">
                  <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                  </template>
                </el-table-column>
                <el-table-column  align="center" label="库存">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="市场价格">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="批号">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="联系方式">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="视频" name="third">
              <el-row :gutter="12">
                <el-col v-for="(item, index) in videos" :key="index" :xs="24" :sm="12" :lg="8">
                  <div class="chart-wrapper" style="width:320px; height:240px">
                    <video width="320" height="240" controls style="background:#000">
                      <source :src=item.url  type="video/ogg">
                      您的浏览器不支持 HTML5 video 标签。
                    </video>
                    <div>
                      <p>{{item.name}}<span class="link-type" :class= 'item.id ? "colorRed" : ""' @click="mainVideo(item.id)" style="float:right">{{item.id ?"主视频":"设为主视频"}}</span></p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="参考设计" name="fourth">
              <div v-for="(item, index) in info" :key="index" style="border-bottom:1px solid #999" >
                <ul style="padding:0;">
                  <ol>
                    <div>
                    <h3 style="color:#579FEB"><span style="display:inline-block;width:10px;height:10px;margin-right:5px;background-color:#ccc;border-radius:50%;"></span>{{item.title}} <i :class="item.hot?'hot':''"></i></h3>
                      <p ref="contentHeight" style="margin-left:15px;text-indent:2em;">{{item.content}}{{reversedMessage}}<span style="width:200px;">+展开更多</span></p>
                      <div style="margin-left:15px;text-indent:1em;">关键元器件型号: <div style="color:#459BE2;display:inline-block;margin-right:20px" v-for="(li, i) in item.list" :key="i">{{li}}</div></div>
                    </div>
                  </ol>
                </ul>
              </div>
              <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="应用支持" name="fourth1">定时任务补偿</el-tab-pane>
            <el-tab-pane label="pin to pin" name="fourth2">定时任务补偿</el-tab-pane>
          </el-tabs>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import Tinymce from '@/components/Tinymce'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'productManagement',
  directives: {
    waves
  },
  components: {
    Tinymce
  },
  computed: {
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return function (){
        console.log(this.$refs.contentHeight)
      }
    }
  },
  mounted() {
  },
  data() {
    return {
      videos: [{
        url: 'http://www.runoob.com/try/demo_source/movie.mp4',
        name: '熊大吃鱼',
        id: 1
      }, {
        url: 'http://www.runoob.com/try/demo_source/movie.mp4',
        name: '熊大吃鱼',
        id: 0
      }, {
        url: 'http://www.runoob.com/try/demo_source/movie.mp4',
        name: '熊大吃鱼',
        id: 0
      }, {
        url: 'http://www.runoob.com/try/demo_source/movie.mp4',
        name: '熊大吃鱼',
        id: 0
      }, {
        url: 'http://www.runoob.com/try/demo_source/movie.mp4',
        name: '熊大吃鱼',
        id: 0
      }, {
        url: 'http://www.runoob.com/try/demo_source/movie.mp4',
        name: '熊大吃鱼',
        id: 0
      }],
      info: [{
        title: '具有线性温度折返功能的汽车日行灯 (DRL) LED 驱动器参考设计',
        content: 'LT3471 双通道开关稳压器将两个 42V、1.3A 开关与能够在至地电位的条件下进行检测的误差放大器组合在了一起，从而提供了升压和负输出转换功能。低 VCESAT 双极型开关使该器件能够在占板面积很小的情况下提供高电流输出。LT3471的开关频率为 1.2MHz，因而允许采用纤巧、低成本且扁平的电感器和电容器。采用可编程软起动功能消除了启动期间的高浪涌电流，此时，一个外部 RC 用于设定电流斜坡速率。恒定频率电流模式 PWM 架构的运用产生了易于滤除的可预测低输出噪声。LT3471 双通道开关稳压器将两个 42V、1.3A 开关与能够在至地电位的条件下进行检测的误差放大器组合在了一起，从而提供了升压和负输出转换功能。低 VCESAT 双极型开关使该器件能够在占板面积很小的情况下提供高电流输出。LT3471的开关频率为 1.2MHz，因而允许采用纤巧、低成本且扁平的电感器和电容器。采用可编程软起动功能消除了启动期间的高浪涌电流，此时，一个外部 RC 用于设定电流斜坡速率。恒定频率电流模式 PWM 架构的运用产生了易于滤除的可预测低输出噪声,LT3471 双通道开关稳压器将两个 42V、1.3A 开关与能够在至地电位的条件下进行检测的误差放大器组合在了一起，从而提供了升压和负输出转换功能。低 VCESAT 双极型开关使该器件能够在占板面积很小的情况下提供高电流输出。LT3471的开关频率为 1.2MHz，因而允许采用纤巧、低成本且扁平的电感器和电容器。采用可编程软起动功能消除了启动期间的高浪涌电流，此时，一个外部 RC 用于设定电流斜坡速率。恒定频率电流模式 PWM 架构的运用产生了易于滤除的可预测低输出噪声',
        hot: 'hot',
        list: ['LT3471EDD#TRPBF', 'LT3471EDD', 'LT3471EDD#TRPBF', 'LT3471EDD#TRPBF', 'LT3471EDD#TRPBF']
      }, {
        title: '具有线性温度折返功能的汽车日行灯 (DRL) LED 驱动器参考设计',
        content: 'LT3471 双通道开关稳压器将两个 42V、1.3A 开关与能够在至地电位的条件下进行检测的误差放大器组合在了一起，从而提供了升压和负输出转换功能。低 VCESAT 双极型开关使该器件能够在占板面积很小的情况下提供高电流输出。LT3471的开关频率为 1.2MHz，因而允许采用纤巧、低成本且扁平的电感器和电容器。采用可编程软起动功能消除了启动期间的高浪涌电流，此时，一个外部 RC 用于设定电流斜坡速率。恒定频率电流模式 PWM 架构的运用产生了易于滤除的可预测低输出噪声。',
        list: ['LT3471EDD#TRPBF', 'LT3471EDD', 'LT3471EDD#TRPBF', 'LT3471EDD#TRPBF', 'LT3471EDD#TRPBF']
      }, {
        title: '具有线性温度折返功能的汽车日行灯 (DRL) LED 驱动器参考设计',
        content: 'LT3471 双通道开关稳压器将两个 从而提供了升压和负输出转换功能。低 VCESAT 双极型开关使该器件能够在占板面积很小的情况下提供高电流输出。LT3471的开关频率为 1.2MHz，因而允许采用纤巧、低成本且扁平的电感器和电容器。采用可编程软起动功能消除了启动期间的高浪涌电流，此时，一个外部 RC 用于设定电流斜坡速率。恒定频率电流模式 PWM 架构的运用产生了易于滤除的可预测低输出噪声。LT3471 双通道开关稳压器将两个 42V、1.3A 开关与能够在至地电位的条件下进行检测的误差放大器组合在了一起，从而提供了升压和负输出转换功能。低 VCESAT 双极型开关使该器件能够在占板面积很小的情况下提供高电流输出。LT3471的开关频率为 1.2MHz，因而允许采用纤巧、低成本且扁平的电感器和电容器。采用可编程软起动功能消除了启动期间的高浪涌电流，此时，一个外部 RC 用于设定电流斜坡速率。恒定频率电流模式 PWM 架构的运用产生了易于滤除的可预测低输出噪声,LT3471 双通道开关稳压器将两个 42V、1.3A 开关与能够在至地电位的条件下进行检测的误差放大器组合在了一起，从而提供了升压和负输出转换功能。低 VCESAT 双极型开关使该器件能够在占板面积很小的情况下提供高电流输出。LT3471的开关频率为 1.2MHz，因而允许采用纤巧、低成本且扁平的电感器和电容器。采用可编程软起动功能消除了启动期间的高浪涌电流，此时，一个外部 RC 用于设定电流斜坡速率。恒定频率电流模式 PWM 架构的运用产生了易于滤除的可预测低输出噪声',
        hot: 'hot',
        list: ['LT3471EDD#TRPBF', 'LT3471EDD', 'LT3471EDD#TRPBF', 'LT3471EDD#TRPBF', 'LT3471EDD#TRPBF']
      }, {
        title: '具有线性温度折返功能的汽车日行灯 (DRL) LED 驱动器参考设计',
        content: 'LT3471 双通道开关稳压一起，从而提供了升压和负输出转换功能。低 VCESAT 双极型开关使该器件能够在占板面积很小的情况下提供高电流输出。LT3471的开关频率为 1.2MHz，因而允许采用纤巧、低成本且扁平的电感器和电容器。采用可编程软起动功能消除了启动期间的高浪涌电流，此时，一个外部 RC 用于设定电流斜坡速率。恒定频率电流模式 PWM 架构的运用产生了易于滤除的可预测低输出噪声。',
        list: ['LT3471EDD#TRPBF', 'LT3471EDD', 'LT3471EDD#TRPBF', 'LT3471EDD#TRPBF', 'LT3471EDD#TRPBF']
      }],
      form: {
        name: '',
        region: '',
        delivery: false,
        resource: '',
        desc: '',
        dialogImageUrl: '',
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }],
        input: [{
          value: '1.6A',
          name: '电流'
        }, {
          value: '1.2V',
          name: '电压'
        }],
        sources: '德玛西亚',
        time: '2018-07-10',
        content: ''
      },
      dialogVisible: false,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      activeName: 'fourth',
      centerDialogVisible: true,
      // importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      // sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      // dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
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
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log(this.$refs)
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
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
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
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
    // 进入详情
    productIofn(id) {
      console.log(id)
      this.centerDialogVisible = true
    },
    // 切换tab
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 提交详情表单
    onSubmit() {
      console.log('submit!')
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件上传
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3)
    },
    // 设置主视频
    mainVideo(id) {
      console.log(id)
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
<style>
.chart-wrapper {
  background: #fff;
  padding: 20px 15px 0;
  margin-bottom: 32px;
}
.colorRed {
  color: #FF0000;
}
.hot{
  background: url('../../assets/images/hot.png') ;
  display: inline-block;
  width: 24px;
  height: 24px;
}
.content{
  height: 70px; 
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

