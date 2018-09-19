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

<style>
.appbar{
    background-color: rgb(178, 178, 238);
    width: 100%;
    top: 0;
}
.appbar{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    width: inherit;
}

</style>
