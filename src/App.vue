<template>
    <div id="app">
        <Header />
        <router-view class="router-view"></router-view>
    </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'app',
  components: {
      Header,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router-view {
    margin-top: 30px;
}
</style>
