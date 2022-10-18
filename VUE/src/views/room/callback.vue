<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img :src="'../../src/assets/logo.png'"  width="300">
            </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
             <router-link to="/add"> <a class="nav-link">Agendar alimentação</a></router-link>
            </div>
          </div>
        </div>
    </nav>
    <button type="button" class="m-2 btn btn-info btn-sm" data-bs-toggle="modal"  data-bs-target="#modalDispensado" @click="atualizarPorcao(1)"> Atualizar Porção</button>

    <div class="container">
      <div class="row align-items-end">
          <div class="col">
            <h1>Horários:</h1>
            <table class="table-light">
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>dia da semana</th>
                  <th>dispensadoDia</th>
                </tr>
                <tr v-for="(dado, idx) in dados" :key="idx">
                  <td>{{ dado.id }}</td>
                  <td>{{ dado.dscr }}</td>
                  <td>{{ dado.code }}</td>
                  <td>{{ dado.host_id }}</td>
                  <td>
                    <button type="button" class="btn btn-primary p-2 m-2" @click="editar(dado.id)" title="Editar"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-warning" @click="deletar(dado.id)" title="Deletar"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
            </table>
        </div>
      </div>
    </div>
    <!-- Modal dispensado -->
  <div class="modal fade" id="modalDispensado" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal dispensar</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Porção única liberada.
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
import { defineProps, onMounted, ref } from 'vue'
import { api, client_id } from '../../const/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  code: String
})

const dados = ref([])

function req() {
  console.log(document.cookie)
  api.get('track/current', {headers: {"Cookie": document.cookie }})
  .then(resp => resp.data)
}

function login(){
  api.get('user/login')
  .then(resp => {alert('Loged in!');})
  window.location.href ='https://accounts.spotify.com/authorize?' + new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: 'user-read-currently-playing user-modify-playback-state',
      redirect_uri: 'http://localhost:3000/',
      state: 123456789
    }).toString();
}

function deletar(id) {
  api.get(`horario/${id}/delete`)
  .then(() => req())
}

function editar(id) {
  router.push(`/edit/${id}`)
}

function atualizarPorcao(id) {
  api.get(`porcaoUnica/${id}`)
  .then(resp => {
    // alert(JSON.stringify(resp))
  })
}

/*  this.timer = setInterval(() => {
    this.countDown()
  }, 1000)
data(() => {
  return {
    timer: null
  }
})

beforeDestroy(() => {
  clearInterval(this.timer)
})*/

onMounted(() => {
  //login();
  req();
  //setInterval(() => req(), 1000);

})

</script>
