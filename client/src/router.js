import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "./components/MainComponent.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: MainComponent,},
        {path: '/main', component: MainComponent},
        {path: '/cardGame', component: () => import('@/components/CardGameComponent.vue')}
    ]
})