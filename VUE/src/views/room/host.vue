<template>
  <div>
    <button type="button" class="m-2 btn btn-info btn-sm"  @click="leaveHost()"> Stop Hosting</button>
    <h2>HOST</h2>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { api } from '../../const/api'
import { useRouter } from 'vue-router'

const router = useRouter()

function req() {
  api.get('track/current')
  .then(resp => resp.data)
}

function leaveHost() {
  clearInterval(localStorage.interval_id)
  router.push('/')
}

onMounted(() => {
  req();
  localStorage.interval_id = setInterval(() => req(), 3000);
})

</script>
