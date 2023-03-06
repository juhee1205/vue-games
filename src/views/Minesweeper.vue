<script setup lang="ts">
import { ref, watchEffect } from 'vue'
interface Ground {
  isMine: boolean
  mineCount: number
  isPin: boolean
  isOpen: boolean
  isSafe: boolean
}

interface Select {
  value: number
  text: string
  cellX: number
  cellY: number
  mine: number
}

let isPlay = ref<boolean>(false)
let isGameEnd = ref<boolean>(false)
let level = ref<number>(0)
let cellX: number = 0
let cellY: number = 0
let totalCell: number = 0
const select: Select[] = [
  { value:0, text: '하', cellX: 9, cellY: 9, mine: 10 },
  { value:1, text: '중', cellX: 16, cellY: 16, mine: 40 },
  { value:2, text: '상', cellX: 30, cellY: 16, mine: 99 },
]

let mines = ref(-1)
let cellStyle = ref(`
  grid-template-columns: repeat(${select[level.value].cellX}, 1fr);
  grid-template-rows: repeat(${select[level.value].cellY}, 1fr);
`)

const getCoord = (index: number): number[] => {
  return [Math.floor(index / cellX) , index % cellX]
}

watchEffect(() => {
  if (mines.value === 0) {
    console.log('지뢰 검증~')
    gameAnd()
  }
})

let firstIndex: number = 0
let firstCoord: number[] = []
let firstAround: number[] = []
let time = ref<string>('000')

let mineList: number[] = []
let pinList: number[] =  []
let board = ref<Ground[][]>([])

const showReStar = () => {
  setTimeout(() => {
    isGameEnd.value = true
  }, 2000)
}

const minesOpen = () => {
  mineList.forEach(index => {
    let [y, x] = getCoord(index)
    board.value[y][x].isOpen = true
  })
  showReStar()
}

const isClear = () => {
  let aa = []
  mineList.forEach(index => {
    let [y, x] = getCoord(index)
    aa.push(board.value[y][x].isPin ? true : false)
  })

  console.log(aa)
  if (aa.indexOf(false) === -1) {
    console.log('clear!')
    showReStar()
  } else {
    minesOpen()
  }

}


let interval = null
const timeStart = () => {
  isPlay.value = true

  let timeNum: number = 0
  interval = setInterval(() => {
    timeNum++
    time.value = timeNum.toString().padStart(3,0)
  }, 1000)
}

const gameAnd = (): void => {
  clearInterval(interval)
  isPlay.value = false

  if (mines.value !== 0 ) {
    minesOpen()
  } else {
    isClear()
  }

}

const init = (): void => {
  firstIndex = 0
  firstCoord = []
  firstAround = []
  mineList = []
  pinList = []

  cellY = select[level.value].cellY
  cellX = select[level.value].cellX
  totalCell = cellY * cellX

  board.value =
    new Array(cellY)
    .fill([])
    .map(itemY => {
      let arr = new Array(cellX).fill(0).map(itemX => {
        return {
            isMine: false,
            mineCount: 0,
            isPin: false,
            isOpen: false,
            isSafe: false
          }
      })
      return arr
    })
  mines.value = select[level.value].mine
  cellStyle.value =
    `grid-template-columns: repeat(${cellX}, 1fr);
    grid-template-rows: repeat(${cellY}, 1fr);`
}
init()


const topLeftCheck = (y: number, x: number): boolean => {
  return y - 1 >= 0 && x - 1 >= 0 ? true : false
}
const topCheck = (y: number, x: number): boolean => {
  return y - 1 >= 0 ? true : false
}
const topRightCheck = (y: number, x: number): boolean => {
  return y - 1 >= 0 && x + 1 < cellX ? true : false
}
const leftCheck = (y: number, x: number): boolean => {
  return x - 1 >= 0 ? true : false
}
const rightCheck = (y: number, x: number): boolean => {
  return x + 1 < cellX ? true : false
}
const bottomLeftCheck = (y: number, x: number): boolean => {
  return y + 1 < cellY && x - 1 >= 0 ? true : false
}
const bottomCheck = (y: number, x: number): boolean => {
  return y + 1 < cellY ? true : false
}
const bottomRightCheck = (y: number, x: number): boolean => {
  return y + 1 < cellY && x + 1 < cellX ? true : false
}

const setMinCount = (): void => {
  mineList.sort((a, b) => a - b).forEach(index => {
    let [y, x] = getCoord(index)

    if (topLeftCheck(y, x)) {
      board.value[y - 1][x - 1].mineCount ++
    }

    if (topCheck(y, x)) {
      board.value[y - 1][x].mineCount ++
    }

    if (topRightCheck(y, x)) {
      board.value[y - 1][x + 1].mineCount ++
    }

    if (leftCheck(y, x)) {
      board.value[y][x - 1].mineCount ++
    }

    if (rightCheck(y, x)) {
      board.value[y][x + 1].mineCount ++
    }

    if (bottomLeftCheck(y, x)) {
      board.value[y + 1][x - 1].mineCount ++
    }

    if (bottomCheck(y, x)) {
      board.value[y + 1][x].mineCount ++
    }

    if (bottomRightCheck(y, x)) {
      board.value[y + 1][x + 1].mineCount ++
    }

  })

}

const setMine = (): void => {
  mineList.sort((a, b) => a - b).map(item => {
    let x = item % cellX
    let y = Math.floor(item / cellX)
    board.value[y][x].isMine = true
  })

  setMinCount()
  isOpen(firstCoord[0], firstCoord[1])
}

