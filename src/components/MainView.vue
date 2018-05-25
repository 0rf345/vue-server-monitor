<template>
  <div v-if="noError" id="mainView">
    <div class="header" ref="header">
      <span :style=headerStyle>
        <span class="clock"><Clock /></span>
        <span>
          <p id="ofServers" class="center">Up:{{ upServers.length }} Down:{{ downServers.length }} Paused:{{ pausedServers.length }}</p>
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
  <div v-else id="errorScreen">
    <div id="errMsg">
      {{ errMsg }}
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
    PAUSED: {
      status: [0, 1],
      color: '#FF9626'
    },
    monitors: [],
    monitoringIntervalID: 0,
    //  Minutes * seconds in one minute * milliseconds in one second
    monitoringInterval: 5 * 60 * 1000,
    fontSize: 40,
    mainBody: {},
    footerHeight: 0,
    headerStyle: 'font-size:' + 35 + 'px;' + 'margin-left: ' + 48 + 'vw;' + 'line-height: ' + 30 + 'px;',
    noError: true,
    errMsg: 'ERROR'
  }),
  methods: {
    updateMonitors: function (testingGetMonitors) {
      let preferredGetMonitors = getMonitors
      if (testingGetMonitors) {
        console.log('We should be testing right now')
        preferredGetMonitors = testingGetMonitors
      }

      /* istanbul ignore next */
      return axios.get('/key.json')
        .then(res => {
          let apiKey = res.data.apiKey.toString()
          return preferredGetMonitors(axios, apiKey)
            .then((monitors) => {
              this.noError = true
              this.monitors = monitors.slice()
            })
            .catch((error) => {
              this.noError = false
              console.log(error)
            })
        })
        .catch(err => console.log(err))
    }
  },
  computed: {
    servers: function () {
      return this.downServers.concat(this.upServers.concat(this.pausedServers))
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
    pausedServers: function () {
      let res = this.monitors.filter(monitor => (this.PAUSED.status.includes(monitor.status)))
      return res.map(monitor => {
        let coloredMonitor = {}
        coloredMonitor.name = monitor.friendly_name
        coloredMonitor.status = monitor.status
        coloredMonitor.color = this.PAUSED.color
        return coloredMonitor
      })
    },
    count: function () {
      return this.servers.length
    },
    downServersInfo: function () {
      if (this.servers.length === 0) {
        return 'No server info has been received yet, if this persists let someone know'
      }
      if (this.downServers.length) {
        return 'The following servers are down ' + this.downServers.map(server => {
          return (' ' + server.name + ': ' + server.domain)
        }).join()
      } else {
        return 'All servers are UP or Paused'
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
  background-color: #cccccc;
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
  background-color: black;
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
  background-color: red;
}

.center {
  text-align: center;
}

#errorScreen {
  position: absolute;
  text-align: center;
  background-color: red;
  height: 100%;
  width: 100%;
}

#errMsg {
  color: white;
  margin: 0;
  position: relative;
  top: 50%;
  font-size: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
