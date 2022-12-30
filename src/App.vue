<template>
  <Navbar :isLoggedIn="isLoggedIn" @handleSignOut="handleSignOut" />
  <router-view />
  <notifications position="bottom left" />
</template>


<script setup lang="ts">
import Navbar from './layout/Navbar.vue';
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';

const appRouter = useRouter()
const isLoggedIn = ref(false)
let auth: any;
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    }
    else {
      isLoggedIn.value = false;
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    appRouter.push('/sign-in')
  })
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
