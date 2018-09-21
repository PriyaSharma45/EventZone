<template>
  <div id="app">
    <h1 class="title">Event Zone</h1>
    <h2 class="title">Sign-up for Amazing events near you</h2>
    <div class="error" v-if="authErr">{{ authErr }}</div>
    <div class="formContainer">
      <div class="div-input">
        <label class="form__label">User Name</label>
        <input type="text" :class="{ 'form-input--error' : $v.name.model && $v.name.$invalid }" v-model="name" placeholder="Name"/>
        <div class="error" v-if="!$v.name.minLength && name">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
        <div class="error" v-if="!$v.name.required && name">Name is required</div>
      </div>
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
      <button :disabled="!hasNoErrors" class="button-signup" @click="signup">Sign up</button>
      <router-link tag="a" to="/login">
        Or login
      </router-link>
    </div>
  </div>
</template>

<script>
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'
import { noErrors } from '../utils'

const isAlpha = (params) => {
  return (/^[a-zA-Z]\s[a-zA-Z]*$/).test(params);
  }

export default {
  name: 'signup',
  data() {
    return {
      name: '',
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
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,     
    },
    password: {
      required,
      minLength: minLength(8),
    }
  },
  mounted() {
    this.$store.dispatch('clearStateAction')
  },
  methods: {
    signup(){
       const userObj = {
         email: this.email,
         name: this.name,
         password: this.password
       }
       this.$store.dispatch('saveUser',userObj)
       if(this.isAuth) this.$router.push({ path: `/dashboard` })
     },
  }
}
</script>

