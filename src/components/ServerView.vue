<template>
  <div id="ServerView" ref="serv">
    <button v-for="(server, index) in servers" :ref="'ref'+index" :key="index" :style="{ fontSize: fontSize + 'px'}">
      {{ server }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ServerView',
  data: () => ({
    cheat: 1,
    previousF: 100
  }),
  props: ['servers', 'parentDiv'],
  methods: {
  },
  computed: {
    fontSize: function () {
      let previousF = 100
      let numOfServers = this.servers.length * this.cheat
      let bWidth = previousF * 0.518 * 12 + 16
      let bHeight = previousF * 1.15 + 6
      if (!this.parentDiv.width) {
        console.log('I was here')
        return previousF
      }
      let width = this.parentDiv.width
      let height = this.parentDiv.height
      let rowFit = Math.floor(width / bWidth)
      while (height < (numOfServers / rowFit) * bHeight) {
        previousF--
        bWidth = previousF * 0.518 * 12 + 16
        bHeight = previousF * 1.15 + 6
        rowFit = Math.floor(width / bWidth)
      }
      return previousF
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
