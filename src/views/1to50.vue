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

let time = ref(90)
let aa = null
const timer = () => {
  aa = setInterval(() => {
  if (time.value == 0) {
    clearInterval(aa)
    alert('타임오버')
  }
  time.value --
}, 1000)
}
let isPlay = ref(false)
const gameStart = () => {
  isPlay.value = true
  time.value = 90
  clearInterval(aa)
  init()
  suffle()
  timer()
}
let number = 1
const clear = (n) => {
  if (!isPlay.value) {
    alert('게임 시작을 헤주세요') 
    return
  }

  if (number === numberList.value[n].value) {
    if(number ===  50) {
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
  </div>

</template>

<style scoped lang="scss">
@import '@/assets/scss/1to50.scss';
.v-move {
  transition: transform 1s;
}
</style>