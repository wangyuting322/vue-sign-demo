<template>
<div>

<span v-show="!isDraw" class="sign-placeholder">请手写签名</span>
<Sign class="dd" :width="375" :height="200" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" @hasDraw="changDraw" ref="sign"></Sign>
<button @click="getPic">生成图片</button>
<img :src="resultImg"/>
</div>
</template>

<script>
import Sign from '@/components/Sign.vue'
import { base64ToFile } from '@/utils/file.js'
export default {
  name: 'AboutView',
  components: {
    Sign
  },
  data () {
    return {
      lineWidth: 3, // 画笔的线条粗细
      lineColor: 'black', // 画笔的颜色
      bgColor: '#fff', // 画布的背景颜色
      resultImg: '', // 最终画布生成的base64图片
      isCrop: false, // 是否裁剪，在画布设定尺寸基础上裁掉四周空白部分
      isDraw: false // 是否在绘制
    }
  },
  computed: {

  },
  watch: {

  },

  mounted () {

  },
  methods: {
    /**
     * 是否在绘制中
     */
    changDraw (d) {
      this.isDraw = d
      if (d) {
        // 移动端其他输入框取消聚焦
        const areaArr = document.querySelectorAll('textarea')
        areaArr.forEach((item) => {
          item && item.blur && item.blur()
        })
        const inputArr = document.querySelectorAll('input')
        inputArr.forEach((item) => {
          item && item.blur && item.blur()
        })
      }
    },
    /**
     * 获取图片
     */
    async getPic () {
      const sign = this.$refs.sign
      // 获取图片的base64
      this.resultImg = await sign.generate()
      // 获取file格式的图片
      const file = base64ToFile(this.resultImg, `${(new Date()).getTime()}.png`)
      console.log(file)
    }
  }
}
</script>

<style scoped>
.dd{
  border: 1px solid red;
}
</style>
