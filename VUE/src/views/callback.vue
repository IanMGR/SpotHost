<template>
  <div>
    <div id="not-logged" class="container-fluid">
      <div class="row">
        <div class="content1 col-6">
          <img src="..\assets\imagem.jpg" alt="test" class="img-fluid">
        </div>
        <div class="content2 col" style="margin-top:auto;margin-bottom:auto;text-align: center">
          <h1>Lorem Ipsum</h1>
          <p style="text-align:justify">dolor sit amet, consectetur adipiscing elit. Mauris pharetra convallis ultricies. Donec in ante a risus vehicula tristique eu eget leo. Phasellus quis volutpat risus. Fusce ut pulvinar nisl. Nullam maximus nec lacus egestas pellentesque. Quisque interdum vestibulum elit, eget placerat tortor. Sed euismod dignissim nisl at tristique. Etiam dapibus tristique libero, sed euismod justo semper eget.</p>
          <button type="button" class="m-2 btn btn-primary" @click="router.push('/login')"> Log in</button>
        </div>
      </div>
    </div>
    <div id="logged" class="container-fluid">
      <div class="row">
        <div class="content1 col-8">
          <h1>My Rooms: <button type="button" class="m-2 btn btn-primary" @click="router.push('/host')"> Host</button></h1>
          <table class="table table-bordered">
            <tbody>
            <tr v-for="(data, idx) in datas" :key="idx">
              <td><span>{{ data.dscr }} - {{ data.code }}</span> <button type="button" class="btn m-2 btn-danger" @click="deleteRoom(data.id)" title="Delete" style="float: right">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
          </table>
          <button type="button" class="m-2 btn btn-primary" data-bs-toggle="modal"  data-bs-target="#modalRoomCreation" > Add Room</button>
        </div>
        <div class="content2 p-2 m-3 col align-content-center" style="border: 1px solid lightgrey;margin-top:auto;margin-bottom:auto;text-align: center">
          <input type="text" class="form-control" id="room_code" name="room_code" placeholder="Enter room code here..."/><br>
          <button type="button" class=" form-control btn btn-primary" @click="goToRoom()"> Enter Room</button>
        </div>
      </div>
      <!--MODAL-->
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
              <button type="button" class="m-2 btn btn-primary" @click="addRoom()"> Submit</button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>
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

function deleteRoom(code) {
  api.get(`room/${code}/delete`)
  .then(resp => {})
  location.reload()
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

<style scoped>
  /*.container-fluid{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2%;
  }

  .content1{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .content2{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 10;
  }

  img {
    max-width: 100%;
    max-height: 100%;
} */
</style>