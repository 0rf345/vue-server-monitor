<template>
  <div id="ServerView" ref="serv">
    <button v-for="(server, index) in servers" :ref="'ref'+index" :key="index" :style="{ fontSize: fontSize + 'px', backgroundColor: server.color }">
      {{ server.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ServerView',
  data: () => ({
    cheat: true,
    previousF: 100,
    startingF: 300
  }),
  props: ['servers', 'parentDiv'],
  methods: {
    updateF: function (newF) {
      this.previousF = newF
    }
  },
  computed: {
    fontSize: function () {
      let previousF = this.startingF
      let numOfServers = this.servers.length
      let bWidth = previousF * 0.519 * 12 + 16
      let bHeight = previousF * 1.15 + 6

      /* istanbul ignore next */
      if (!this.parentDiv.width && this.cheat) {
        this.updateF(previousF)
        return previousF
      }

      let width = this.parentDiv.width
      let height = this.parentDiv.height
      let mod = 0
      let rowFit = Math.floor(width / bWidth)

      /* istanbul ignore next */
      if (numOfServers % rowFit >= 1) {
        mod = 1
      }

      while (height < (Math.floor(numOfServers / rowFit) + mod) * bHeight) {
        previousF--
        bWidth = previousF * 0.519 * 12 + 16
        bHeight = previousF * 1.15 + 6
        rowFit = Math.floor(width / bWidth)
        if (numOfServers % rowFit >= 1) {
          mod = 1
        } else {
          mod = 0
        }
      }
      this.updateF(previousF)
      return previousF
    }
  },
  mounted: function () {
    this.cheat = false
  }
}
</script>

<style scoped>

#ServerView {
  margin-top: 1px;
}

button {
  background-color: #4CAF50; /* Green */
  color: white;
  border-radius: 5px;
}

</style>
