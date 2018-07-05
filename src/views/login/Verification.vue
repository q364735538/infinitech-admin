<template>
  <div class="join_formitem">
    <div class='captcha'>
      <input type="text"
             placeholder="请输入验证码"
             class="yanzhengma_input"
             v-model="picLyanzhengma">
      <div @click="createCode"
             class="verification">
        {{checkCode}}
      </div>
      <span class="log">{{prompt}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: '',
      checkCode: '',
      picLyanzhengma: '',
      prompt: ''
    }
  },
  created() {
    this.createCode()
  },
  methods: {
    // 图片验证码
    createCode() {
      // 先清空验证码的输入
      this.code = ''
      this.checkCode = ''
      this.picLyanzhengma = ''
      // 验证码的长度
      var codeLength = 4
      // 随机数
      var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (var i = 0; i < codeLength; i++) {
        // 取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 36)
        // 根据索引取得随机数加到code上
        this.code += random[index]
      }
      // 把code值赋给验证码
      this.checkCode = this.code
    },
    check() {
      if (this.picLyanzhengma === '' || this.picLyanzhengma.toUpperCase() !== this.code) {
        this.prompt = '验证不匹配'
        return false
      } else {
        this.prompt = ''
        return true
      }
    }
  }
}
</script>
<style>
.yanzhengma_input{
    font-family: 'Exo 2', sans-serif;
    border: 1px solid #fff;
    color: #C0C4CC;
    outline: none;
    border-radius: 4px;
    letter-spacing: 1px;
    font-size: 17px;
    width: 320px;
    font-weight: normal;
    background-color: #2D3A4B;
    padding: 5px 0 5px 10px;
    height: 50px;
    margin-top: 5px;
    border: 1px solid #3E4957;
}
.verification{
    display: inline-block;
    border-radius: 4px;
    width: 100px;
    font-weight: 800;
    margin-left: 20px;
    background-color: #283443;
    text-align: center;
    border: 1px solid #3E4957;
    padding:14px 0;
    color: #fff;
    /* transform: translate(-15px,0);  */
}
.captcha{
    height: 50px;
    text-align: justify;
}
.join_formitem{
  margin-bottom: 30px;
}
.log{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
}
</style>
