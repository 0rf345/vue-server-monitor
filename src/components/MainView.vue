<template>
  <div id="mainView">
    <div class="header" ref="header">
      <span :style=headerStyle>
        <button @click="addServers(true, 10)">
          MOOORE
        </button>
        <button @click="addServers(true, 1)">
          MORE
        </button>
        <button class="center" @click="addServers(false, 1)">
          less
        </button>
        <button class="center" @click="addServers(false, 10)">
          leeess
        </button>
        <span class="clock"><Clock /></span>
        <span>
          <p id="ofServers" class="center">Number of Servers: {{ count }}</p>
        </span>
      </span>
    </div>
    <div class="mainBody" ref="mainBody">
      <ServerView :parentDiv=mainBody :servers=servers :fontSize=fontSize />
    </div>
    <div class="footer" ref="footer">
      <AutoScroller :footerHeight=footerHeight />
    </div>
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
    mainBody: {},
    footerHeight: 0,
    headerStyle: 'font-size:' + 35 + 'px;' + 'margin-left: ' + 48 + 'vw;' + 'line-height: ' + 30 + 'px;'
  }),
  methods: {
    addServers: function (add, a) {
      add ? this.count += a : this.count > a ? this.count -= a : this.count = this.count
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
    this.footerHeight = this.$refs.footer.clientHeight
    this.headerStyle = 'font-size:' + (this.$refs.header.clientHeight - 5) + 'px;' + 'margin-left: ' + 30 + 'vw;' + 'line-height: ' + (this.$refs.header.clientHeight - 20) + 'px;'
  }
}
</script>

<style>

#mainView {
  height: 100%;
}

.header {
  width: 100vw;
  height: 5%;
  background-color: peachpuff;
}

#ofServers {
  margin-top: -2vh;
  width: 25%;
}

.clock {
  float: right;
  margin-right: 2vw;
  margin-top: 2vh;
}

.mainBody {
  width: 100vw;
  background-color: DodgerBlue;
  display: flex table;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  height: 90%;
  overflow: hidden;
  text-align: center;
}

.footer {
  width: 100vw;
  height: 5%;
  background-color: purple;
}

.center {
  text-align: center;
}

</style>
