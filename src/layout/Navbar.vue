<template>
  <nav class="navbar sticky-top bg-primary">
    <div class="container">
      <span class="navbar-brand fw-bold text-muted" href="#">
        Products
        <span class="badge badge-pill badge-success bg-warning">{{ total }}</span>
      </span>
    </div>
  </nav>
</template>
  
<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    }
  }
};
</script>
  
<style>

</style>