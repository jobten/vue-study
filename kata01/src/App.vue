<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <FormExample></FormExample> -->
    <TreeExample></TreeExample>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import FormExample from './components/form/'
import TreeExample from './components/tree/'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    // FormExample,
    TreeExample
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
