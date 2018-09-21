<template>
    <div class="eventlist">
        <div class="eventContainer" v-for="event in events" :key="event.id">
            <EventCard :event="event"/>
        </div>
    </div>
</template>

<script>
import EventCard from './common/EventCard.vue'
export default {
    name:'EventList',
    components : {
        EventCard
    },
    computed: {
        events(){
            return this.$store.state.events
        } 
    }
}
</script>


