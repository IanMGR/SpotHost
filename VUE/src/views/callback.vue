<template>
  <div>
    <div id="not-logged">
      <button type="button" class="m-2 btn btn-info btn-sm" @click="router.push('/login')"> Login</button>
    </div>
    <div id="logged">
      <button type="button" class="m-2 btn btn-info btn-sm" @click="router.push('/host')"> Host</button>
      <button type="button" class="m-2 btn btn-info btn-sm" @click="logout()"> Logout</button>
      <input type="text" id="room_code" name="room_code"/>
      <button type="button" class="m-2 btn btn-info btn-sm" @click="goToRoom()"> Enter Room</button>
      <div class="container">
        <div class="row align-items-end">
          <div class="col">
            <h1>My Rooms:</h1>
            <button type="button" class="m-2 btn btn-info btn-sm" data-bs-toggle="modal"  data-bs-target="#modalRoomCreation" > Add Room</button>
            <table class="table-light">
              <tr v-for="(data, idx) in datas" :key="idx">
                <td>{{ data.dscr }}</td>
                <td>{{ data.code }}</td>
                <td>
                  <button type="button" class="btn btn-primary p-2 m-2" @click="editRoom(data.id)" title="Editar"><i class="fas fa-edit"></i></button>
                  <button type="button" class="btn btn-danger" @click="deleteRoom(data.id)" title="Deletar"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalRoomCreation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Room creation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Room description</p>
          <input type="text" id="room_dscr" name="room_dscr"/>
          <button type="button" class="m-2 btn btn-info btn-sm" @click="addRoom()"> Submit</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../const/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const datas = ref([])

function req() {
  api.get('user/login')
  .then(resp => {
    let res = resp.data;
    if (res.loggedIn){
      document.getElementById('not-logged').style.display = "none";
      getMyRooms();
    } else {
      document.getElementById('logged').style.display = "none";

    }
    console.log(res.loggedIn)
  })
}

function getMyRooms() {
  api.get('room/all')
  .then(resp => datas.value = resp.data)
}

function addRoom() {
  let room_dscr = document.getElementById('room_dscr').value
  api.post('room/add', {dscr: room_dscr})
  .then(resp => {
    let res = resp.data;
    if (res){
      location.reload()
    } else {
      console.log('Error')
    }
    
  })
}

function logout() {
  api.get('user/logout')
  .then(location.reload())
}

function goToRoom() {
  let room_code = document.getElementById('room_code').value
  api.get(`room/${room_code}/validate`)
  .then(resp => {
    let res = resp.data;
    if (res){
      router.push(`/room/${room_code}`)
    } else {
      console.log('Invalid room code')
    }
    
  })
}

onMounted(() => {
  clearInterval();
  req();
})
</script>
