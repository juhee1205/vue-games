<script setup lang="ts">
import { ref } from 'vue'


let snake = ref<number[][]>([])
let direction = 'L'
const creatSnake  = (): void => {
  for (let i = 0; i < 5; i++) {
    snake.value.push([i + 5, 7])
  }
}
creatSnake()

const moveSnake = () => {
  let count = snake.value.length
  let [lastX, lastY] = snake.value[count - 1]
  let [firstX, firstY] = snake.value[0]
  if (lastX === 19 || lastY === 19 || firstX === 0 || firstY === 0) {
    alert('게임종료')
    gameEnd()
    return
  } 

  snake.value.splice(0, 1)
    if (direction === 'Left') {
      snake.value.push([lastX - 1, lastY])
    } else if (direction === 'Right') {
      snake.value.push([lastX + 1, lastY])
    } else if (direction === 'Up') {
      snake.value.push([lastX, lastY - 1])
    } else {
      snake.value.push([lastX, lastY + 1])
    }
}

let aa = setInterval(() => {
  moveSnake()
}, 1000)

const gameEnd = () => {
  clearInterval(aa)
}

// setTimeout(() => {
//   clearInterval(aa)
// }, 7000)

const picePosition = ([x ,y]): string => {
  return `left: ${x * 30}px; top: ${y * 30}px`
}

window.addEventListener('keydown', (e: KeyboardEvent): void => {
  const beforeDirection = direction
  
  if(e.code.includes('Arrow')) {
    direction = e.code.split('Arrow')[1]
    console.log(direction)
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