const setRondomMine = (): void => {
  if (mineList.length >= select[level.value].mine) {
    setMine()
    return
  }

  let newMine = Math.floor(Math.random() * totalCell)

  if (mineList.indexOf(newMine) === -1 && firstAround.indexOf(newMine) === -1) {
    mineList.push(newMine)
  }

  setRondomMine()
}

const isNearMine = (y: number, x: number): void => {
  if (board.value[y][x].isSafe) {
    return
  }

  let safeList: number[][] = []
  board.value[y][x].isOpen = true
  board.value[y][x].isSafe = true

  // 핀이 꼽힌 셀이 오픈될때 처리
  if (board.value[y][x].isPin) {
    board.value[y][x].isPin = false
    mines.value++
    removePin(y, x)
  }

  if (topLeftCheck(y, x)) {
    safeList.push(
      !board.value[y - 1][x - 1].isMine ? [y - 1, x -1] : [-1, -1]
    )
  }

  if (topCheck(y, x)) {
    safeList.push(
      !board.value[y - 1][x].isMine ? [y - 1, x] : [-1, -1]
    )
  }

  if (topRightCheck(y, x)) {
    safeList.push(
      !board.value[y - 1][x + 1].isMine ? [y - 1, x] : [-1, -1]
    )
  }

  if (leftCheck(y, x)) {
    safeList.push(
      !board.value[y][x - 1].isMine ? [y, x - 1] : [-1, -1]
    )
  }

  if (rightCheck(y, x)) {
    safeList.push(
      !board.value[y][x + 1].isMine ? [y, x + 1] : [-1, -1]
    )
  }

  if (bottomLeftCheck(y, x)) {
    safeList.push(
      !board.value[y + 1][x - 1].isMine ? [y + 1, x - 1] : [-1, -1]
    )
  }

  if (bottomCheck(y, x)) {
    safeList.push(
      !board.value[y + 1][x].isMine ? [y + 1, x] : [-1, -1]
    )
  }

  if (bottomRightCheck(y, x)) {
    safeList.push(
      !board.value[y + 1][x + 1].isMine ? [y + 1, x + 1] : [-1, -1]
    )
  }

  if([...safeList].join('').includes('-1')) {
    return
  }

  safeList.forEach(cell => isNearMine(cell[0], cell[1]))

}

const isOpen = (y: number, x: number): void => {
  if (board.value[y][x].isMine) {
    console.log('게임 종료')
    gameAnd()
  } else {
    console.log('click ---- > ', y, x)
    isNearMine(y, x)
  }

}


const gameStart = (): void => {
  isGameEnd.value = false
  init()
}

const removePin = (y: number, x: number): void => {
  let idx = pinList.indexOf(y * cellY + x)
  pinList.splice(idx,1)
}

const setPin = (y: number, x: number): void => {
  let pinIdx = y * cellY + x

  if (board.value[y][x].isPin) {
    board.value[y][x].isPin = false
    removePin(y, x)
  } else {

    pinList.push(pinIdx)
    board.value[y][x].isPin = true
    mines.value--
  }
}


let mouseLeft = false
let mouseRight = false

const cellMouseDown = (event: any): void => {
  event.preventDefault()

  if (event.which === 1 || event.button === 0) {
    mouseLeft = true
  }

  if (event.which === 3 || event.button === 2) {
    mouseRight = true
  }
}

const cellMouseUp = (event: any, coord: number[]): void => {
  event.preventDefault()
  console.log(event)

  let [y, x] = coord

  if (mouseLeft && mouseRight) {
    console.log('힌트')

    mouseLeft = false
    mouseRight = false
    return

  } else if (mouseLeft) {
    if (mineList.length === 0) {
      firstIndex = (coord[0]) * cellY + coord[1]
      firstCoord = coord
      firstAround = new Array(9).fill(0).map((item, index) => {
        let x = (index % 3) - 1
        let y = (Math.floor(index / 3)) - 1
        return firstIndex + (cellX * y) + x
      })
      setRondomMine()
      time.value = '000'
      timeStart()

    } else {
      isOpen(y, x)
    }

  } else {
    if (!board.value[y][x].isOpen) {
      setPin(y, x)
    }
  }

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
      ⏱ {{ time }}
      </h2>
    </div>

    <div class="ground">
      <div class="reStart" v-if="isGameEnd">
        <div class="btn" @click="gameStart()">
          <font-awesome-icon icon="fa-solid fa-rotate-right" />
          재시작
        </div>
      </div>

      <div class="gridBox" :style="cellStyle" >
        <template v-for="(cellY, indexY) in board">
          <template v-for="(cell, indexX) in cellY" :key="`box-${indexX}`">

            <div
              :class="['grid', `level-${level}`, {'open': cell.isOpen}]"
              @mousedown.prevent="cellMouseDown($event)"
              @mouseup.stop.prevent="cellMouseUp($event, [indexY, indexX])"
              >
                <span
                  :class="['count', `count-${cell.mineCount}`]"
                  v-if="cell.mineCount > 0 && !cell.isMine && cell.isOpen">
                  {{ cell.mineCount }}
                </span>

                <span
                  :class="['mine', {'mineOpen': cell.isOpen}]"
                  v-if="cell.isMine && !cell.isPin">
                  💣
                </span>
                <span class="pin" v-if="cell.isPin">🚩</span>
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