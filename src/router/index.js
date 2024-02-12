import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Random from "../pages/CocktailRandom.vue";
import Cocktail from "../pages/Cocktail.vue";
import { ROUTES_PATHS } from "@/constants";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: ROUTES_PATHS.HOME,
            name: ROUTES_PATHS.HOME,
            component: Home,
        },
        {
            path: ROUTES_PATHS.COCKTAIL_RANDOM,
            name: ROUTES_PATHS.COCKTAIL_RANDOM,
            component: Random,
        },
        {
            path: ROUTES_PATHS.COCKTAIL,
            name: ROUTES_PATHS.COCKTAIL,
            component: Cocktail,
        },
    ],
});

export default router;
