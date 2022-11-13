<template>
<div>
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col"></div>
      <div class="col p-4 text-center" style="border: 1px solid lightgrey">
        <h2>Create Account</h2><br>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input v-model="name" type="text" id="name" class="form-control" name="name" placeholder="Insert name" required><br>
            <input v-model="email" class="form-control" type="text" placeholder="emailexample@wave.com"><br>
            <input v-model="pwd" class="form-control" type="password" placeholder="********"><br>
          </div>
          <button class="btn btn-secondary m-2" @click="back()">Back</button>
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
      <div class="col"></div>
      
    </div>
  </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from "vue";
import { api } from "../../const/api";

const router = useRouter()

const name = ref('')
const email = ref('')
const pwd = ref('')

function submitForm() {
  api.post('user/add', {
    name: name.value,
    email: email.value,
    pwd: pwd.value
  })
  .then(() => {
    router.push('/')
  })
}

function back() {
    router.push('/')
  }
</script>