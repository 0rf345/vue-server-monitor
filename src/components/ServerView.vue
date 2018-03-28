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

      if (!this.parentDiv.width && this.cheat) {
        this.updateF(previousF)
        return previousF
      }

      let width = this.parentDiv.width
      let height = this.parentDiv.height
      let mod = 0
      let rowFit = Math.floor(width / bWidth)
      console.log(width % bWidth)

      if (numOfServers % rowFit >= 1) {
        mod = 1
      } else {
        mod = 0
      }

      console.log('--------------------------------------')
      while (height < (Math.floor(numOfServers / rowFit) + mod) * bHeight) {
        console.log('Height of parent: ' + height + ' Height of children: ' + ((numOfServers / rowFit) * bHeight))
        //  console.log('rowfit: ' + rowFit)
        previousF--
        bWidth = previousF * 0.519 * 12 + 16
        bHeight = previousF * 1.15 + 6
        rowFit = Math.floor(width / bWidth)
        if (numOfServers % rowFit >= 1) {
          mod = 1
        } else {
          mod = 0
        }
        console.log(rowFit)
        console.log('Height of parent: ' + height + ' bHeight: ' + bHeight + ' vertBs: ' + Math.floor(numOfServers / rowFit) + mod + ' mod: ' + mod)
        console.log('Width of parent: ' + width + ' bWidth' + bWidth)
        console.log('-')
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

button {
  background-color: #4CAF50; /* Green */
  color: white;
  border-radius: 5px;
}

</style>
