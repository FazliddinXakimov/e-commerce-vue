<script setup lang="ts">
import { useProducts } from '../store/products'
import { ref, reactive, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router';
import ProductCardItem from '../components/ProductCardItem.vue'
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification()

const store = useProducts()
const route = useRoute()
const router = useRouter()
const { product } = storeToRefs(store)
const { fetchSingleProduct, updateProduct } = useProducts()

const product_description: {
    ru: any,
    uz: any,
    oz: any
} = reactive({
    ru: '',
    uz: '',
    oz: ''
})

onMounted(async () => {
    try {
        await fetchSingleProduct(route.params.id)
        product_description.ru = product.value.product_description?.ru
        product_description.uz = product.value.product_description?.uz
        product_description.oz = product.value.product_description?.oz
    } catch (error) {
        notification.notify({
            title: `Error`,
            type: 'error'
        });
    }
})

const editDescProduct = async () => {
    try {
        await updateProduct({ id: route.params.id, data: { product_description } })
        router.push('/products')
        notification.notify({
            title: "Comment Added",
            type: 'success'
        });



    } catch (error: any) {
        notification.notify({
            title: error?.response?.message || "Error Occured",
            type: 'error'
        });
    }

}

</script>


<template>
    <div class="w-25 mx-auto mt-5 ">
        <ProductCardItem :product="product" />
        <label for="decription" class="mt-5">Description</label>
        <textarea v-model="product_description.ru" class="mt-2 w-100" id="decription" />
        <button @click="editDescProduct" class="btn btn-primary btn-sm mt-3">Save</button>
    </div>
</template>
