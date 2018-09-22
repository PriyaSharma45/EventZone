import Vue from 'vue'
import Vuex from 'vuex'
import { authenticate, signUpAndAuthenticate } from './stubs/userStubFn'
import { getAllEvent, createEvent, replaceUpdatedEvent, deleteEvent, getNotification } from './stubs/eventStubFn'
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
  currentEvent: {},
  searchTerm: '',
  notifications: []
}

const store = new Vuex.Store({
    state: {
      isAuth: false,
      authErr : '',
      user : {
        name: '',
        email: '',
     },
      events: [],
      currentEvent: {},
      searchTerm: '',
      notifications: []
    },
    getters: {
      filteredArray(state) {
        if(isEmpty(state.events)) 
          return state.events
        return state.events.filter(event => event.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
         event.tags.toLowerCase().includes(state.searchTerm.toLowerCase()))
      },
      isLoggedIn: state => state.isAuth,
    },
    mutations: {
        setUserAndAuthenticate(state, payload){
          state.user.name = payload.name;
          state.user.email = payload.email;
          state.isAuth = true;
        },
        setEvents(state, payload){
          state.events = payload;
        },
        setCurrentEvent(state, payload){
          state.currentEvent = payload;
        },
        addNewEvent(state, payload){
          state.events.push(payload)
        },
        setAuthError(state, payload){
          state.authErr = payload;
          state.isAuth = false;
        },
        updateEvent(state, payload) {
          var event = state.events.find((event) => event.id === payload.id)
          Object.keys(event).forEach(key => {
            event[key] = payload[key];
          });
        },
        deleteSelected(state, payload){
          var index = state.events.findIndex((event) => event.id === payload)
          state.events.splice(index, 1)
        },
        clearState(state) {
          Object.keys(state).forEach(key => {
            state[key] = DEFAULT_STATE[key];
          });
        },
        clearCurrentEvent(state) {
          state.currentEvent = {}
        },
        setSearch(state, payload) {
          state.searchTerm = payload
        },
        clearSearch(state) {
          state.searchTerm = ''
        },
        setRegistered(state, payload){
          var regEvent = state.events.find(item => item.id === payload)
          regEvent.registered = true;
        },
        setNotifcation(state, payload){
          state.notifications = payload
        }
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
      },
      getEventsAction({ commit }){
        const event = getAllEvent()
        commit('setEvents', event)
      },
      createNewEvent({ commit }, event) {
        const newEvent = createEvent(event)
        commit('addNewEvent', newEvent);
      },
      setCurrentEventAction({ commit }, event) {
        commit('setCurrentEvent', event)
      },
      updateEventAction({ commit }, event) {
        const updatedEvent = replaceUpdatedEvent(event)
        commit('updateEvent', event)
      },
      clearCurrentEventAction({ commit }) {
        commit('clearCurrentEvent')
      },
      clearSearchAction({ commit }) {
        commit('clearSearch')
      },
      deleteSelectedEvent({ commit }, eventId){
        const id = deleteEvent(eventId)
        commit('deleteSelected', id)
      },
      setSearchAction({ commit }, searchTerm){
        commit('setSearch', searchTerm)
      },
      setRegisteredAction({ commit }, eventId){
        commit('setRegistered', eventId)
      },
      getNotifcationAction({ commit }, email){
        const notifications = getNotification(email)
        commit('setNotifcation',notifications)
      }
    }
})


export default store