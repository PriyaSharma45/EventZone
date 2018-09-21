<template>
    <div class="appbar">
        <h1 class="title">Event Zone</h1>
        <div class="search-wrapper">
            <input type="text" class="search" v-model="searchTerm" placeholder="Tags / Title"/>
            <button @click="handleClick">Search</button>
            <button @click="clearSearch">Clear</button>
        </div>
        <div class="name">Welcome {{ user.name }}</div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
    name: 'AppBar',
    data() {
        return {
            searchTerm: '',
        }
    },
    computed: {
        user() {
	        return this.$store.state.user
        }
    },
    methods: {
        handleClick() {
            this.$store.dispatch('setSearchAction', this.searchTerm)
        },
        clearSearch() {
            this.$store.dispatch('clearSearchAction')
        }
    }
}
</script>
