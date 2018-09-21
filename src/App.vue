<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
html, body{
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  margin: 0px;
}
</style>

<style lang="scss">
@import './styles/signup';
@import './styles/login';
@import './styles/appBar';
@import './styles/eventCard';
@import './styles/eventList';
@import './styles/eventCreation';


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: inherit;
  width: inherit;
}
</style>
