<script setup lang="ts">
import { ref } from 'vue'


let snake = ref<number[][]>([])
let direction = 'R'
const creatSnake  = (): void => {
  for (let i = 0; i < 5; i++) {
    snake.value.push([i + 5, 7])
  }
}
creatSnake()

const moveSnake = () => {
  snake.value.forEach(pice => {
    
    console.log(pice)
  });
}

moveSnake()

const picePosition = ([x ,y]): string => {
  return `left: ${x * 30}px; top: ${y * 30}px`
}

const directionChange = (code) => {
  if (code === 'Space') {

  }
}

window.addEventListener('keydown', (e: KeyboardEvent): void => {
  if(e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'ArrowDown' || e.code === 'ArrowUp') {
    directionChange(e.code);
  }
});


</script>

<template>
  <h1>snake</h1>

  <div class="gameBox">

    <div class="ground">
      <div class="snake">
        <template v-for="(pice, index) in snake" :key="`pice-${index}`">
          <div class="pice" :style="picePosition(pice)"></div>
        </template>
      </div>

      <div class="gridBox">
        <div class="grid" v-for="(box, index) in 400" :key="`box-${index}`">{{ index }} </div>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
@import "@/assets/scss/snake.scss";
</style>