<template>
    <div class="dashboard">
        <AppBar/>
    </div>      
</template>


<script>
import eventslist from '../stubs/events.json'
import AppBar from './common/AppBar.vue'
export default {
    name: 'dashboard',
    data(){
        return{
            eventslist
        }
    },
    components : {
        AppBar
    }
}
</script>

<style lang="scss">

</style>

