<template>
<div class="holder">
    <h1 class="title" v-if="!editMode"> Register your event</h1>
    <h1 class="title" v-if="editMode"> Edit your event</h1>
    <div class="formContainer">
        <div class="div-input">
            <label class="form__label">Event name</label>
            <input :class="{ 'form-input--error' : $v.name.model && $v.name.$invalid }" v-model="name"  placeholder="What event are you planning?">
            <div class="error" v-if="!$v.name.required && name">Name is required</div>
        </div>
        <div class="div-input">
            <label class="form__label">Event Description</label>
            <textarea v-model="description" :class="{ 'form-input--error' : $v.description.model && $v.description.$invalid }" class ="description" placeholder="Let us a know more about the event."></textarea>
            <div class="error" v-if="!$v.description.required && description">Description is required</div>
        </div>
        <div class="div-input">
            <label class="form__label">Event duration</label>
            <input :class="{ 'form-input--error' : $v.duration.model && $v.duration.$invalid }" v-model="duration" placeholder="Event duration">
            <div class="error" v-if="!$v.duration.required && duration">Duration is required</div>
        </div>
        <div class="div-input">
            <label class="form__label">Event location</label>
            <input :class="{ 'form-input--error' : $v.location.model && $v.location.$invalid }" v-model="location" placeholder="Event location">
            <div class="error" v-if="!$v.location.required && location">Location is required</div>
        </div>
        <div class="div-input">
            <label class="form__label">Event fee</label>
            <input :class="{ 'form-input--error' : $v.fees.model && $v.fees.$invalid }" v-model="fees" placeholder="Event fee" type="number">
            <div class="error" v-if="!$v.fees.required && fees">Fees is required</div>
            <div class="error" v-if="!$v.fees.isNumberic">Fees should be number</div>
        </div>
        <div class="div-input">
            <label class="form__label">Max participants</label>
            <input :class="{ 'form-input--error' : $v.maxparticipants.model && $v.maxparticipants.$invalid }" v-model="maxparticipants" placeholder="Max participant" type="number">
            <div class="error" v-if="!$v.maxparticipants.required && maxparticipants">Max participants is required</div>
            <div class="error" v-if="!$v.maxparticipants.isNumberic">Max participants should be number</div>
        </div>
        <div class="div-input">
            <label class="form__label">Tag</label>
            <input :class="{ 'form-input--error' : $v.tags.model && $v.tags.$invalid }" v-model="tags" placeholder="Tag your event">
            <div class="error" v-if="!$v.tags.required && tags">Tag is required</div>
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
        <button v-if="!editMode" :disabled="!hasNoErrors" class="createButton" @click="createOrUpdateEvent">Create Event</button>
        <button v-if="editMode" :disabled="!hasNoErrors" class="updateButton" @click="createOrUpdateEvent">Update Event</button>
         <router-link tag="a" to="/dashboard">
             back
        </router-link>
    </div>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Vue from 'vue'
import { noErrors } from '../utils'
import isEmpty from 'lodash/isEmpty'

const isNumberic = (params) => {
  return (/^[0-9]*$/).test(params);
}

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
    validations: {
        name: {
            required,
        },
        description: {
            required,
        },
        duration: {
            required,
        },
        location: {
            required,
        },
        fees: {
            required,
            isNumberic
        },
        maxparticipants: {
            required,
            isNumberic
        },
        tags: {
            required,
        },
    },    
    computed: {
        currentEvent() {
            return this.$store.state.currentEvent
        },
        email() {
            return this.$store.state.user.email
        },
        hasNoErrors() {
            return noErrors(this.$v)
        }
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
        addRow() {
            this.extraFields.push(Vue.util.extend({},this.extraField))
        },
        removeField(index) {
            Vue.delete(this.extraFields, index);
        },
    },
}
</script>

