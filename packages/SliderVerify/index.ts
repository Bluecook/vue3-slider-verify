import sliderVerify from "./src/index.vue";

sliderVerify.name = "slider-verify";

sliderVerify.install = (Vue: any) => {
    Vue.component('slider-verify', sliderVerify);
}

export default sliderVerify;