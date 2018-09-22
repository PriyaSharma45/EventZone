<template>
    <div class="appbar">
        <h1 class="title">Event Zone</h1>
        <div class="search-wrapper">
            <input type="text" class="search" v-model="searchTerm" placeholder="Tags / Title"/>
            <button @click="handleClick">Search</button>
            <button @click="clearSearch">Clear</button>
        </div>
        <div class="namecontainer">
            <button class="notificationUnread" v-if="notificationCount > 0" @click="toggleDropDown">{{ notificationCount }}</button>
            <button class="notificationRead" v-if="notificationCount <= 0" @click="toggleDropDown">{{ notificationCount }}</button>
            <div v-if="toggle" class="dropdown">
                <div class="notificationList" v-for="notification in notifications " :key="notification.id">
                    <div class="notificationObj"><b>{{ notification.userName }}</b> regitered for <b>{{ notification.eventName }}</b></div>
                </div>
            </div>
            <div class="name">Welcome {{ user.name }}</div>
        </div> 
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
    name: 'AppBar',
    data() {
        return {
            searchTerm: '',
            toggle: false
        }
    },
    computed: {
        user() {
	        return this.$store.state.user
        },
        notifications(){
            return this.$store.state.notifications
        },
        notificationCount(){
            return this.$store.getters.getCount
        }
    },
    methods: {
        handleClick() {
            this.$store.dispatch('setSearchAction', this.searchTerm)
        },
        clearSearch() {
            this.$store.dispatch('clearSearchAction')
        },
        toggleDropDown(){
            this.toggle = !this.toggle
            this.$store.dispatch('readNotificationAction')
        }
    }
}
</script>
