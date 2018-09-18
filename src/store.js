import Vue from 'vue'
import Vuex from 'vuex'
import { authenticate, signUpAndAuthenticate } from './stubs/userStubFn'
import isEmpty from 'lodash/isEmpty'

Vue.use(Vuex)

const DEFAULT_STATE = {
  isAuth: false,
  authErr : '',
  user : {
    name: '',
    email: '',
  },
  events: [],
};

const store = new Vuex.Store({
    state: {...DEFAULT_STATE},
    mutations: {
        setUserAndAuthenticate(state, userObj){
          state.user.name = userObj.name;
          state.user.email = userObj.email;
          state.isAuth = true;
        },
        setEvents(state, events){
          state.events = events;
        },
        setAuthError(state, err){
          state.authErr = err;
          state.isAuth = false;
        },
        clearState(state) {
          Object.keys(state).forEach(key => {
            state[key] = DEFAULT_STATE[key];
          });
        },
    },
    actions: {
      userAuthenticate({ commit }, userObj){
        const { email, password } = userObj
        const { authUser, authErr } = authenticate(email, password)
        if(isEmpty(authErr) && authUser)
        {
          commit('setUserAndAuthenticate', authUser)
        }
        else {
          commit('setAuthError', authErr)
        } 
      },
      saveUser({ commit }, userObj){
        const{ email, name, password } = userObj
        const { authUser, authErr } = signUpAndAuthenticate(name, email, password)
        if(isEmpty(authErr) && authUser)
        {
          commit('setUserAndAuthenticate', authUser)
        }
        else {
          commit('setAuthError', authErr)
        } 
      },
      clearStateAction({ commit }) {
        commit('clearState')
      }
    }
})


export default store