<template>
  <div id="mainView">
    <div class="header" ref="header">
      <span :style=headerStyle>
        <!-- DEPRECATED
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
        -->
        <span class="clock"><Clock /></span>
        <span>
          <!-- DEPRECATED
          <p id="ofServers" class="center">Number of Servers: {{ count }}</p>
          -->
          <p id="ofServers" class="center">Up: {{ upServers.length }} Down: {{ downServers.length }} InBetween: {{ inBetweenServers.length }}</p>
        </span>
      </span>
    </div>
    <div class="mainBody" ref="mainBody">
      <ServerView :parentDiv=mainBody :servers=servers :fontSize=fontSize />
    </div>
    <div class="footer" ref="footer">
      <AutoScroller :customText=downServersInfo :footerHeight=footerHeight />
    </div>
  </div>
</template>

<script>
import ServerView from './ServerView'
import Clock from './Clock'
import AutoScroller from './AutoScrollingText'
import { getMonitors } from './monitoringAPI'
import axios from 'axios'

export default {
  name: 'mainView',
  components: {
    ServerView, Clock, AutoScroller
  },
  data: () => ({
    UP: {
      status: [2],
      color: '#4CAF50'
    },
    DOWN: {
      status: [8, 9],
      color: '#FF0C0C'
    },
    INBETWEEN: {
      status: [0, 1],
      color: '#FF9626'
    },
    monitors: [],
    monitoringIntervalID: 0,
    monitoringInterval: 5 * 60 * 1000,
    fontSize: 40,
    mainBody: {},
    footerHeight: 0,
    headerStyle: 'font-size:' + 35 + 'px;' + 'margin-left: ' + 48 + 'vw;' + 'line-height: ' + 30 + 'px;'
  }),
  methods: {
    addServers: function (add, a) {
      add ? this.count += a : this.count > a ? this.count -= a : this.count = this.count
    },
    updateMonitors: function () {
      getMonitors(axios).then((response) => {
        this.monitors = response.slice()
      })
    }
  },
  computed: {
    servers: function () {
      return this.downServers.concat(this.inBetweenServers.concat(this.upServers))
    },
    upServers: function () {
      let res = this.monitors.filter(monitor => (this.UP.status.includes(monitor.status)))
      return res.map(monitor => {
        let coloredMonitor = {}
        coloredMonitor.name = monitor.friendly_name
        coloredMonitor.status = monitor.status
        coloredMonitor.color = this.UP.color
        return coloredMonitor
      })
    },
    downServers: function () {
      let res = this.monitors.filter(monitor => (this.DOWN.status.includes(monitor.status)))
      return res.map(monitor => {
        let coloredMonitor = {}
        coloredMonitor.name = monitor.friendly_name
        coloredMonitor.status = monitor.status
        coloredMonitor.color = this.DOWN.color
        coloredMonitor.domain = monitor.url
        return coloredMonitor
      })
    },
    inBetweenServers: function () {
      let res = this.monitors.filter(monitor => (this.INBETWEEN.status.includes(monitor.status)))
      return res.map(monitor => {
        let coloredMonitor = {}
        coloredMonitor.name = monitor.friendly_name
        coloredMonitor.status = monitor.status
        coloredMonitor.color = this.INBETWEEN.color
        return coloredMonitor
      })
    },
    count: function () {
      return this.servers.length
    },
    downServersInfo: function () {
      if (this.downServers.length) {
        return 'The following servers are down ' + this.downServers.map(server => {
          return (' ' + server.name + ': ' + server.domain)
        }).join()
      } else {
        return 'All server are UP or inbetween'
      }
    }
  },
  mounted: function () {
    this.mainBody.width = this.$refs.mainBody.clientWidth
    this.mainBody.height = this.$refs.mainBody.clientHeight
    this.footerHeight = this.$refs.footer.clientHeight
    this.headerStyle = 'font-size:' + (this.$refs.header.clientHeight - 5) + 'px;' + 'margin-left: ' + 30 + 'vw;' + 'line-height: ' + (this.$refs.header.clientHeight - 20) + 'px;'
    this.updateMonitors()
    this.monitoringIntervalID = setInterval(this.updateMonitors, this.monitoringInterval)
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
