<template>
<div class="holder">
    <h1 class="title" v-if="!editMode"> Register your event</h1>
    <h1 class="title" v-if="editMode"> Edit your event</h1>
    <div class="formContainer">
        <div class="div-input">
            <label class="form__label">Event name</label>
            <input v-model="name" placeholder="What event are you planning?">
        </div>
        <div class="div-input">
            <label class="form__label">Event Description</label>
            <textarea class ="description" v-model="description" placeholder="Let us a know more about the event."></textarea>
        </div>
        <div class="div-input">
            <label class="form__label">Event duration</label>
            <input v-model="duration" placeholder="Event duration">
        </div>
        <div class="div-input">
            <label class="form__label">Event location</label>
            <input v-model="location" placeholder="Event location">
        </div>
        <div class="div-input">
            <label class="form__label">Event fee</label>
            <input v-model="fees" placeholder="Event fee" number>
        </div>
        <div class="div-input">
            <label class="form__label">Max participants</label>
            <input v-model="maxparticipants" placeholder="Max participant" number>
        </div>
        <div class="div-input">
            <label class="form__label">Tag</label>
            <input v-model="tags" placeholder="Tag your event">
        </div>
        <label>Additional Fields ?</label>
        <div class="fieldaddition" v-for="(extraField, index) in extraFields" :key="index">
            <input type="text" placeholder="Field" v-model="extraField.key">
            <input type="text" placeholder="Value" v-model="extraField.value">
            <button type="button" class="removebutton" @click="removeField(index)">
                X
             </button>
        </div>
        <button class="addButton" @click="addRow">Add +</button>
        <button v-if="!editMode" class="createButton" @click="createOrUpdateEvent">Create Event</button>
        <button v-if="editMode" class="updateButton" @click="createOrUpdateEvent">Update Event</button>
         <router-link tag="a" to="/dashboard">
             back
        </router-link>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import isEmpty from 'lodash/isEmpty'

export default {
    name: 'EventCreation',
    data() {
        return{
            editMode: false,
            id: null,
            name: '',
            description: '',
            duration: '',
            location: '',
            fees: '',
            maxparticipants: '',
            tags: '',
            extraFields: [],
            extraField: {
                key: "",
                value: ""
            }
        }
    },
    computed: {
        currentEvent() {
            return this.$store.state.currentEvent
        },
        email() {
            return this.$store.state.user.email
        },
    },
    mounted(){
        if(!isEmpty(this.currentEvent)) {
            this.editMode = true
            this.id = this.currentEvent.id
            this.name = this.currentEvent.name
            this.description = this.currentEvent.description
            this.duration = this.currentEvent.duration
            this.location = this.currentEvent.location
            this.fees = this.currentEvent.fees
            this.maxparticipants = this.currentEvent.maxparticipants
            this.tags = this.currentEvent.tags
            this.extraFields = this.currentEvent.extraFields
        }
    },
    methods: {
        createOrUpdateEvent(){
            const eventObj = {
                id: this.id,
                name: this.name,
                description: this.description,
                duration: this.duration,
                location: this.location,
                fees: this.fees,
                maxparticipants: this.maxparticipants,
                tags: this.tags,
                organizeremail: this.email,
                extraFields: this.extraFields
            }
            if(this.editMode) {
                this.$store.dispatch('updateEventAction',eventObj)
                this.$store.dispatch('clearCurrentEventAction')
            }
            else
                this.$store.dispatch('createNewEvent',eventObj)
            this.$router.push({ path: `/dashboard` })
        },
        addRow: function () {
            this.extraFields.push(Vue.util.extend({},this.extraField))
        },
        removeField: function (index) {
            Vue.delete(this.extraFields, index);
        },
    },
}
</script>

