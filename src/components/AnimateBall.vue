<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits(['done'])

interface Props {
  num: number
  setIndex: number
  ballIndex: number
}

const props = defineProps<Props>()
let isAnimateBall = ref(true)
let number: Ref<number> = ref(0)
number.value = props.num

let lottoInterval = setInterval((): void => {
  number.value = number.value === 45 ? 1 : number.value + 1
}, 50)

setTimeout(() => {
  isAnimateBall.value = false
  clearInterval(lottoInterval)

  if (props.ballIndex === 5) {
    emit('done', props.setIndex)
  }

}, ((props.setIndex + 1) * 2000) + ((props.ballIndex) * 300))

const colorCheck = (num: number): string  => {
  let n: string = num.toString()
  let type: string = '5'
  if (n.length > 1) {
    type = n.substring(0,1)
  }
  return `ball_type${type}`
}
</script>

<template>

  <span
    :class="['ball', colorCheck(number)]"
    v-if="isAnimateBall">
    {{ number }}
  </span>
  <span
    :class="['ball', colorCheck(num)]"
    v-else>
    {{ num }}
  </span>

</template>