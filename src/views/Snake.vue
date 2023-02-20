<script setup lang="ts">
import { ref } from 'vue'


let isPlay = ref<boolean>(true)
let snake = ref<number[][]>([])
let direction = ref<string>('Right')

let CELL = 20
let snakeLength: number = 0
let head: number[] = [0,0]
let bodyText: string[] = []
let tail: number[] = [0,0]

const creatSnake  = (): void => {
  for (let i = 0; i < 5; i++) {
    snake.value.push([i + ((CELL / 2) - 7), CELL / 2])
  }
}
creatSnake()

let food = ref<number[]>([])
let showFood = ref<boolean>(false)

const getRandomPosition = (): void => {
  let foodX: number = Math.floor(Math.random() * CELL)
  let foodY: number = Math.floor(Math.random() * CELL)

  let snakeX = []
  let snakeY = []

  snake.value.map(item => {
    snakeX.push(item[0])
    snakeY.push(item[0])
  })

  let aa = snakeX.indexOf(foodX)
  let bb = snakeX.indexOf(foodY)
  if (aa === -1 && bb === -1) {
    showFood.value = true
    food.value = [foodX, foodY]
  } else {
    getRandomPosition()
  }
}
const createFood = (): void => {
  getRandomPosition()
}
createFood()

const isFood = () => {
  if (food.value.join(',') === head.join(',')) {
    snake.value.splice(0,0, [0,0])
    showFood.value = false
    setTimeout(createFood, 2000)
  }
}

const isGameOver = (): boolean => {
  let headText: string = head.join(',')
  let headX = head[0]
  let headY = head[1]

  const right = direction.value === 'Right' && headX >= CELL - 1
  const left = direction.value === 'Left' && headX <= 0
  const up = direction.value === 'Up' && headY <= 0
  const down = direction.value === 'Down' && headY >= CELL - 1
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
}, 300)


const gameEnd = () => {
  clearInterval(paly)
}

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
      <div class="food" :style="picePosition(food)" v-if="showFood">
        <font-awesome-icon icon="fa-solid fa-lemon" />
      </div>
      <div class="gridBox" :style="`width: ${CELL * 30}px; height: ${CELL * 30}px `">
        <div class="grid" v-for="(box, index) in CELL*CELL" :key="`box-${index}`"></div>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
@import "@/assets/scss/snake.scss";
</style>