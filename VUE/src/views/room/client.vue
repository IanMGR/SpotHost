<template>
  <div>
    <h2>Listening to: <button type="button" class="m-2 btn btn-primary btn-sm"  @click="leaveRoom()"> Leave Room</button></h2>
      <img :src="data.img.url"/>
      <h1>{{data.name}}</h1>
      <h4>{{data.artists.join(',')}}</h4>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, onBeforeMount} from 'vue'
import { api, client_id } from '../../const/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = ref([])

const props = defineProps({
  code: String
})

function req() {
  api.get(`track/play/${props.code}`)
  .then(resp => data.value = resp.data)
}

function leaveRoom() {
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