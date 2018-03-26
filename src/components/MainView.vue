<template>
  <div id="mainView">
    <div class="header">
      <button @click="addServers(true)">
        MORE
      </button>
      <button @click="addServers(false)">
        less
      </button>
      <p id="ofServers">{{ count }}</p>
    </div>
    <div class="mainBody">
      <button v-for="server in servers" :key="server.id" :style=boxStyle>
        {{ server }}
      </button>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'mainView',
  components: {
  },
  data: () => ({
    count: 10,
    fontSize: 40
  }),
  methods: {
    addServers: function (add) {
      add ? this.count += 10 : this.count -= 10
      if (this.count < 100) {
        this.fontSize = 40
      } else if (this.count < 140) {
        this.fontSize = 35;
      } else if (this.count < 180) {
        this.fontSize = 30;
      } else if (this.count < 260) {
        this.fontSize = 25;
      } else if (this.count < 370) {
        this.fontSize = 20;
      } else {
        this.fontSize = 15;
      }
    }
  },
  computed: {
    servers: function () {
      return Array(this.count).fill('Serveras2222')
    },
    boxStyle: function () {
      return (
        'fontSize: ' + this.fontSize + 'px;'
      )
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

#ofServers {
  margin-top: 0;
}

button {
  background-color: #4CAF50; /* Green */
  color: white;
  border-radius: 5px;
}

</style>
