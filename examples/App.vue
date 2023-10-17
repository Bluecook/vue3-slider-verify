<template>
  <div>
    <slider-verify ref="sliderImg" @on-success="onSuccess" @on-error="handleErr" :width="384"
      :height="216"></slider-verify>
    <div style="padding: 40px;"></div>
    <!-- <ikun-button></ikun-button> -->
  </div>
</template>
<script  lang="ts" setup>
import { ref } from "vue";
// import sliderVerify from "../packages/SliderVerify/index";
// import ikunButton from "../packages/ikun-button/index";
import { sliderVerify } from "../lib";
// import { sliderVerify } from 'vue3-slider-verify/lib'
import '../lib/style.css'
// import Rc from './assets/R-C.png'
const sliderImg = ref()

console.log(sliderImg.value);


const onSuccess = (e: any) => {
  console.log(e);
}

const handleErr = (e: any) => {
  console.log(e);
}
// const handleOk = () => {
//   // 成功后重新生成验证图,当再次选择用户时需再次验证
//   sliderImg.value.init()
//   sliderImg.value.barLeft = 0
// };
// provide('isOk', handleOk)
</script>
<style scoped></style>
