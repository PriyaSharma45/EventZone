<template>
    <div class="dashboard">
        <AppBar/>
        <EventList/>
    </div>      
</template>


<script>
import eventslist from '../stubs/events.json'
import AppBar from './common/AppBar.vue'
import EventList from './EventList.vue'
export default {
    name: 'dashboard',
    components : {
        AppBar,
        EventList
    },
    mounted() {
        this.$store.dispatch('getEventsAction')
    }
}
</script>

<style lang="scss">

</style>

