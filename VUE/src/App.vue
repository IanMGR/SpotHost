<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img :src="'../../src/assets/logo.png'"  width="100">
        </a>
        <div class="navbar-nav">
          <div id="not-logged-nav">
            <a class="nav-link  active" style="display: inline !important" href="#" @click="router.push('/add')">Sign in</a>
            <a class="nav-link " style="display: inline !important">|</a>
            <button type="button" class="nav-item m-2 btn btn-outline-primary" @click="router.push('/login')"> Log in</button>
          </div>
          <div class="container-fluid" id="logged-nav">
            <a class="nav-link active" href="#" @click="logout()">Log out</a>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../src/const/api'
import { useRouter } from 'vue-router'

const router = useRouter()

function treq() {
  api.get('user/login')
  .then(resp => {
    let res = resp.data;
    if (res.loggedIn){
      document.getElementById('not-logged-nav').style.display = "none";
    } else {
      document.getElementById('logged-nav').style.display = "none";
    }
    console.log(res.loggedIn)
  })
}

function logout() {
  api.get('user/logout')
  .then(location.reload())
}

onMounted(() => {
  clearInterval();
  treq();
})
</script>
