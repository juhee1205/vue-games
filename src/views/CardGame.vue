<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

let emojiList: string[] = ['🍕','🍔','🍟','🌭','🥐','🍖','☕','🍰','🍈','🍉','🍺','🍎','🍑','🍇','🥝']
let cardCount: number = emojiList.length

interface Card {
  text: string
  isOpen: boolean
  isclear: boolean
}
let cardList: Ref<Array<Card>> = ref([])

const cardInit = (): void => {
  let card: Array<Card> =
    Array(cardCount*2)
      .fill({})
      .map((item, index) => {
        let obj: Card = { text:'', isOpen:true, isclear: false }
        obj.text = emojiList[index%cardCount]
        return obj
      })
  cardList.value = card
}
cardInit()

let isGameEnd: Ref<boolean> = ref(false)
const gameEnd = (): void => {
  setTimeout(() => {
    isGameEnd.value = true
  },700)
}


interface FirstOpenCard {
  text?: string
  index: number
}
let clearCount: number = 0
let firstOpenCard: FirstOpenCard = { text: '', index: 0 }
const cardOpen = (idx: number): void => {
  const card = cardList.value[idx]
  if (card.isclear) return
  cardList.value[idx].isOpen = true

  if (!firstOpenCard.text) {
    firstOpenCard.text = card.text
    firstOpenCard.index = idx

  } else if (firstOpenCard.index === idx) {
    return
  } else if (firstOpenCard.text === card.text) {
    clearCount ++
    cardList.value[firstOpenCard.index].isclear = true
    cardList.value[idx].isclear = true
    delete firstOpenCard.text
    if (clearCount == cardCount) {
      gameEnd()
    }
  } else {
    setTimeout(() => {
      cardList.value[firstOpenCard.index].isOpen = false
      cardList.value[idx].isOpen = false
      delete firstOpenCard.text
    },400)
  }
}

const shuffle = (): void => {
  cardList.value.sort(() => Math.random() - 0.5)
}
const cardReset = (): void => {
  cardList.value = cardList.value.map(item => {
    let obj: Card = { ...item }
    obj.isOpen = false
    obj.isclear = false
    return obj
  })
  shuffle()
}

const gameStart = (): void => {
  clearCount = 0
  cardReset()
  isGameEnd.value = false
}
gameStart()
</script>

<template>
  <h1>카드 짝 맞추기</h1>
  <div class="gameBox">
    <div class="reStart" v-if="isGameEnd">
      <h2>🎉게임 클리어</h2>
      <div class="btn" @click="gameStart()">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
        다시 시작
      </div>
    </div>
    <div class="cardList"  v-if="!isGameEnd">
      <div
        class="card"
        :key="`card-${card.text}`"
        :class="[{'open' : card.isOpen}, {'clear' : card.isclear}]"
        @click="cardOpen(index)"
        v-for="(card, index) in cardList">
        <div class="front">{{ card.text }}</div>
        <div class="back"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/card.scss';
</style>