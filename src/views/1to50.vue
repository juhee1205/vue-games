<script setup>
import { ref } from 'vue'


let numberList = ref([])
const init = () => {
  numberList.value = Array(50).fill({}).map((item, index) =>  {
    let obj = { value: 0, isDone: false }
    obj.value = index +1
    return obj
  })
}
init()

const suffle = () => {
  numberList.value.sort(() => Math.random() - 0.5)
}

let time = ref(0)
const gameStart = () => {
  time.value = 0
  init()
  suffle()
  setInterval(() => {
    time.value ++
  }, 1000)
}
let number = 1
const clear = (n) => {

  if (number === numberList.value[n].value) {
    if (number ===  50) {
      alert('게임끝')
    }
    number ++
    numberList.value[n].isDone = true

  }
}
</script>

<template>
  <h1>1 to 50</h1>
  <div class="gameBox">
    <div class="top">
      <div class="time">{{ time }}초</div>
      <div class="btn" @click="gameStart">게임시작</div>
    </div>
    <div class="cardList">
      <transition-group>
        <template
          :key="`number-${number.value}`"
          v-for="(number, index) in numberList">
          <div :class="['card', { clear : number.isDone}]" @click="clear(index)" >
            {{ number.value }}
          </div>
        </template>
      </transition-group>
    </div>

    <!--Waves Container-->
    <!-- <div class="wavesBox">
      <svg class="waves"
      viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>s
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(230,173,152,0.7)" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(228,190,175,0.5)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fecfbd" />
      </g>
      </svg>
    </div> -->

    <div class="animationBox">
      <div>
      <template v-for="(item, index) in 20" :key="`fish1-${index}`">
        <div class="icon fish1"><font-awesome-icon icon="fa-solid fa-fish" /></div>
      </template>
      </div>

      <div>
      <template v-for="(item, index) in 20" :key="`fish2-${index}`">
        <div class="icon fish2"><font-awesome-icon icon="fa-solid fa-fish-fins" /></div>
      </template>
      </div>

      <div>
      <template v-for="(item, index) in 20" :key="`shrimp-${index}`">
        <div class="icon shrimp"><font-awesome-icon icon="fa-solid fa-shrimp" /></div>
      </template>
      </div>
    </div>


  </div>

</template>

<style scoped lang="scss">
@import '@/assets/scss/1to50.scss';

.v-move {
  transition: transform 1s;
}
</style>