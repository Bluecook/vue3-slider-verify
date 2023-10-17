## 一个vue3的滑块验证插件

### 安装
```
npm i vue3-slider-verify
```

### 全局引入
``` javascript
import { createApp } from 'vue'
import sliderVerify from 'vue3-slider-verify/lib'//import {sliderVerify} from 'vue3-slider-verify/lib'
import 'slider-verify/lib/style.css' //一定要引入样式
const app = createApp(App);
app.use(sliderVerify)
app.mount('#app');

```

### 组件使用
``` javaScript
<template>
   <slider-verify></slider-verify>
</template>
<script setup lang="ts">
//局部引入
import { sliderVerify } from 'vue3-slider-verify/lib'
import 'slider-verify/lib/style.css'
</script>
```

### API参数
| 参数       | 说明                         | 类型    | 可选值            | 默认值 |
| ---------- | ---------------------------- | ------- | ----------------- | ------ |
| width      | 滑块宽度                     | Number  | -                 | 320    |
| height     | 滑块高度                     | Number  | -                 | 180    |
| img        | 滑块图片                     | String  | -                 | -      |
| verifyPass | 验证通过滑块是否回到原来位置 | boolean | false &#124; true | false  |


### Events
| 事件名    | 说明         | 回调参数 |
| --------- | ------------ | -------- |
| onSuccess | 验证通过事件 | ()=>void |
| onError   | 验证失败事件 | ()=>void |

### 示例
``` javaScript
<template>
   <slider-verify @onSuccess="success" @onError="error"></slider-verify>
</temple>
<script setup lang="ts">
   interface result{
      type:string,//'error'|'success'
      message:string,
      verify:boolean//false则是验证失败，true则是验证成功
   }
   const success = (verifyResult:result)=>{
      consle.log(verifyResult)
   }
   cosnt error=(verifyResult:result)=>{
      consle.log(verifyResult)
   }
</script>
```
