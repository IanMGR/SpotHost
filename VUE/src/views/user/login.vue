<template>
  <div>
        <h2>Login</h2>
        <form v-on:submit="login">
            <input type="text" name="email"/><br>
            <input type="password" name="password"/><br>
            <input type="submit" value="Login"/>
        </form>
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
            console.log("Logged in")
            loginSpotify();
          })
          .catch((errors) => {
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
      redirect_uri: 'http://192.168.1.26:8000/api/user/callback',
      state: localStorage.jwt
    }).toString();
}

</script>
