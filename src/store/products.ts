import { defineStore } from 'pinia'
import axios from 'axios'
import  Category  from '../common-types/category';
import Product from '../common-types/product'
const url = "http://dicore.uz:1440/api/v1";


export const useProducts = defineStore({
    id: 'products',
    state: () => ({
        products_data: {
            results: [] as Product[],
            count: 0,
            next: 0

        },
        categories: [] as Category[],
        brands: [] as { id: number, title: string }[], 
        
    }),
    getters: {
        getProducts: (state) => {
            return state.products_data
        },
        getCategories: (state) => {
            return state.categories
        },
        getBrands: state => {
            return state.brands
        }
    },
    actions: {
        async fetchProducts(params: any): Promise<void> {
            const response = await axios({ url: `${url}/products/products/`, method: "GET", params })
            this.products_data = response.data
        },
        async fetchCategories() {
            const response = await axios({ url: `${url}/knowledge_base/categories/`, method: "GET", params: { page: 1, page_size: 20 } })
            this.categories = response.data.results
        },

        async fetchBrands() {
            const response = await axios({ url: `${url}/knowledge_base/brands/`, method: "GET", params: { page: 1, page_size: 100 } })
            this.brands = response.data.results
        },

    }
})