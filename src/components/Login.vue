<template>
  <div id="app">
    <h1 class="title">Event Zone</h1>
    <h2 class="title">Sign In To Your Account</h2>
    <div class="error" v-if="authErr">{{ authErr }}</div>
    <div class="signup">
      <div class="div-input"> 
        <label class="form__label">Email</label>
        <input type="email"  :class="{ 'form-input--error' : $v.email.model && $v.email.$invalid }" v-model="email" placeholder="email"/>
        <div class="error" v-if="!$v.email.required">Email is required</div>
      </div>
      <div class="div-input">
        <label class="form__label">Password</label>
        <input type="password"  :class="{ 'form-input--error' : $v.password.model && $v.password.$invalid }" v-model="password" placeholder=""/>
        <div class="error" v-if="!$v.password.required">Password is required</div>
      </div>
      <button class="button-login" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'

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
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      isAlpha,      
    },
    email: {
      required
    },
    password: {
      required
    },
  },
  beforeMount() {
    console.log('bfMount');
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

<style lang="scss">

    .button-login {
        border: 0;
        border-radius: 3px;
        background: #00b412;
        padding: 7px;
        font-size: 18px;
        color: white;
        margin: 5px;
        width: 150px;
    }

</style>
