<template>
  <div id="AutoScroller">
    <div class="scroll-left">
      <p :style="{fontSize: fontSize + 'px', lineHeight: (fontSize - 5) + 'px'}">Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutoScroller',
  props: ['customText', 'footerHeight'],
  data: () => ({
    fontSize: 20
  }),
  watch: {
    footerHeight: function () {
      console.log(this.footerHeight)
      this.fontSize = this.footerHeight - 2
    }
  },
  computed: {
    pStyle: () => (
      'font-size: ' + this.fontSize + 'px;' +
      'line-height: ' + this.fontSize + 'px;'
    )
  }
}
</script>

<style scoped>
#AutoScroller {
  width: 100%;
  height: 100%;
}

.scroll-left {
  overflow: hidden;
  height: 100%;
  position: relative;
  background: white;
  color: black;
  border: 1px solid black;
}

.scroll-left p {
  position: absolute;
  white-space: nowrap;
  width: 100%;
  margin: 0;
  /* line-height: 50px; */
  text-align: center;
  /* Starting position */
  -moz-transform:translateX(100%);
  -webkit-transform:translateX(100%);
  transform:translateX(100%);
  /* Apply animation to this element */
  -moz-animation: scroll-left 45s linear infinite;
  -webkit-animation: scroll-left 45s linear infinite;
  animation: scroll-left 45s linear infinite;
}
/* Move it (define the animation) */
@-moz-keyframes scroll-left {
  0% { -moz-transform: translateX(100%); }
  100% { -moz-transform: translateX(-100%); }
}
@-webkit-keyframes scroll-left {
  0% { -webkit-transform: translateX(100%); }
  100% { -webkit-transform: translateX(-100%); }
}
@keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%); /* Browser bug fix */
    -webkit-transform: translateX(100%); /* Browser bug fix */
    transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%); /* Browser bug fix */
    -webkit-transform: translateX(-100%); /* Browser bug fix */
    transform: translateX(-100%);
  }
}
</style>
