<script setup lang="ts">
import { ref } from 'vue'

let CELL = 20
let isPlay = ref<boolean>(true)
let snake = ref<number[][]>([])
let direction = ref<string>('Right')

let snakeLength: number = 0
let head: number[] = [0,0]
let [headX, headY]: number[] = head
let bodyText: string[] = []
let tail: number[] = [0,0]
let score = ref<number>(0)

const creatSnake  = (): void => {
  snake.value = []
  for (let i = 0; i < 5; i ++) {
    snake.value.push([i + ((CELL / 2) - 7), CELL / 2])
  }
}
creatSnake()

let food = ref<number[]>([])
let showFood = ref<boolean>(false)
let eatCount: number = 0

const getRandomPosition = (): void => {
  let foodX: number = Math.floor(Math.random() * CELL)
  let foodY: number = Math.floor(Math.random() * CELL)

  let snakeX: number[] = []
  let snakeY: number[] = []

  snake.value.map(item => {
    snakeX.push(item[0])
    snakeY.push(item[1])
  })

  let snakeXCheck = snakeX.indexOf(foodX)
  let snakeYCheck = snakeY.indexOf(foodY)
  if (snakeXCheck !== -1 && snakeYCheck !== -1) {
    getRandomPosition()
  } else {
    showFood.value = true
    food.value = [foodX, foodY]
  }
}

const createFood = (): void => {
  getRandomPosition()
}

createFood()

const isFood = (): void => {
  if (food.value.join(',') === head.join(',')) {
    snake.value.splice(0,0, [0,0])
    showFood.value = false
    eatCount ++
    score.value += eatCount * 100
    setTimeout(createFood, 1500)
  }
}

const isGameOver = (): boolean => {
  let headText: string = head.join(',')

  const right = direction.value === 'Right' && headX >= CELL - 1
  const left = direction.value === 'Left' && headX <= 0
  const up = direction.value === 'Up' && headY <= 0
  const down = direction.value === 'Down' && headY >= CELL - 1
  const bodyCross = bodyText.indexOf(headText) !== -1

  if (bodyCross || right || left || up || down) {
    isPlay.value = false
    gameEnd()
    return false
  }
  return true
}

const moveSnake = (): void => {
  snakeLength = snake.value.length
  head = snake.value[snakeLength - 1]
  headX = head[0]
  headY = head[1]
  tail = snake.value[0]
  bodyText = snake.value.slice(0, snakeLength - 1).map(item => item.join(','))

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

let interval: any = null
const gameStart = (): void => {
  interval = setInterval(moveSnake, 150)
}
gameStart()

const gameEnd = (): void => {
  clearInterval(interval)
}

const picePosition = ([x ,y]: number[]): string => {
  return `left: ${x * 30}px; top: ${y * 30}px`
}

const directionCheck = (dir: string): string => {
  return dir === 'Left' || dir === 'Right'  ? 'row' : 'col'
}

window.addEventListener('keydown', (e: KeyboardEvent): void => {
  const beforeDirection = direction.value

  if (e.code.includes('Arrow') && isPlay.value) {
    let keyDirection = e.code.split('Arrow')[1]
    if (directionCheck(direction.value) !== directionCheck(keyDirection)) {
      direction.value = keyDirection
    }
  }
});

const isHead = (index: number): boolean => {
  return index === snake.value.length -1 ? true : false
}

const reStart = (): void => {
  isPlay.value = true
  direction.value = 'Right'
  score.value = 0
  eatCount = 0
  creatSnake()
  createFood()
  gameStart()
}

</script>

<template>
  <h1>snake</h1>

  <div class="gameBox">

    <div class="reStart" v-if="!isPlay">
      <h2>👻 게임 종료 👻</h2>
      <div class="btn" @click="reStart()">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
        다시 시작
      </div>
    </div>

    <div class="ground">
      <div :class="['snake', direction]">
        <template v-for="(position, index) in snake" :key="`pice-${index}`">
          <div class="pice" :style="picePosition(position)"><span :class="[{'head' : isHead(index) }, {'die': !isPlay}]"><i></i></span></div>
        </template>
      </div>
      <div class="food" :style="picePosition(food)" v-if="showFood">
        <font-awesome-icon icon="fa-solid fa-lemon" />
      </div>
      <div class="gridBox" :style="`width: ${CELL * 30}px; height: ${CELL * 30}px `">
        <div class="grid" v-for="(box, index) in CELL*CELL" :key="`box-${index}`"></div>
      </div>
    </div>

    <div class="scoreZone">
      <h2>Score</h2>
      <p>{{ score }}</p>
    </div>

  </div>

</template>

<style scoped lang="scss">
@import "@/assets/scss/snake.scss";
</style>