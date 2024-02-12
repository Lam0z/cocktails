<template>
    <AppLayout
        imgUrl="/src/assets/img/bg-1.jpg"
        :backFunc="removeIngredient"
        :is-back-btn-visible="!!ingredient"
    >
        <div class="wrapper">
            <div class="info" v-if="!ingredient || !cocktails">
                <div class="title">Choose your drink</div>
                <div class="line"></div>
                <div class="select-wrapper">
                    <el-select
                        v-model="rootStore.ingredient"
                        placeholder="Choose main ingredient"
                        size="large"
                        class="select"
                        filterable
                        @change="getCocktails"
                    >
                        <el-option
                            v-for="item in ingredients"
                            :key="item.strIngredient1"
                            :label="item.strIngredient1"
                            :value="item.strIngredient1"
                        />
                    </el-select>
                </div>
                <div class="text">
                    Try our delicious cocktail recipes for every occasion. Find
                    delicious cocktail recipes by ingredient through our
                    cocktail generator.
                </div>
                <img
                    src="/src/assets/img/cocktails.png"
                    class="img"
                    alt="Cocktails"
                />
            </div>
            <div class="info" v-else>
                <div class="title">COCKTAILS WITH {{ ingredient }}</div>
                <div class="line"></div>
                <div class="cocktails">
                    <CocktailThumb
                        v-for="cocktail in cocktails"
                        :key="cocktail.idDrink"
                        :cocktail="cocktail"
                    />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import CocktailThumb from "../components/CocktailThumb.vue";
const props = defineProps({});
import { ref } from "vue";
import { useRootStore } from "@/stores/root";
import { storeToRefs } from "pinia";

const rootStore = useRootStore();
rootStore.getIngredients();

const { ingredients, ingredient, cocktails } = storeToRefs(rootStore);

const getCocktails = () => {
    rootStore.getCocktails(rootStore.ingredient);
};

function removeIngredient() {
    rootStore.setIngredient(null);
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
.select-wrapper {
    padding-top: 50px;
}
.select {
    width: 220px;
}
.text {
    max-width: 516px;
    margin: 0 auto;
    padding-top: 50px;
    line-height: 36px;
    letter-spacing: 0.1em;
    color: $textMuted;
}
.img {
    margin-top: 60px;
}
.cocktails {
    display: flex;
    // justify-content: space-between;

    flex-wrap: wrap;
    align-items: center;
    margin-top: 60px;
    max-height: 400px;
    overflow-y: auto;
}
</style>
