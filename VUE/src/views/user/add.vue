<template>
<div>
  <div class="container">

      <form @submit.prevent="submitForm">
        
          <div class="form-group">
             <label for="exampleInputEmail1" class="mb-1">Name:</label><br/>
            <input v-model="name" type="text" id="name" name="name" placeholder="Insert name" required>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">E-mail:</label>
            <input v-model="email" class="mt-1 mb-2 form-control form-control-sm" type="text" placeholder="emailexample@wave.com">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Password:</label>
            <input v-model="pwd" class="mt-1 mb-2 form-control form-control-sm" type="password">
          </div>
          <button class="btn btn-info btn-sm m-2" type="submit">Submit</button>
          <button class="btn btn-info btn-sm" @click="back()">Back</button>
      </form>
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