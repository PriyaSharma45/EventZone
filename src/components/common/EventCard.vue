<template>
    <div class="eventcard">
        <div class="eventname">
            {{ event.name }}
        </div>
        <div class="eventDescription">
            {{ event.description }}
        </div>
        <div class="location">
            Location : {{ event.location }}
        </div>
        <div class="duration">
            Duration : {{ event.duration }}
        </div>
        <div class="fees">
            Fees : {{ event.fees }}
        </div>
        <div class="tag">
            Tag : {{ event.tags }}
        </div>
        <div class="extras" v-for="(extrafield, index) in event.extraFields" :key="index">
            {{ extrafield.key }} : {{ extrafield.value }}
        </div>
        <button v-if="userEmail !== event.organizeremail && !event.registered" @click="register" class="register">Register</button>
        <button v-if="userEmail !== event.organizeremail && event.registered" :disabled="event.registered" class="register">Registered</button>
        <button v-if="userEmail === event.organizeremail" @click="editEvent" class="edit">Edit</button>
        <button v-if="userEmail === event.organizeremail" class="delete" @click="deleteEvent">Delete</button>
    </div>
</template>

<script>
export default {
    name: 'EventCard',
    props: [ 'event' ],
    computed: {
        userEmail(){
            return this.$store.state.user.email
        },
    },
    methods: {
        editEvent(){
            this.$store.dispatch('setCurrentEventAction', this.event)
            this.$router.push({ path: `/create` })
        },
        register() {
            this.$store.dispatch('setRegisteredAction', this.event.id)
        },
        deleteEvent(){
            this.$store.dispatch('deleteSelectedEvent', this.event.id)
        }
    },
}
</script>
