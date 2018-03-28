<template>
  <div id="mainView">
    <div class="header">
      <span style="margin-left: 48vw; ">
        <button @click="addServers(true)">
          MORE
        </button>
        <button class="center" @click="addServers(false)">
          less
        </button>
      </span>
      <span class="clock"><Clock /></span>
      <span>
        <AutoScroller style="border: 2px dashed red;" />
        <p id="ofServers" class="center">Number of Servers: {{ count }}</p>
      </span>
    </div>
    <div class="mainBody" ref="mainBody">
      <ServerView :parentDiv=mainBody :servers=servers :fontSize=fontSize />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import ServerView from './ServerView'
import Clock from './Clock'
import AutoScroller from './AutoScrollingText'

export default {
  name: 'mainView',
  components: {
    ServerView, Clock, AutoScroller
  },
  data: () => ({
    count: 10,
    fontSize: 40,
    mainBody: {}
  }),
  methods: {
    addServers: function (add) {
      add ? this.count += 10 : this.count > 9 ? this.count -= 10 : this.count = this.count
    }
  },
  computed: {
    servers: function () {
      return Array(this.count).fill('Serveras2222')
    }
  },
  mounted: function () {
    this.mainBody.width = this.$refs.mainBody.clientWidth
    this.mainBody.height = this.$refs.mainBody.clientHeight
  }
}
</script>

<style>

#mainView {
  height: 100%;
}

.header {
  height: 5vh;
  background-color: peachpuff;
}

#ofServers {
  margin-top: -2vh;
}

.clock {
  float: right;
  margin-right: 2vw;
  margin-top: 2vh;
  font-size: 20px;
}

.mainBody {
  background-color: DodgerBlue;
  display: flex table;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  height: 90vh;
  overflow: hidden;
  text-align: center;
}

.footer {
  height: 5vh;
  background-color: purple;
}

.center {
  text-align: center;
}

</style>
