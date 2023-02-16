<script setup lang="ts">
import { ref } from 'vue'


let snake = ref<number[][]>([])
let direction = ref<string>('Right')
const creatSnake  = (): void => {
  for (let i = 0; i < 5; i++) {
    snake.value.push([i + 5, 7])
  }
}
creatSnake()

const moveSnake = () => {
  let count = snake.value.length
  let head = snake.value[count - 1]
  let [headX, headY] = head
  let body = [...snake.value].slice(0, count - 1)
  console.log(body, head)
  let aca = body.includes(head)
  console.log(aca)
  if (headX === 19 || headY === 19 || headX === 0 || headY === 0) {
    alert('게임종료')
    gameEnd()
    return
  }

  snake.value.splice(0, 1)
    if (direction.value === 'Left') {
      snake.value.push([headX - 1, headY])
    } else if (direction.value === 'Right') {
      snake.value.push([headX + 1, headY])
    } else if (direction.value === 'Up') {
      snake.value.push([headX, headY - 1])
    } else {
      snake.value.push([headX, headY + 1])
    }
}

let aa = setInterval(() => {
  moveSnake()
}, 1000)

const gameEnd = () => {
  clearInterval(aa)
}

setTimeout(() => {
  clearInterval(aa)
}, 7000)

const picePosition = ([x ,y]): string => {
  return `left: ${x * 30}px; top: ${y * 30}px`
}

const directionCheck = (dir) => {
  return dir === 'Left' || dir === 'Right'  ? 'row' : 'col'
}

window.addEventListener('keydown', (e: KeyboardEvent): void => {
  const beforeDirection = direction.value

  if(e.code.includes('Arrow')) {
    let keyDirection = e.code.split('Arrow')[1]
    if (directionCheck(direction.value) !== directionCheck(keyDirection)) {
      direction.value = keyDirection
    }
  }
});

const isHead = (index) => {
  return index === snake.value.length -1 ? true : false
}

</script>

<template>
  <h1>snake</h1>

  <div class="gameBox">

    <div class="ground">
      <div :class="['snake', direction]">
        <template v-for="(pice, index) in snake" :key="`pice-${index}`">
          <div class="pice" :style="picePosition(pice)"><span :class="[{'head' : isHead(index) }]"><i></i></span></div>
        </template>
      </div>

      <div class="gridBox">
        <div class="grid" v-for="(box, index) in 400" :key="`box-${index}`"></div>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
@import "@/assets/scss/snake.scss";
</style>