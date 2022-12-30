import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import UserAuth from "../views/UserAuth.vue"
import Products from "../views/Products.vue"
import ProductDetail from "../views/ProductDetail.vue"
import PageNotFound from "../views/PageNotFound.vue"


import Home from "../views/Home.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/products",
        name: "Products",
        component: Products,
        meta: {
            requireAuth: true
        }
    },
    {
        path: "/products/:id",
        name: "ProductDetail",
        component: ProductDetail,
        meta: {
            requireAuth: true
        }
    },
    {
        path: "/sign-in",
        name: "Login",
        component: UserAuth
    },
    {
        path: "/sign-up",
        name: "Register",
        component: UserAuth
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: PageNotFound
    }
];



const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
        const responseUser = await getCurrentUser()

        if (responseUser) {
            next()
        } else {
            alert("You dont have access")
            next('/')
        }
    } else {
        next()
    }
})

export default router;
