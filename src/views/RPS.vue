<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

interface RPS {
  text: string
  value: number
  select: boolean
}

const rps: Ref<RPS[]> = ref([
  { text:'β', value: 0, select: true },
  { text:'β', value: 1, select: false },
  { text:'π', value: 2, select: false },
])
const NUMBER_OF_CASES: number = rps.value.length
const current: Ref<number> = ref(0)

interface Score {
  [index: string] : number
}
interface Record {
  gamer: Score
  me: Score
}
let record: Ref<Record> = ref({
  gamer : {
    win : 0,
    lose : 0,
    tie: 0
  },
  me : {
    win : 0,
    lose : 0,
    tie: 0
  }
})


let i: number = 0
const loop = (): void => {
  i ++
  rps.value[i % NUMBER_OF_CASES].select = true
  rps.value[(i - 1) % NUMBER_OF_CASES].select = false
  current.value = i % NUMBER_OF_CASES
}

let isGameEnd: Ref<boolean> = ref(false)
let interval: any = null
const gameStart = (): void => {
  isGameEnd.value = false
  interval = setInterval(loop, 100)
}

let resultText: Ref<string> = ref('')
const win = (): void => {
  resultText.value = 'πμ΄κ²Όλ€'
  record.value.gamer.lose ++
  record.value.me.win ++
}

const lose = (): void => {
  resultText.value = 'π«μ‘λ€'
  record.value.gamer.win ++
  record.value.me.lose ++
}

let gamerState: number = 0
const clear = (flag: number) => {
  isGameEnd.value = true
  clearInterval(interval)

  gamerState = rps.value[i % NUMBER_OF_CASES].value

  if (gamerState === flag ) {
    resultText.value = 'πλΉκ²Όλ€'
    record.value.gamer.tie ++
    record.value.me.tie ++
    return
  }

  if (gamerState === 0 ) {
    flag === 1 ? win() : lose()
    return
  }

  if (gamerState === 1 ) {
    flag === 2 ? win() : lose()
    return
  }

  if (gamerState === 2 ) {
    flag === 0 ? win() : lose()
    return
  }
}

const selectText = ref('')
const select = (n: number) => {
  selectText.value = rps.value[n].text
}

gameStart()
</script>

<template>
  <h1>κ°μλ°μλ³΄ κ²μ</h1>
  <div class="gameBox">
    <div class="reStart" v-if="isGameEnd">
      <h2>{{ resultText }}</h2>
      <div class="btn" @click="gameStart()">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
        μ¬μμ
      </div>
    </div>

    <div>
      <h2>Gamer</h2>
      <div class="selcet">
        {{ rps[current].text }}
      </div>

      <div class="btnBox">
        <div
          :class="{ 'active' : item.select }"
          v-for="item in rps" :key="`rps-${item.value}`">
          {{ item.text }}
        </div>
      </div>

      <div class="recode">
        <div>
          <strong>{{ record.gamer.win }}</strong>
          <span>μΉ</span>
        </div>
        <div>
          <strong>{{ record.gamer.lose }}</strong>
          <span>ν¨</span>
        </div>
        <div>
          <strong>{{ record.gamer.tie }}</strong>
          <span>λ¬΄</span>
        </div>
      </div>

    </div>

    <div>
      <h2>ME</h2>

      <div class="selcet">
        {{ selectText }}
      </div>

      <div class="btnBox me">
        <div @click="clear(0)" @mouseenter="select(0)">β</div>
        <div @click="clear(1)" @mouseenter="select(1)">β</div>
        <div @click="clear(2)" @mouseenter="select(2)">π</div>
      </div>

      <div class="recode">
        <div>
          <strong>{{ record.me.win }}</strong>
          <span>μΉ</span>
        </div>
        <div>
          <strong>{{ record.me.lose }}</strong>
          <span>ν¨</span>
        </div>
        <div>
          <strong>{{ record.me.tie }}</strong>
          <span>λ¬΄</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rps.scss';
</style>