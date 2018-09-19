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
        <button v-if="userEmail !== event.organizeremail" class="register">Register</button>
        <button v-if="userEmail === event.organizeremail" class="edit">Edit</button>
    </div>
</template>

<script>
export default {
    name: 'EventCard',
    props: [ 'event' ],
    computed: {
        userEmail(){
            return this.$store.state.user.email
        }
    }
}
</script>

<style lang="scss">
.eventcard{
    width: inherit;
    border: 1px solid;
    box-shadow: 5px 10px #ccc;
    border-radius: 15px;

    div {
        text-align: left;
        margin: 10px;
        padding: 5px;
    }
}
.register,.edit{
    margin: 0 0 10px 5px;
    padding: 10px;
    font-size: 16px;
    color: #eeeeef;
    border: 0;
    border-radius: 15px;
    background: green;
}
.eventname{
    font-size:  25px;
    font-weight: bold;
}
</style>
