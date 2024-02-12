<template>
    <div class="root">
        <router-link :to="`/cocktail/${cocktail.idDrink}`">
            <div
                class="pic"
                :style="`background-image:url(${cocktail.strDrinkThumb})`"
            ></div>
            <div class="name">
                {{ cocktail.strDrink }}
            </div>
        </router-link>
    </div>
</template>

<script setup>
const props = defineProps({
    cocktail: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/main";
.root {
    width: 50%;
    padding: 38px;
    &:nth-child(3n + 3) {
        padding-right: 0;
    }
    @media (min-width: 768px) {
        width: 33%;
    }
}
.pic {
    margin: 0 auto;
    width: 120px;
    height: 120px;
    background-repeat: no-repeat;
    // background-position: 50%;
    background-size: 100%;
}
.name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 15px;
    list-style-position: 0.1em;
}
</style>
