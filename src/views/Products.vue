<script setup lang="ts">
import ProductCardItem from '../components/ProductCardItem.vue'
import Spinner from '../components/Spinner.vue'
import vSelect from 'vue-select'
import Pagination from '../components/Pagination.vue'
import { storeToRefs } from 'pinia'
import { useProducts } from '../store/products'
import { ref, reactive, onMounted, watch } from 'vue'
import 'vue-select/dist/vue-select.css'
import Filter from '../common-types/filter'
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification()

const store = useProducts()
const { products_data, categories, brands } = storeToRefs(store)
const { fetchProducts, fetchBrands, fetchCategories } = useProducts()

const filter: Filter = reactive({
    page_size: 4,
    page: 1,
    search: null,
    brands: null,
    category: null
});

let loading = ref(false)

const refresh = () => {
    try {
        loading.value = true
        fetchProducts(filter)

    } catch (error) {
        notification.notify({
            title: `Error Occured`,
            type: 'error'
        });
    }
    finally {
        loading.value = false
    }
}


onMounted(() => {
    refresh()
    fetchBrands()
    fetchCategories()

})

watch(filter, (newValue, oldValue) => {
    refresh()
})

const onPaginate = (value: number) => {
    filter.page = value
    refresh()
}
</script>

<template>

    <div class="container">
        <!-- Filter -->
        <div class="row  mt-4">
            <div class="col-3">
                <label for="category" class="form-label">Categories: </label>
                <vSelect :options="categories" v-model="filter.category" id="category" label="title"
                    :reduce="el => el.id" :get-option-label="(el) => el.title.ru" />
            </div>
            <div class="col-3">
                <label for="category" class="form-label">Brands: </label>
                <vSelect :options="brands" v-model="filter.brands" id="category" label="title" :reduce="el => el.id" />
            </div>
        </div>
        <!-- Loading Spinner -->
        <div class="d-flex justify-content-center align-items-center mt-5" v-if="loading">
            <Spinner />
        </div>

        <!-- ProductList -->
        <div v-else-if="!loading && products_data.count > 0">
            <div class="row mt-5 ">
                <div class="col-3 mt-2" v-for="product in products_data.results" :key="product.id">
                    <ProductCardItem :product="product" />
                </div>
            </div>

            <!-- Pagination -->
            <div class="d-flex justify-content-center mt-5">
                <Pagination v-if="store.getProducts.count > filter.page_size" @onPaginate="onPaginate"
                    :count="store.getProducts.count" :page_size="filter.page_size" :page="filter.page" />
            </div>
        </div>

        <div v-else class="d-flex justify-content-center align-items-center mt-5">
            <h3>There is no data</h3>
        </div>
    </div>
</template>

<style scoped>

</style>
