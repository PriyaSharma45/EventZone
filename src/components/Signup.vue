<template>
  <div id="app">
    <h1 class="title">Sign-up for Amazing events near you</h1>
    <div class="signup">
      <div class="div-input">
        <label class="form__label">Name</label>
        <input type="text" :class="{ 'form-input--error' : $v.name.model && $v.name.$invalid }" v-model="name" placeholder="Name"/>
        <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
        <div class="error" v-if="!$v.name.isAlpha">Name must contain only alphabets</div>
        <div class="error" v-if="!$v.name.required">Password is required</div>
      </div>
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
      <button class="button-signup">Sign up</button>
      <router-link tag="a" to="/login">
        Or login
      </router-link>
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


.error {
  color: red;
}


</style>
