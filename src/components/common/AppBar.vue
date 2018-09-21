<template>
    <div class="appbar">
        <h1 class="title">Event Zone</h1>
        <div class="name">Welcome {{ user.name }}</div>
    </div>
</template>

<script>
export default {
    name: 'AppBar',
    computed: {
        user() {
	        return this.$store.state.user
        }  
    }
}
</script>
