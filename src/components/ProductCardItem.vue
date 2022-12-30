<script setup lang="ts">
// import Product from "../common-types/product"

import Product from '../common-types/product';

const { product } = defineProps<{
  product: Product
}>()


</script>

<template>
  <!-- <pre>{{ product }}</pre> -->
  <div class="card text-center">
    <div class="card-header">{{ product?.title?.ru }}</div>
    <div class="card-body">
      <img v-if="product?.main_image" :src="product?.main_image" class="card-img-top" alt="...">
      <img v-else src="../assets/default-thumbnail.jpg" class="card-img-top" alt="...">
      <h5 class="card-title">{{ product?.brands?.title }}</h5>

      <p class="card-text">
        {{ product?.category?.title?.ru }}
      </p>
    </div>
    <div class="card-footer text-muted">
      <div class="d-flex justify-content-between align-items-center">

        <h6 class="d-flex justify-content-center align-items-center">
          <vue-feather type="star" />{{ product?.rating }}
        </h6>



        <h6 class="d-flex justify-content-center align-items-center">
          <vue-feather type="dollar-sign" />{{ product?.price }}
        </h6>
        <div v-if="$route.name=='Products'" >
          <button @click="$router.push(`/products/${product?.id}`)" class="btn btn-primary btn-sm">Detail</button>
        </div>



      </div>
    </div>

  </div>
</template>

  
<style>
.card-img-top {
  text-align: center;
  min-width: 8rem;
  max-width: 8rem;
  width: 8rem;
  height: 8rem;
}
</style>