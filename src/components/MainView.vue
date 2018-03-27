<template>
  <div id="mainView">
    <div class="header">
      <button @click="addServers(true)">
        MORE
      </button>
      <button @click="addServers(false)">
        less
      </button>
      <p id="ofServers">Number of Servers: {{ count }}</p>
    </div>
    <div class="mainBody">
      <ServerView :servers=servers :fontSize=fontSize />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import ServerView from './ServerView'

export default {
  name: 'mainView',
  components: {
    ServerView
  },
  data: () => ({
    count: 10,
    fontSize: 40
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
  }
}
</script>

<style>

#mainView {
  height: 100%;
  border: 1px solid red;
}

.header {
  height: 5vh;
  background-color: peachpuff;
  text-align: center;
}

#ofServers {
  margin-top: 1vh;
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

</style>
