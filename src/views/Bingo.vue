<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

interface BingoList {
  value: number
  selected: boolean
  isBingo: boolean
}

let numberList = ref<BingoList[]>([])
let isPlay = ref<boolean>(false)
const suffle = (): void => {
  if (!isPlay.value) {
    numberList.value.sort(() => Math.random() - 0.8)
    isPlay.value = true
  } else {
    // let result = confirm('게임중입니다! 게임을 다시 시작하시겠습니까?')
    // if (result) {
    //   isPlay.value = false
    //   init()
    //   suffle()
    // }
  }
}

let drawNumber = ref<number>(0)
let drawList = ref<number[]>([])
let drawIndexList = ref<number[]>([])

const bingoCount = ref<number>(0)
const bingoColumn = ref<number[]>([])
const bingoRow = ref<number[]>([])
const bingoDiagonal = ref<string[]>([])

watchEffect(() => {
  if (bingoCount.value >= 3) {
    alert('게임끝~')
  }
})

/**
 * 빙고가 됐을때 해당 값의 isBingo를 true로 바꿔주는 함수
 */
const bingoEffect = (flag: string, index: number = 0): void => {
  if (flag === 'col') {
    for (let i = 0; i < 5; i++)  {
      numberList.value[index + (i * 5)].isBingo = true
    }
  } else if (flag === 'row') {
    for (let i = 0; i < 5; i++)  {
      numberList.value[index + i].isBingo = true
    }
  } else if (flag === 'L') {
    for (let i = 0; i < 5; i++)  {
      numberList.value[i * 6].isBingo = true
    }
  } else {
    for (let i = 0; i < 5; i++)  {
      numberList.value[(i + 1) * 4].isBingo = true
    }

  }
}

/**
 * 세로 빙고가 맞는지 검증하는 함수
 */
const columnValidation = (idx: number) => {
  let isBingo = true

  for (let i = 0; i < 5; i++)  {
    if (drawIndexList.value.indexOf(idx+(i * 5)) === -1) {
      isBingo = !isBingo
      break
    }
  }

  if (isBingo && bingoColumn.value.indexOf(idx) === -1 ) {
    bingoCount.value ++
    bingoColumn.value.push(idx)
    bingoEffect('col', idx)
  }
}

/**
 * 가로 빙고가 맞는지 검증하는 함수
 */
const rowValidation = (idx: number) => {
  let isBingo = true

  for (let i = 0; i < 5; i++)  {
    if (drawIndexList.value.indexOf(idx + i) === -1) {
      isBingo = !isBingo
      break
    }
  }

  if (isBingo && bingoRow.value.indexOf(idx) === -1 ) {
    bingoCount.value ++
    bingoRow.value.push(idx)
    bingoEffect('row', idx)
  }
}

/**
 * 대각선 빙고가 맞는지 검증하는 함수
 */
const diagonalValidation = (flag: string) => {
  let isBingo = true

  if (flag === 'L') {

    for (let i = 0; i < 5; i++)  {
      if (drawIndexList.value.indexOf(i * 6) === -1) {
        isBingo = !isBingo
        break
      }
    }

  } else {
    for (let i = 0; i < 5; i++)  {
      if (drawIndexList.value.indexOf((i + 1) * 4) === -1) {
        isBingo = !isBingo
        break
      }
    }
  }

  if (isBingo && bingoDiagonal.value.indexOf(flag) === -1 ) {
    bingoCount.value ++
    bingoDiagonal.value.push(flag)
    bingoEffect(flag)
  }
}


/**
 * 뽑힌 번호가 5개 이상일 때 1차 검증 후 상황에 맞게 검증함수로 넘겨주는 함수
 *
 */
const bingoCheck = (): void => {
  drawIndexList.value.sort((a,b) => a-b)

  if (drawIndexList.value.length >= 5) {

    for(let i = 0; i < drawIndexList.value.length; i++) {
      if (i < 5 && drawIndexList.value.indexOf(i) !== -1) {
        columnValidation(i)
      }
      if (drawIndexList.value.indexOf(i * 5) !== -1) {
        rowValidation(i * 5)
      }
    }

    if (drawIndexList.value.indexOf(12) !== -1 && drawIndexList.value.indexOf(0) !== -1) {
      diagonalValidation('L')
    }
    if (drawIndexList.value.indexOf(12) !== -1 && drawIndexList.value.indexOf(4) !== -1) {
      diagonalValidation('R')
    }

  }
}

/**
 * 애니메이션 넘버
 */
const animateNumber = () => {

  let number: number = 0

  const random = (): void => {
    number = Math.floor(Math.random() * 25 + 1)
    if (drawList.value.indexOf(number) === -1) {
      console.log(number)
      return
    }
    random()
  }
  random()

  let time = 1000
      console.log(number)
  let interval = setInterval(() => {
    number++
    drawNumber.value = number%25 === 0 ? 25 : number%25
  }, time / 50)

  setTimeout(() => {
    clearInterval(interval)
    drawList.value.push(drawNumber.value)
  }, time);
}

/**
 * 카드를 클릭 했을때 번호를 뽑는 함수
 */
const draw = (): void => {

  animateNumber()
  bingoCheck()

  let index: number = 0
  numberList.value.map((item, i) => {
    if (item.value === drawNumber.value) {
      item.selected = true
      index = i
    }
  })
  drawIndexList.value.push(index)
}

const init = (): void => {
  numberList.value = []
  drawNumber.value = 0
  drawList.value = []
  drawIndexList.value = []

  bingoCount.value = 0
  bingoColumn.value = []
  bingoRow.value = []
  bingoDiagonal.value = []

  let number: BingoList[] =
    new Array(25)
      .fill({})
      .map((item, index) => {
        const obj: BingoList = { value: 0, selected: false, isBingo: false}
        obj.value = index + 1
        return obj
      })
  numberList.value = number
}
init()
</script>

<template>
  <h1>빙고</h1>
  <div class="gameBox bingo">
    <div class="fireworks">
      <span class="firework1"></span>
      <span class="firework2"></span>
      <span class="firework3"></span>
      <span class="firework4"></span>
      <span class="firework5"></span>
    </div>

    <!-- <BingoAnimateNumber /> -->

    <div class="drawArea">
      <Transition name="fade" mode="out-in">
        <template v-if="!isPlay">
          <h2>빙고 번호를 섞어 주세요!</h2>
        </template>
        <template v-else>
          <div>
            <h2 class="num">
              {{ drawNumber }}
            </h2>
            <div class="btn" @click="draw">번호 뽑기</div>
          </div>
        </template>
      </Transition>
    </div>

    <div class="bingoArea">
      <div class="top">
        <div class="btn" @click="suffle">빙고 번호 섞기</div>
      </div>
      <div class="cardList">
        <transition-group>
          <template
            :key="`number-${card.value}`"
            v-for="card in numberList">
            <div :class="['card', { bingo: card.isBingo }]" >
              {{ card.value }}
              <div class="selected" :class="{ check: card.selected }"></div>
            </div>
          </template>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/bingo.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.v-move {
  transition: transform 1s;
}
</style>