<script setup lang="ts">
import { ref } from 'vue'
interface Ground {
  mineCount: number
  isMine: boolean
  isPin: boolean
  isOpen: boolean
}

const CELL = 9
const MINE = 10
const CELL_SIZE = ref(`
  grid-template-columns: repeat(${CELL}, 1fr);
  grid-template-rows: repeat(${CELL}, 1fr);
`)

let mineList: number[] = []
let groundList = ref<Ground[]>([])
groundList.value = new Array(CELL * CELL).fill({}).map(item => {
  return {isMine: false, mineCount: 0, isPin: false, isOpen: false }
})

const topCheck = (index: number): boolean => Math.floor(index / CELL) !== 0
const leftCheck = (index: number): boolean => index % CELL !== 0
const rightCheck = (index: number): boolean => (index + 1) % CELL !== 0
const bottomCheck = (index: number): boolean => Math.floor(index / CELL) < (CELL - 1)
const isMine = (index: number): boolean => groundList.value[index].isMine

const cellValueCheck = (): void => {
  groundList.value.map((item, index) => {

    if (item.isMine) return

    // top
    if (topCheck(index) && isMine(index - CELL)) {
      item.mineCount ++
    }

    // top left
    const TOP_LEFT = CELL + 1
    if (topCheck(index) && leftCheck(index) && isMine(index - TOP_LEFT)) {
      item.mineCount ++
    }

    // top right
    const TOP_RIGHT = CELL - 1
    if (topCheck(index) && isMine(index - TOP_RIGHT) && rightCheck(index)) {
      item.mineCount ++
    }

    // left
    if (leftCheck(index) && isMine(index - 1) ) {
      item.mineCount ++
    }

    // right
    if (rightCheck(index) && isMine(index + 1)) {
      item.mineCount ++
    }

    // bottom
    if (bottomCheck(index) && isMine(index + CELL)) {
      item.mineCount ++
    }

    // bottom left
    const BOTTOM_LEFT = CELL - 1
    if (bottomCheck(index) && leftCheck(index) && isMine(index + BOTTOM_LEFT)) {
      item.mineCount ++
    }

    // bottom right
    const BOTTOM_RIGHT = CELL + 1
    if (bottomCheck(index) && rightCheck(index) && isMine(index + BOTTOM_RIGHT)) {
      item.mineCount ++
    }

    return item
  })
}
const groundOpen = (index: number): void => {

  if (groundList.value[index].isMine) {
    console.log('지뢰 발견! 게임 종료~')
  } else {
    groundList.value[index].isOpen = true
  }
}


let isCreateMine = false
const createMine = (base = -1): void => {
  let list = new Array(CELL ** 2).fill(0).map((item, index) => index + 1).sort(() => Math.random() - 0.5).splice(0, 11)

  if (list.indexOf(base) === -1) {
    mineList = list.splice(0, 10)
  } else {
    let idx = list.indexOf(base)
    list.splice(idx, 1)
    mineList = list
  }

  console.log('지뢰 생성끝~')
  mineList.sort((a, b) => a - b)
  groundList.value.map((item, index) => {
    if (mineList.indexOf(index) !== -1) {
      groundList.value[index].isMine = true
    }
  })
  cellValueCheck()
  groundOpen(base)
}

const cellClick = (index: number): void => {
  if (!isCreateMine) {
    createMine(index)
    isCreateMine = true
  } else {
    if (groundList.value[index].isPin) return
    groundOpen(index)
  }
}
const setPin = (index: number): void => {
  event.preventDefault()
  groundList.value[index].isPin = true
}

</script>
<template>
  <h1>지뢰찾기</h1>

  <div class="gameBox">
    <div class="ground">
      <div class="gridBox" :style="CELL_SIZE">
        <div
          :class="['grid', {'open': cell.isOpen}]"
          :key="`box-${index}`"
          @click.left="cellClick(index)"
          @click.right="setPin(index)"
          v-for="(cell, index) in groundList" >
          <i>{{ index }}</i>

          <span class="cout" v-if="cell.mineCount > 0">{{ cell.mineCount }}</span>

          <span v-if="cell.isMine && !cell.isPin">💣</span>
          <span class="pin" v-if="cell.isPin"><font-awesome-icon icon="fa-solid fa-map-pin" /></span>
        </div>
      </div>
    </div>

    <div class="scoreZone">
      <h2>지뢰 갯수 {{ MINE }}</h2>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/minesweeper.scss";
</style>