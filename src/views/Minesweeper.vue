<script setup lang="ts">
import { ref } from 'vue'
interface Ground {
  mineCount: number
  isMine: boolean
  isPin: boolean
  isOpen: boolean
  isRepeat: boolean
}

interface Select {
  value: number
  text: string
  cellX: number
  cellY: number
  mine: number
}

let level = ref<number>(0)
let cellX = 0
let cellY = 0
let totalCell = 0
const select = [
  { value:0, text: '하', cellX: 9, cellY: 9, mine: 10 },
  { value:1, text: '중', cellX: 16, cellY: 16, mine: 40 },
  { value:2, text: '상', cellX: 30, cellY: 16, mine: 99 },
]

let mines = ref(0)
let cellStyle = ref(`
  grid-template-columns: repeat(${select[level.value].cellX}, 1fr);
  grid-template-rows: repeat(${select[level.value].cellY}, 1fr);
`)

let board = ref([])
const init = () => {
  cellY = select[level.value].cellY
  cellX = select[level.value].cellX
  totalCell = cellY * cellX

  board.value =
    new Array(cellY)
    .fill([])
    .map((itemY, indexY) => {
      let arr = new Array(cellX).fill(0).map((itemX, indexX) => {
        return itemX = {
            index: (indexY * cellX) + indexX,
            isMine: false,
            mineCount: 0,
            isPin: false,
            isOpen: false,
            isRepeat: false
          }
      })
      return itemY = arr
    })

  mines.value = select[level.value].mine
  cellStyle.value =
    `grid-template-columns: repeat(${cellX}, 1fr);
    grid-template-rows: repeat(${cellY}, 1fr);`
}
init()

let firstIndex = 0
let firstCoord = []
let firstAround = []


let mineList = ref([])

const calcX = (idx) => idx % cellX
const calcY = (idx) => Math.floor(idx / cellX)

const topLeftCheck = (idx) => {
  return calcY(idx) - 1 >= 0 && calcX(idx) - 1 >= 0 ? true : false
}
const topCheck = (idx) => {
  return calcY(idx) - 1 >= 0 ? true : false
}
const topRightCheck = (idx) => {
  return calcY(idx) - 1 >= 0 && calcX(idx) + 1 < cellX ? true : false
}
const leftCheck = (idx) => {
  return calcX(idx) - 1 >= 0 ? true : false
}
const rightCheck = (idx) => {
  return calcX(idx) + 1 < cellX ? true : false
}
const bottomLeftCheck = (idx) => {
  return calcY(idx) + 1 < cellY && calcX(idx) - 1 >= 0 ? true : false
}
const bottomCheck = (idx) => {
  return calcY(idx) + 1 < cellY ? true : false
}
const bottomRightCheck = (idx) => {
  return calcY(idx) + 1 < cellY && calcX(idx) + 1 < cellX ? true : false
}

const setMinCount = () => {
  mineList.value.sort((a, b) => a - b).forEach(index => {
    let x = calcX(index)
    let y = calcY(index)


    if (topLeftCheck(index)) {
      board.value[y - 1][x - 1].mineCount ++
    }

    if (topCheck(index)) {
      board.value[y - 1][x].mineCount ++
    }

    if (topRightCheck(index)) {
      board.value[y - 1][x + 1].mineCount ++
    }

    if (leftCheck(index)) {
      board.value[y][x - 1].mineCount ++
    }

    if (rightCheck(index)) {
      board.value[y][x + 1].mineCount ++
    }

    if (bottomLeftCheck(index)) {
      board.value[y + 1][x - 1].mineCount ++
    }

    if (bottomCheck(index)) {
      board.value[y + 1][x].mineCount ++
    }

    if (bottomRightCheck(index)) {
      board.value[y + 1][x + 1].mineCount ++
    }


  })
}

const setMine = () => {
  mineList.value.sort((a, b) => a - b).map(item => {
    let x = item % cellX
    let y = Math.floor(item / cellX)
    board.value[y][x].isMine = true
  })

  console.log(mineList.value)
  setMinCount()
}

const setRondomMine = () => {
  if (mineList.value.length >= mines.value) {
    setMine()
    return
  }


  let newMine = Math.floor(Math.random() * totalCell)

  if (mineList.value.indexOf(newMine) === -1 && firstAround.indexOf(newMine) === -1) {
    mineList.value.push(newMine)
  }

  setRondomMine()

}

const groundOpen = () => {

}

const gameStart = () => {
  init()
}

const setPin = () => {

}


let mouseLeft = false
let mouseRight = false

const cellClick = (event, coord) => {
  // event.preventDefault()
  // console.log(event)

  firstIndex = (coord[0]) * cellY + coord[1]
  firstCoord = coord
  firstAround = new Array(9).fill().map((item, index) => {
    let x = (index % 3) - 1
    let y = (Math.floor(index / 3)) - 1
    return firstIndex + (cellX * y) + x
  })

  if (mineList.value.length === 0) {
    setRondomMine()
  } else {
    groundOpen()
  }

}

const cellClick2 = (event) => {
  // event.preventDefault()
  mouseLeft = false
  mouseRight = false
}

</script>
<template>
  <h1>지뢰찾기</h1>

  <div class="gameBox">

    <div class="scoreZone">

      <div>
        <select v-model="level" @change="gameStart()">
          <option
            :value="option.value"
            v-for="option in select">
              {{ option.text }}
          </option>
        </select>
      </div>
      <h2>💣 {{ mines }}</h2>
      <h2 class="time">
      ⏱ 000
      </h2>
    </div>

    <div class="ground">
      <div class="gridBox" :style="cellStyle" >
        <template v-for="(cellY, indexY) in board">
          <template v-for="(cell, indexX) in cellY" :key="`box-${indexX}`">

            <div
              :class="['grid', `level-${level}`]"
              @mousedown.prevent="cellClick($event, [indexY, indexX])"
              @mouseup.prevent="cellClick2($event)"
              >
                <i>{{cell.index}} [{{ indexY }}, {{ indexX }}]</i>

                <span
                  :class="['count', `count-${cell.mineCount}`]"
                  v-if="cell.mineCount > 0 && !cell.isMine">
                  {{ cell.mineCount }}
                </span>

                <span v-if="cell.isMine && !cell.isPin">💣</span>
            </div>

          </template>
        </template>

      </div>
    </div>


  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/minesweeper.scss";
</style>