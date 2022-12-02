<template>
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col"></div>
      <div class="col p-4 text-center" style="border: 1px solid lightgrey">
        <h2>Log In</h2><br>
        <form v-on:submit="login">
            <input type="email" class="form-control" id="loginEmail" name="email" placeholder="example@email.com" required/><br>
            <input type="password" class="form-control" id="loginPassword" name="password" placeholder="********" required/><br>
            <input type="submit" class="btn btn-primary" value="Log in"/>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { api, client_id } from '../../const/api'
import { useRouter } from 'vue-router'
import router from "../../router"

//const router = useRouter()

export default {
  name: "Login",
  methods: {
    login: (e) => {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let login = () => {
        let data = {
          email: email,
          password: password
        }
        api.post("/user/login", data)
          .then((response) => {
            if (response.data.auth && response.data.auth === 'Success!') {
              console.log("Logged in")
              loginSpotify();
            }
            else {
              alert('Invalid E-mail or Password! ')
              console.log(response.data)
            }
          })
          .catch((errors) => {
            alert('teste')
            console.log(errors)
            console.log("Cannot log in")
          })
      }
      login()
    }
  }
}

function loginSpotify(){
  console.log(localStorage.jwt)
  window.location.href ='https://accounts.spotify.com/authorize?' + new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: 'user-read-currently-playing user-modify-playback-state',
      //redirect_uri: 'http://192.168.1.26:8000/api/user/callback',
      redirect_uri: 'http://localhost:8000/api/user/callback',
      state: localStorage.jwt
    }).toString();
}

</script>
