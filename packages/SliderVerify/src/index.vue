<template>
    <div class="slide_puzzle" :style="{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }">
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" class="mb-4"></canvas>
        <canvas ref="sliderImg" :width="sliderWidth" :style="{ top: 0 + 'px', left: barLeft + 'px' }" class="slider_img"
            :height="canvasHeight"></canvas>
        <div class="refresh" @click="handlerefresh">
            <svg t="1697120534385" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4319" width="24" height="24">
                <path
                    d="M512 32C246.4 32 32 246.4 32 512s214.4 480 480 480 480-214.4 480-480S777.6 32 512 32z m288 566.4c-38.4 128-156.8 214.4-288 214.4-166.4 0-300.8-134.4-300.8-300.8S345.6 211.2 512 211.2c83.2 0 160 32 214.4 89.6v-16c0-19.2 12.8-32 32-32s32 12.8 32 32v86.4c0 19.2-12.8 32-32 32H652.8c-19.2 0-32-12.8-32-32s12.8-32 32-32h22.4c-44.8-41.6-102.4-64-163.2-64-131.2 0-236.8 105.6-236.8 236.8S380.8 748.8 512 748.8c105.6 0 198.4-70.4 227.2-169.6 6.4-16 22.4-25.6 38.4-22.4 16 6.4 25.6 22.4 22.4 41.6z"
                    p-id="4320" fill="#FFF"></path>
            </svg>
        </div>
    </div>
    <div class="slider" :style="{ width: `${canvasWidth}px` }">
        <span class="slider_text">向右滑动完成验证</span>
        <div class=" slider_text_bg" :style="{ width: barLeft + 'px' }"></div>
        <div class="slider_bar" :style="{ left: barLeft + 'px' }" @mousedown="onMouseDown" @touchstart="pressFinger"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const getImageUrl = (name: string) => {
    return `https://z1.ax1x.com/2023/10/17/${name}.jpg`
}
const emit = defineEmits(['onSuccess', 'onError'])
// 随机生成一种验证图
function imgRandom() {
    // , getImageUrl('R-C')
    const imgsArr = [getImageUrl('piPmwgP'), getImageUrl('piPma9I'), getImageUrl('piPmd3t'), getImageUrl('piPmN4A'), getImageUrl('piPmeAJ')]
    return imgsArr[Math.floor(Math.random() * imgsArr.length)]
}

// interface sliderProp 

const props = defineProps<{
    img?: string,
    verifyPass?: boolean,
    width?: number,
    height?: number,
}>()

// const scaleImage = ref<string>()
const canvasWidth = ref<number>(props.width ? props.width : 320)//背景图宽度
const canvasHeight = ref<number>(props.height ? props.height : 180)//背景图高度
// 背景图
const canvas = ref<HTMLCanvasElement | null>()
// 滑块拼图
const sliderImg = ref<HTMLCanvasElement | null>()

// 随机生成的验证图
let verificationDiagram = ref<string>('')
let bgWidthScale = ref<number>().value//背景图和实际图的缩放比例
let bgHeightScale = ref<number>().value
const barLeft = ref(0)
let isDragging = false
let startLeft = 0
// 滑块拼图的宽度(为一正方形)
let sliderWidth = ref<number>(56)
let puzzleScale = ref<number>(1).value// 拼图块的大小缩放比例
let pinX = ref<number>(86) // 拼图的起始X
let pinY = ref<number>(99) // 拼图的起始Y
const range: number = 5  // 允许的偏差值
// 工具 - 范围随机数
const getRandom = (min: number, max: number) => {
    return Math.ceil(Math.random() * (max - min) + min);
}

onMounted(() => {
    init()
})

onUnmounted(() => {
    // 清除事件监听
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('mousedown', onMouseDown)
    window.removeEventListener('touchmove', moveFinger)
    window.removeEventListener('touchend', raiseFinger)
    window.removeEventListener('touchstart', pressFinger)
})
/**
 * @description: 绘制不完整的背景图片
 * @param {*} canvas
 * @return {*}
 */
