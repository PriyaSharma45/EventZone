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

<style lang="scss">
    .eventlist {
        width: inherit;
        padding: 5% 20%;
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;
    }

    .eventContainer {
        margin: 25px 10px;
    }
</style>

