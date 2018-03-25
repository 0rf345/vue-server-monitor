<template>
  <div id="mainView">
    <div class="header"></div>
    <div class="mainBody"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'mainView',
  components: {
  }
}
</script>

<style>

#mainView {
  height: 100%;
  border: 1px solid red;
}

.header {
  height: 10%;
  border: 1px solid green;
}

.mainBody {
  height: 85%;
  border: 1px solid yellow;
}

.footer {
  height: 5%;
  border: 1px solid blue;
}

</style>
