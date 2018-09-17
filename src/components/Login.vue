<template>
  <div id="app">
    <h1 class="title">Sign In To Your Account</h1>
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
      <button class="button-login">Login</button>
    </div>
  </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'

const isAlpha = (params) => {
  return (/^[a-zA-Z]*$/).test(params);
  }

export default {
  name: 'app',
  data() {
    return {
      name: '',
      email : '',
      password: ''
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
