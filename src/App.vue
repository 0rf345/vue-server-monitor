<template>
  <div id="app">
    <MainView />
  </div>
</template>

<script>
import MainView from './components/MainView'

export default {
  name: 'App',
  components: {
    MainView
  }
}
</script>

<style>
body {
  height: 100%;
}
#app {
  top: 0px;
  left: 0px;
  position: fixed;
  height: 100%;
  width: 100%;
}
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
</style>
