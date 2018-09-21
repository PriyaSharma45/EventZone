<template>
    <div class="dashboard">
        <AppBar/>
        <EventList/>
        <router-link tag="a" to="/create">
        Create new events
      </router-link>
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
        }
    },
    mounted() {
        if(isEmpty(this.events))
            this.$store.dispatch('getEventsAction')
    }
}
</script>


