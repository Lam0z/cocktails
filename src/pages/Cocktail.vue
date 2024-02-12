<template>
    <div class="wrap" v-if="cocktail">
        <AppLayout :imgUrl="cocktail.strDrinkThumb" :backFunc="goBack">
            <div class="wrapper">
                <!-- <div class="info" v-if="!ingredient || !cocktails"> -->
                <div class="info">
                    <div class="title">{{ cocktail.strDrink }}</div>
                    <div class="line"></div>
                    <div class="list">
                        <div
                            v-for="(item, key) in ingredients"
                            :key="key"
                            class="list-item"
                        >
                            {{ item.name }}
                            <template v-if="item.measure">
                                |
                                {{ item.measure }}
                            </template>
                        </div>
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
import { COCKTAIL_BY_ID } from "@/constants/index";
const route = useRoute();
const router = useRouter();
const cocktailId = computed(() => route.path.split("/").pop());
const cocktail = ref(null);
const ingredients = computed(() => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        if (!cocktail.value[`strIngredient${i}`]) break;
        const ingredient = {};
        ingredient.name = cocktail.value[`strIngredient${i}`];
        ingredient.measure = cocktail.value[`strMeasure${i}`];
        ingredients.push(ingredient);
    }
    return ingredients;
});
async function getCocktail() {
    const data = await axios.get(`${COCKTAIL_BY_ID}${cocktailId.value}`);
    cocktail.value = data.data.drinks[0];
}
getCocktail();
function goBack() {
    router.go(-1);
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/main";

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.info {
    padding: 80px 0;
    text-align: center;
}
</style>
