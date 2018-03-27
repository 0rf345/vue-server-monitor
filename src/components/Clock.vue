<template>
  <div id="Clock">
    {{ date.toLocaleTimeString() }}
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data: () => ({
    timer: null,
    date: new Date()
  }),
  methods: {
    tick: function () {
      this.date = new Date()
    }
  },
  computed: {
  },
  mounted: function () {
    this.timer = setInterval(() => this.tick(), 1000)
  }
}
</script>

<style>

</style>
