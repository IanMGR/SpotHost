<template>
  <div >
      <h2>Hosting: <button type="button" class="m-2 btn btn-info btn-sm"  @click="leaveHost()"> Stop Hosting</button></h2>
      <img :src="data.img.url"/>
      <h1>{{data.name}}</h1>
      <h4>{{data.artists.join(',')}}</h4>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, onBeforeMount } from 'vue'
import { api } from '../../const/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = ref([])

function req() {
  api.get('track/current')
  .then(resp => data.value = resp.data)
}

function leaveHost() {
  clearInterval(localStorage.interval_id)
  router.push('/').then(() => location.reload())
}

onBeforeMount(() => {
  req();
})

onMounted(() => {
  localStorage.interval_id = setInterval(() => req(), 3000);
})

</script>

<style scoped>
  img {
    width: 30%;
  }
  .container{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    gap: 10%;
  }

  .img{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
