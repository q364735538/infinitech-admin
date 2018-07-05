<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div style="font-size:13px;color:#959595">用户/访问数据</div>
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description" style="background-color:#B6A2DE">
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
          <div class="card-panel-text">用户注册量</div>
        </div>
        <div class="card-panel-description" style="background-color:#B6A2DE">
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
          <div class="card-panel-text">日均搜索量</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div style="font-size:13px;color:#959595">产品/商家数据</div>
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description" style="background-color:#36A3F7">
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
          <div class="card-panel-text">元器件数量</div>
        </div>
        <div class="card-panel-description" style="background-color:#36A3F7">
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
          <div class="card-panel-text">方案数量</div>
        </div>
        <div class="card-panel-description" style="background-color:#36A3F7">
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
          <div class="card-panel-text">成品数量</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div style="font-size:13px;color:#959595">订单情况</div>
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description" style="background-color:#1FC94F">
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
          <div class="card-panel-text">待付款</div>
        </div>
        <div class="card-panel-description" style="background-color:#1FC94F">
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
          <div class="card-panel-text">待发货</div>
        </div>
        <div class="card-panel-description" style="background-color:#1FC94F">
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
          <div class="card-panel-text">待完成</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    // height: 150px;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #fff;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-description {
      display: inline-block;
      height: 100px;
      width: 100px;
      text-align: center;
      padding-top: 30px;
      border-radius: 50%;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: #fff;
        font-size: 14px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 14px;
      }
    }
  }
}
</style>