function drawPuzzle(canvas: HTMLCanvasElement) {
    // 绘制拼图的代码
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        return
    }

    // 绘制不完整背景图片
    const bgImg = new Image()
    bgImg.src = verificationDiagram.value
    bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, canvasWidth.value, canvasHeight.value)
        // 绘制缺块
        drawingPieces(ctx)
        ctx.fill()
    }

}
/**
 * @description: 绘制拼图的缺口
 * @return {*}
 */
function drawingPieces(ctx: {
    beginPath: () => void;
    moveTo: (arg1: number, arg2: number) => void;
    lineTo: (arg1: number, arg2: number) => void;
    arcTo: (arg1: number, arg2: number, arg3: number, arg4: number, arg5: number) => void;
}, startX?: number) {
    let moveL = Math.ceil(16 * puzzleScale)
    let X = startX !== undefined ? startX : pinX.value
    ctx.beginPath()
    ctx.moveTo(X, pinY.value)
    ctx.lineTo(X + moveL, pinY.value)
    ctx.arcTo(
        X + moveL,
        pinY.value - moveL / 2,
        X + moveL + moveL / 2,
        pinY.value - moveL / 2,
        moveL / 2
    );

    ctx.arcTo(
        X + moveL + moveL,
        pinY.value - moveL / 2,
        X + moveL + moveL,
        pinY.value,
        moveL / 2
    );
    ctx.lineTo(X + moveL + moveL + moveL, pinY.value);
    ctx.lineTo(X + moveL + moveL + moveL, pinY.value + moveL);
    ctx.arcTo(
        X + moveL + moveL + moveL + moveL / 2,
        pinY.value + moveL,
        X + moveL + moveL + moveL + moveL / 2,
        pinY.value + moveL + moveL / 2,
        moveL / 2
    );
    ctx.arcTo(
        X + moveL + moveL + moveL + moveL / 2,
        pinY.value + moveL + moveL,
        X + moveL + moveL + moveL,
        pinY.value + moveL + moveL,
        moveL / 2
    );
    ctx.lineTo(
        X + moveL + moveL + moveL,
        pinY.value + moveL + moveL + moveL
    );
    ctx.lineTo(X, pinY.value + moveL + moveL + moveL);
    ctx.lineTo(X, pinY.value + moveL + moveL);

    ctx.arcTo(
        X + moveL / 2,
        pinY.value + moveL + moveL,
        X + moveL / 2,
        pinY.value + moveL + moveL / 2,
        moveL / 2
    );
    ctx.arcTo(
        X + moveL / 2,
        pinY.value + moveL,
        X,
        pinY.value + moveL,
        moveL / 2
    );
    ctx.lineTo(X, pinY.value);
}
/**
 * @description: 按下鼠标
 * @param {*} event
 * @return {*}
 */
function onMouseDown(event: MouseEvent) {
    isDragging = true
    startLeft = event.clientX
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
}
/**
 * @description: 鼠标移动
 * @param {*} event
 * @return {*}
 */
function onMouseMove(event: MouseEvent) {
    if (isDragging) {
        const diff = event.clientX - startLeft
        if (diff > 0 && diff < canvasWidth.value - 60) {
            barLeft.value = diff
        }
    }
}

/**
 * @description: 鼠标抬起
 * @return {*}
 */
function onMouseUp() {
    isDragging = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    // 验证位置是否正确
    if (Math.abs(pinX.value - barLeft.value) < range) {
        emit('onSuccess', {
            type: 'success',
            message: '验证通过',
            verify: true,
        })
        // 验证成功后滑块回到原来位置
        if (props.verifyPass && props.verifyPass === true) {
            setTimeout(() => {
                barLeft.value = 0
            }, 600)
        }

    } else {
        emit('onError', {
            type: 'error',
            message: '验证失败',
            verify: false
        })
        barLeft.value = 0
        // 验证失败重新生成验证图
        init()
    }
}


/**
 * @description: 绘制拼图
 * @return {*}
 */
