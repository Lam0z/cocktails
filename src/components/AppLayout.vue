<template>
    <div class="root">
        <div class="img" :style="`background-image: url(${imgUrl})`"></div>
        <div class="main">
            <div class="btns">
                <el-button
                    type="primary"
                    :icon="Back"
                    circle
                    class="back"
                    @click="backFunc"
                    v-if="isBackBtnVisible"
                />
                <el-button class="btn" @click="goForCocktailRandom"
                    >Get random cocktail</el-button
                >
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { Back } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { ROUTES_PATHS } from "@/constants";
const props = defineProps({
    imgUrl: {
        type: String,
        required: true,
    },
    backFunc: {
        type: Function,
        required: true,
    },
    isBackBtnVisible: {
        type: Boolean,
        default: true,
    },
});
const route = useRoute();
const router = useRouter();

const routeName = computed(() => route.name);
function goForCocktailRandom() {
    router.push(ROUTES_PATHS.COCKTAIL_RANDOM);
    if (routeName.value === ROUTES_PATHS.COCKTAIL_RANDOM) {
        router.go();
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/main";

.root {
    min-height: 100vh;
    display: flex;
    background-color: $background;
}
.img {
    width: 0;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    @media (min-width: 992px) {
        width: 50%;
    }
}
.main {
    width: 100%;
    padding: 32px 40px;
    position: relative;
    @media (min-width: 992px) {
        width: 50%;
    }
}
.btn {
    position: absolute;
    top: 32px;
    right: 40px;
    background-color: $accent;
    border-color: $accent;
    color: $text;
    font-size: 16px;
    font-family: "Raleway" sans-serif;
    &:hover,
    &:active {
        background-color: darken($accent, 10%);
        border-color: darken($accent, 10%);
    }
}
.btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.back {
    background-color: transparent;
    border-color: $text;
    &:hover {
        border-color: $accent;
    }
}
</style>
