<template>
    <div class="wrap" v-if="cocktail">
        <AppLayout :imgUrl="cocktail.strDrinkThumb" :backFunc="goBack">
            <div class="wrapper">
                <!-- <div class="info" v-if="!ingredient || !cocktails"> -->
                <div class="info">
                    <div class="title">{{ cocktail.strDrink }}</div>
                    <div class="line"></div>
                    <div class="slider">
                        <swiper
                            :slides-per-view="3"
                            :space-between="50"
                            class="swiper"
                        >
                            <swiper-slide
                                v-for="(ingredient, key) in ingredients"
                                :key="key"
                            >
                                <img
                                    :src="`${INGREDIENT_PIC}${ingredient}-Small.png`"
                                    alt=""
                                />
                                <div class="name">
                                    {{ ingredient }}
                                </div></swiper-slide
                            >
                        </swiper>
                    </div>
                    <div class="instructions">
                        {{ cocktail.strInstructions }}
                    </div>
                </div>
            </div>
        </AppLayout>
    </div>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import axios from "axios";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import { COCKTAIL_RANDOM, INGREDIENT_PIC } from "@/constants/index";
const route = useRoute();
const router = useRouter();
const cocktailId = computed(() => route.path.split("/").pop());
const cocktail = ref(null);
const ingredients = computed(() => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        if (!cocktail.value[`strIngredient${i}`]) break;
        const ingredient = cocktail.value[`strIngredient${i}`];
        ingredients.push(ingredient);
    }
    return ingredients;
});
async function getCocktail() {
    const data = await axios.get(`${COCKTAIL_RANDOM}`);
    cocktail.value = data.data.drinks[0];
}
getCocktail();
function goBack() {
    router.go(-1);
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/main";
.slider {
    padding: 50px 0;
}
.swiper {
    text-align: center;
    width: 586px;
}
.name {
    padding-top: 20px;
}
</style>
