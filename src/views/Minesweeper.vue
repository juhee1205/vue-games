<script setup lang="ts">
import { ref } from 'vue'
interface Ground {
  value: number
  isMine: boolean
}

const CELL: number = 9
const MINE: number = 10

let mineList: number[] = []
let groundList = ref<Ground[]>([])
groundList.value = new Array(CELL * CELL).fill({}).map(item => {
  return {isMine: false, value: 0, isPin: false, isShow: false }
})
const cellValueCheck = (): void => {
  groundList.value.map((item, index) => {

  })
}

const mineFind = (index): void => {

}


const createMine = (base: number = -1): void => {
  let index: number = Math.floor(Math.random() * (CELL ** 2))
  if (base !== -1) {
    mineList.push(base)
  }

  if (mineList.indexOf(index) === -1) {
    mineList.push(index)
    groundList.value[index].isMine = true
  } else {
    createMine()
  }

  if (mineList.length < MINE + 1) {
    createMine()
  } else {
    console.log('지뢰 생성끝~')
  }
}

const cellClick = (index: number): void => {
  mineList.length === 0 ? createMine(index) : mineFind(index)
}

</script>
<template>
  <h1>지뢰찾기</h1>

  <div class="gameBox">
    <div class="ground">
      <div class="gridBox" :style="`grid-template-columns: repeat(${CELL}, 1fr);`">
        <div class="grid"
          :key="`box-${index}`"
          @click="cellClick(index)"
          v-for="(cell, index) in groundList" >
          {{ index }}
          <span v-if="cell.isMine">💣</span>
        </div>
      </div>
    </div>

    <div class="scoreZone">
      <h2>지뢰 갯수 {{ CELL }}</h2>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/minesweeper.scss";
</style>