const init = () => {
    // 随机生成一个验证图片
    verificationDiagram.value = props.img ? props.img : imgRandom()
    // 取一个随机坐标，作为拼图块的位置 
    pinX.value = getRandom(sliderWidth.value, canvasWidth.value - sliderWidth.value); // 留20的边距
    pinY.value = getRandom(20, canvasHeight.value - sliderWidth.value); // 主图高度 - 拼图块自身高度 - 20边距
    // 背景
    if (canvas.value) {
        drawPuzzle(canvas.value)
    }
    // 绘制移动的背景缺块
    if (sliderImg.value) {
        // 清空canvas原有的内容
        sliderImg.value.width = sliderWidth.value
        sliderImg.value.height = canvasHeight.value
        const ctx = sliderImg.value.getContext('2d')
        if (ctx) {
            const slider = new Image()
            slider.src = verificationDiagram.value
            slider.onload = () => {
                bgWidthScale = slider.width / canvasWidth.value
                bgHeightScale = slider.height / canvasHeight.value
                slider.width = canvasWidth.value
                slider.height = canvasHeight.value

                ctx.drawImage(slider, pinX.value * bgWidthScale, (pinY.value - 16) * bgHeightScale, sliderWidth.value * bgWidthScale, canvasHeight.value * bgHeightScale, 0, pinY.value - 16, sliderWidth.value, canvasHeight.value)
            }
            drawingPieces(ctx, 0)
            ctx.clip()
        }
    }
}

/**
 * @description: 刷新拼图
 * @return {*}
 */
const handlerefresh = () => {
    if (barLeft.value !== 0) {
        barLeft.value = 0
    }
    init()
}

/**
 * @description: 开始移动手指
 * @param {*} e
 * @return {*}
 */
const pressFinger = (e: TouchEvent) => {
    console.log(e.touches[0].clientX, e.touches[0].clientY);
    isDragging = true
    startLeft = e.touches[0].clientX
    window.addEventListener('touchmove', moveFinger)
    window.addEventListener('touchend', raiseFinger)
    window.addEventListener('touchcancel', raiseFinger)
}

/**
 * @description: 抬起手指
 * @return {*}
 */
const raiseFinger = () => {
    isDragging = false
    window.addEventListener('touchmove', moveFinger)
    window.addEventListener('touchend', raiseFinger)
    window.addEventListener('touchcancel', raiseFinger)
    // 验证位置是否正确
    if (Math.abs(pinX.value - barLeft.value) < range) {
        emit('onSuccess', {
            type: 'success',
            message: '验证通过',
            verify: true,
        })
        // 验证成功后滑块回到原来位置
        if (props.verifyPass && props.verifyPass === true) {
            setTimeout(() => {
                barLeft.value = 0
            }, 600)
        }

    } else {
        emit('onError', {
            type: 'error',
            message: '验证失败',
            verify: false
        })
        barLeft.value = 0
        // 验证失败重新生成验证图
        init()
    }
}
/**
 * @description: 移动手指
 * @param {*} e
 * @return {*}
 */
const moveFinger = (e: TouchEvent) => {
    if (isDragging) {
        const diff = e.touches[0].clientX - startLeft
        if (diff > 0 && diff < canvasWidth.value - 60) {
            barLeft.value = diff
        }
    }
}


</script>

<style scoped>
.slide_puzzle {
    position: relative;
    /* width: 480px;
    height: 300px; */
    background-color: #d6d6d6;
}

.slider_img {
    position: absolute;
    top: 0;
    left: 0;
}

.refresh {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 10;
    cursor: pointer;
}

.slider {
    position: relative;
    /* width: 480px; */
    height: 32px;
    margin-top: 4px;
    background-color: #d6d6d6;
}

.slider_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    user-select: none;
    -ms-user-select: none;
    /* IE 浏览器 */
    -moz-user-select: none;
    /* Firefox 浏览器 */
    -webkit-user-select: none;
    /* Safari 和 Chrome 浏览器 */
    -o-user-select: none;
    /* Opera 浏览器 */
}

.slider_text_bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(112, 128, 144, .6);
}

.slider_bar {
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 60px;
    background-color: rgba(112, 128, 144, .4);
    /* box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2); */
    cursor: pointer;
}
</style>
