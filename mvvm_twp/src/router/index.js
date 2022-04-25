import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeCategory.vue";
import Post from "@/views/PostSingle.vue";


const routes = [
	{
		name: "home",
		path: "/",
		component: Home,
	},

	{
		name: "post",
		path: "/post/:id",
		component: Post,
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;