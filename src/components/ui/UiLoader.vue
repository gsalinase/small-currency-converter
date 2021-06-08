<template>
  <div class="loader">
    <div class="loader--container">
      <div class="loader--wave"></div>
      <div class="loader--wave"></div>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  }
}
</script>

<style scoped>
.loader {
    position: absolute;
    margin: auto;
    overflow: hidden;
    border-radius: 50%;
  
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.loader--container {
  left: 50%;
  top: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  animation: loading 20s linear infinite;
}

.loader--wave {
  width: 280px;
  height: 280px;
  background: #291D72;
  border-radius: 45%;
  transform-style: preserve-3d;
  transform-origin: center;
  animation: rotate 2.5s linear infinite;
  margin-top: 15px;
  margin-left: -50%;
  position: absolute;
}

.loader--wave:nth-of-type(1) {
  margin-top: 20px;
  animation-duration: 2.1s;
  animation-direction: reverse;
  z-index:1;
}
  
.loader--wave:nth-of-type(2) {
  animation-duration: 2.5s;
  border-radius: 41%;
  animation-direction: normal;
  background: #A79EE6;
}

@keyframes rotate {
  0% {
    transform: rotate(0) translate(0,0);
  }
  45% {
    transform: rotate(90deg) translate(15px, 15px);
  }
  100% {
    transform: rotate(180deg) translate(0, 0);
  }
}

@keyframes loading {
  0% {
    transform: translate(0, 80%);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 80%);
  }
}
</style>