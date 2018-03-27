<template>
  <div id="ServerView">
    <button v-for="server in servers" :key="server.id" :style="{ fontSize: fontSize + 'px'}">
      {{ server }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ServerView',
  data: () => ({
  }),
  props: ['servers'],
  methods: {
  },
  computed: {
    fontSize: function () {
      let numOfServers = this.servers.length
      if (numOfServers < 100) {
        return 40
      } else if (numOfServers < 140) {
        return 35
      } else if (numOfServers < 180) {
        return 30
      } else if (numOfServers < 260) {
        return 25
      } else if (numOfServers < 370) {
        return 20
      } else {
        return 15
      }
    }
  }
}
</script>

<style scoped>

button {
  background-color: #4CAF50; /* Green */
  color: white;
  border-radius: 5px;
}

</style>
