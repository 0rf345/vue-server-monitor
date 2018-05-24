<template>
  <div id="AutoScroller">
    <div class="scroll-left">
      <p :style="{fontSize: fontSize + 'px', lineHeight: (fontSize - 5) + 'px'}">{{ customText || 'No input was given' }}</p>
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
      this.fontSize = this.footerHeight - 2
    }
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
  background: red;
  color: white;
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
  -moz-animation: scroll-left 30s linear infinite;
  -webkit-animation: scroll-left 30s linear infinite;
  animation: scroll-left 30s linear infinite;
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
