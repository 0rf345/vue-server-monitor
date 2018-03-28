<template>
  <div id="AutoScroller">
    <div class="scroll-left">
      <p>Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... Scroll left... </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutoScroller',
  props: ['customText']
}
</script>

<style scoped>
#AutoScroller {
  width: 300px;
}

.scroll-left {
  overflow: hidden;
  position: relative;
  background: white;
  color: black;
  border: 1px solid black;
  height: 20px;
}

.scroll-left p {
  position: absolute;
  white-space: nowrap;
  width: 100%;
  height: 100%;
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
