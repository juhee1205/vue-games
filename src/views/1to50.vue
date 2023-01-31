<script setup>
import { ref } from 'vue'


let numberList = ref([])
numberList.value = Array(50).fill({}).map((item, index) =>  {
  let obj = { value: 0, isDone: false }
  obj.value = index +1
  return obj
})
numberList.value.sort(() => Math.random() - 0.5)
console.log(numberList.value)


</script>

<template>
  <h1>1 to 50</h1>
  <div class="gameBox">
    <div class="top">
      <div class="btn">게임시작</div>
      <div class="time">시간</div>
    </div>
    <div class="cardList">
      <div class="card" :key="`number-${number.value}`" v-for="number in numberList">
        {{ number.value }}
      </div>
    </div>
  </div>
  
</template>

<style scoped lang="scss">
@import '@/assets/scss/1to50.scss';
</style>