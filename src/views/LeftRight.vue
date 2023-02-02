<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

interface Key {
  key: string
  shake: boolean
  isClear: boolean
  isCurrent: boolean
}
let keyList: Ref<Array<Key>> = ref([])
let currentIdx: Ref<number> = ref(0)
let totalStep: number = 50

let combo: Ref<number> = ref(0)
let isCombo: boolean = false
let comboNotice: Ref<number> = ref(0)
let isComboNotice: Ref<boolean>= ref(false)
let score: Ref<number> = ref(0)
let isGameEnd: Ref<boolean> = ref(false)
const buttonPressed = (key: string): void => {
  let current: Key  = keyList.value[currentIdx.value]
  if (current.key === key) {
    current.isClear = true
    current.isCurrent = false
    currentIdx.value ++

    isCombo = true
    if (isCombo) {
      combo.value ++
      if (!(combo.value % 10)) {
        isComboNotice.value = true
        comboNotice.value = combo.value
        setTimeout(() => {
          isComboNotice.value = false
        }, 1000)
      }
    }
    score.value += 10 * combo.value

    if (currentIdx.value === totalStep) {
      isGameEnd.value = true
    } else {
      keyList.value[currentIdx.value].isCurrent = true
    }

  } else {
    current.shake = true
    isCombo = false
    combo.value = 0
    setTimeout(() => {
      current.shake = false
    }, 300)
  }
}

window.addEventListener('keydown', (e: KeyboardEvent): void => {
  if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    let key: string = e.key === 'ArrowLeft' ? 'left' : 'right'
    buttonPressed(key);
  }
});

const gameStart = (): void => {
  let keyListInit: Array<Key>  =
    Array(totalStep)
      .fill({})
      .map(item => {
        let obj: Key = {key:'right', shake: false, isClear: false, isCurrent: false}
        obj.key = Math.floor(Math.random() * 10) +1  > 5 ? 'right' : 'left'
        return obj
      })
  keyListInit[currentIdx.value].isCurrent = true
  keyList.value = keyListInit
}

const init = (): void => {
  keyList.value = []
  combo.value = 0
  isCombo = false
  score.value = 0
  isGameEnd.value = false
  currentIdx.value = 0
  gameStart()
}

gameStart()
</script>

<template>
  <h1>Left Right</h1>
  <div class="gameBox">
    <div class="reStart" v-if="isGameEnd">
      <h2>🎉게임 클리어</h2>
      <div class="btn" @click="init()">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
        다시 시작
      </div>
    </div>
    <div class="gameZone">
      <Transition name="combo">
        <div class="combo" v-show="isComboNotice">
        🔥Combo {{ comboNotice }}🔥
        </div>
      </Transition>
      <div class="inner">
        <template
          :key="`key-${index}`"
           v-for="(key, index) in keyList">

          <Transition name="fade">
            <div
              :data-index="`${index}`"
              :class="['key', {'current' : key.isCurrent},  {'shake' : key.shake}]"
              v-if="!key.isClear">
              <font-awesome-icon :icon="`fa-solid fa-arrow-${key.key}`" />
            </div>
          </Transition>

        </template>
      </div>
    </div>
    <div class="scoreZone">
      <h2>Combo</h2>
      <p>{{ combo }}</p>

      <h2>Score</h2>
      <p>{{ score }}</p>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import '@/assets/scss/leftRight.scss';

.fade-enter-active,
.fade-leave-active {
  transform: scale(1);
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(220px);
  margin-top: -110px;
}

.combo-enter-active,
.combo-leave-active {
  transition: all 0.2s;
}

.combo-enter-from,
.combo-leave-to {
  transform: translateY(-20px) scale(0);
}
</style>