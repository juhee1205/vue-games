<script setup lang="ts">
import { ref } from 'vue'


let isPlay = ref<boolean>(true)
let snake = ref<number[][]>([])
let direction = ref<string>('Right')


let snakeLength: number = 0
let head: number[] = [0,0]
let bodyText: string[] = []
let tail: number[] = [0,0]

const creatSnake  = (): void => {
  for (let i = 0; i < 5; i++) {
    snake.value.push([i + 9, 7])
  }
}
creatSnake()

let food = ref<number[]>([])

const getRandomPosition = (): void => {
  let foodX: number = Math.floor(Math.random() * 20)
  let foodY: number = Math.floor(Math.random() * 20)
  food.value = [foodX, foodY]
}
const createFood = (): void => {
  getRandomPosition()
}
createFood()
const isFood = () => {
  if (food.value.join(',') === head.join(',')) {
    console.log('먹었따')
    snake.value.splice(0,0, [0,0])
    setTimeout(createFood, 2000)
  }
}

const isGameOver = (): boolean => {
  let headText: string = head.join(',')
  let headX = head[0]
  let headY = head[1]

  const right = direction.value === 'Right' && headX >= 19
  const left = direction.value === 'Left' && headX <= 0
  const up = direction.value === 'Up' && headY <= 0
  const down = direction.value === 'Down' && headY >= 19
  const bodyCross = bodyText.indexOf(headText) !== -1

  if (bodyCross || right || left || up || down) {
    isPlay.value = false
    console.log('게임종료')
    gameEnd()
    return false
  }
  return true
}

const moveSnake = () => {

  snakeLength = snake.value.length
  head = snake.value[snakeLength - 1]
  tail = snake.value[0]
  bodyText = snake.value.slice(0, snakeLength - 1).map(item => item.join(','))
  let [headX, headY]: number[] = head

  if (isGameOver()) {
    isFood()

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

}

let paly = setInterval(() => {
  moveSnake()
}, 500)



const gameEnd = () => {
  clearInterval(paly)
}

// setTimeout(() => {
//   clearInterval(paly)
// }, 7000)

const picePosition = ([x ,y]: number[]): string => {
  return `left: ${x * 30}px; top: ${y * 30}px`
}

const directionCheck = (dir) => {
  return dir === 'Left' || dir === 'Right'  ? 'row' : 'col'
}

window.addEventListener('keydown', (e: KeyboardEvent): void => {
  const beforeDirection = direction.value

  if(e.code.includes('Arrow') && isPlay.value) {
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
        <template v-for="(position, index) in snake" :key="`pice-${index}`">
          <div class="pice" :style="picePosition(position)"><span :class="[{'head' : isHead(index) }]"><i></i></span></div>
        </template>
      </div>
      <div class="lemon" :style="picePosition(food)">
        <font-awesome-icon icon="fa-solid fa-lemon" />
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