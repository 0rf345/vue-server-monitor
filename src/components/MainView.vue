<template>
  <div id="mainView">
    <div class="header"></div>
    <div class="mainBody">
      <div class="statusBar"></div>
      <div class="serverBoxes">
        <div class="box" v-for="server in servers" :key="server.id">{{ server }}</div>
      </div>
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
    count: 1,
    servers: Array(200).fill(10)
  })
}
</script>

<style>

#mainView {
  height: 100%;
  border: 1px solid red;
}

.header {
  height: 5%;
  border: 1px solid green;
}

.mainBody {
  height: 90%;
  border: 1px solid yellow;
}

.footer {
  height: 5%;
  border: 1px solid blue;
}

.mainBody > .statusBar {
  height: 10%;
  border: 1px solid indianred;
}

.mainBody > .serverBoxes {
  height: 90%;
  border: 1px solid orange;
}

.serverBoxes > .box {
  position: relative;
  float: left;
  height: 10%;
  width: 5%;
  border: 1px solid lightgreen;
}

</style>
