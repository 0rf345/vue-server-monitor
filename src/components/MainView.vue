<template>
  <div id="mainView">
    <div class="header"></div>
    <div class="mainBody">
      <div class="box" v-for="server in servers" :key="server.id">
        {{ server }}
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
    servers: Array(468).fill('1')
  })
}
</script>

<style>

#mainView {
  height: 100%;
  border: 1px solid red;
}

.header {
  height: 5vh;
  background-color: green;
}

.mainBody {
  background-color: DodgerBlue;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  height: 90vh;
}

.mainBody > .box {
  background-color: #f76767;
  width: 100px;
  height: 30px;
  margin: 1px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
}

.footer {
  height: 5vh;
  background-color: purple;
}

</style>
