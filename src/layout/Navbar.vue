<template>
  <nav class="navbar navbar-expand-lg bg-dark text-white">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <router-link class="nav-link fw-bold" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link fw-bold" to="/products">Products</router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link fw-bold" to="/sign-in">Login</router-link>
          </li>
        </ul>
        <div v-if="isLoggedIn">
          <button class="btn btn-secondary btn-sm" @click="$emit('handleSignOut')">
            Sign Out
          </button>


        </div>

      </div>
    </div>
  </nav>
</template>


<script lang="ts">
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }

  }
}
</script>

<style scoped>
a {
  color: #fff;
}

a.router-link-exact-active {
  color: aqua
}

a:hover {
  color: aqua;
}
</style>











  

