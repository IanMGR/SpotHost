<template>
  <div>
    <button type="button" class="m-2 btn btn-info btn-sm"  @click="leaveRoom()"> Leave Room</button>
    <h2>CLIENT</h2>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { api, client_id } from '../../const/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const dados = ref([])

const props = defineProps({
  code: String
})

function req() {
  api.get(`track/play/${props.code}`)
  .then(resp => resp.data)
}

function leaveRoom() {
  clearInterval(localStorage.interval_id)
  router.push('/')
}


onMounted(() => {
  req();
  localStorage.interval_id = setInterval(() => req(), 3000);
})

</script>
