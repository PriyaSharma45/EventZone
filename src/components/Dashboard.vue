<template>
    <div class="dashboard">
        <AppBar/>
        <router-link tag="a" to="/create">
             + Create Event
        </router-link>
        <EventList/>
    </div>      
</template>


<script>
import eventslist from '../stubs/events.json'
import AppBar from './common/AppBar.vue'
import EventList from './EventList.vue'
import isEmpty from 'lodash/isEmpty'

export default {
    name: 'dashboard',
    components : {
        AppBar,
        EventList
    },
    computed: {
        events() {
            return this.$store.state.events
        },
        userEmail(){
            return this.$store.state.user.email
        }
    },
    mounted() {
        if(isEmpty(this.events))
            this.$store.dispatch('getEventsAction')
        this.$store.dispatch('getNotifcationAction', this.userEmail)
    }
}
</script>


