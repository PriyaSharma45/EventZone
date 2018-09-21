<template>
  <div id="app">
    <h1 class="title">Event Zone</h1>
    <h2 class="title">Sign In To Your Account</h2>
    <div class="error" v-if="authErr">{{ authErr }}</div>
    <div class="formContainer">
      <div class="div-input"> 
        <label class="form__label">Email</label>
        <input type="email"  :class="{ 'form-input--error' : $v.email.model && $v.email.$invalid }" v-model="email" placeholder="email"/>
        <div class="error" v-if="!$v.email.required && email">Email is required</div>
        <div class="error" v-if="!$v.email.email && email">Email should be in proper format</div>
      </div>
      <div class="div-input">
        <label class="form__label">Password</label>
        <input type="password"  :class="{ 'form-input--error' : $v.password.model && $v.password.$invalid }" v-model="password" placeholder=""/>
        <div class="error" v-if="!$v.password.required && password">Password is required</div>
        <div class="error" v-if="!$v.password.minLength && password">Name must have at least {{$v.password.$params.minLength.min}} letters.</div>
      </div>
      <button :disabled="!hasNoErrors" class="button-login" @click="login">Login</button>
      <router-link tag="a" to="/">
        back
      </router-link>
    </div>
  </div>
</template>

<script>
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'
import { noErrors } from '../utils'


const isAlpha = (params) => {
  return (/^[a-zA-Z]*$/).test(params)
  }

export default {
  name: 'login',
  data() {
    return {
      email : '',
      password: '',
    }
  },
  computed: {
    authErr() {
	    return this.$store.state.authErr
    },
    isAuth() {
      return this.$store.state.isAuth
    },
    hasNoErrors() {
       return noErrors(this.$v)
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  beforeMount() {
    this.$store.dispatch('clearStateAction')
  },
  methods: {
     login(){
       const userObj = {
         email: this.email,
         password: this.password
       }
       this.$store.dispatch('userAuthenticate',userObj)
       if(this.isAuth) this.$router.push({ path: `/dashboard` })
     } 
  }
}
</script>

