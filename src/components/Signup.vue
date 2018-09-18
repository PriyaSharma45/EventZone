<template>
  <div id="app">
    <h1 class="title">Event Zone</h1>
    <h2 class="title">Sign-up for Amazing events near you</h2>
    <div class="error" v-if="authErr">{{ authErr }}</div>
    <div class="signup">
      <div class="div-input">
        <label class="form__label">Name</label>
        <input type="text" :class="{ 'form-input--error' : $v.name.model && $v.name.$invalid }" v-model="name" placeholder="Name"/>
        <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
        <div class="error" v-if="!$v.name.isAlpha">Name must contain only alphabets</div>
        <div class="error" v-if="!$v.name.required">Name is required</div>
      </div>
      <div class="div-input"> 
        <label class="form__label">Email</label>
        <input type="email"  :class="{ 'form-input--error' : $v.email.model && $v.email.$invalid }" v-model="email" placeholder="email"/>
        <div class="error" v-if="!$v.email.required">Email is required</div>
        <div class="error" v-if="!$v.email.email">Email should be in proper format</div>
      </div>
      <div class="div-input">
        <label class="form__label">Password</label>
        <input type="password"  :class="{ 'form-input--error' : $v.password.model && $v.password.$invalid }" v-model="password" placeholder=""/>
        <div class="error" v-if="!$v.password.required">Password is required</div>
        <div class="error" v-if="!$v.password.minLength">Name must have at least {{$v.password.$params.minLength.min}} letters.</div>
      </div>
      <button class="button-signup" @click="signup">Sign up</button>
      <router-link tag="a" to="/login">
        Or login
      </router-link>
    </div>
  </div>
</template>

<script>
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'
import users from '../stubs/users.json'

const isAlpha = (params) => {
  return (/^[a-zA-Z]*$/).test(params);
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
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      isAlpha, 
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
     }
  }
}
</script>

<style lang="scss">

.title {
  font-weight: bold;
  color: #2c3e1e;

}

.signup {
  display: flex;
  flex-flow: column;
  border: 2px solid #ccc;
  padding: 50px;
  margin: 0 20%;
  height: 500px;
  align-content: center;
  align-items: center;
  background: #eeeeee;

}

.div-input {
  width: 100%;
  padding: 3px;
  display: flex;
  flex-flow: column;
  align-items: self-end;
  margin: 15px 10px;

  .form__label {
    color: #2c3e50;
    font-weight: bold;
    font-size: 18px;
    margin: 5px 0;
  }

  input {
    width: 100%;
    margin: 5px 0;
    padding: 8px;
    font-size: 15px;
    color: #2c3e50;
  }

  .form-input {
    border: 1px solid #ccc;
  }

  .form-input--error {
    border: 1px solid #ff0022;
  }

}

.button-signup {
  border: 0;
  border-radius: 3px;
  background: #00b4d2;
  padding: 7px;
  font-size: 18px;
  color: white;
  margin: 5px;
  width: 150px;
}

.button-signup :disabled{
  background: #ccc;
  color: white;
}

.error {
  color: red;
}


</style>
