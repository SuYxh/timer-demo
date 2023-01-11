<template>
  <h1>{{ msg }}</h1>

  <p>计时开始后，若要重新开始计时，需要点击 reset</p>

  <Timer ref="timerRef" />

  <button class="margin" @click="handleStart">start</button>
  <button class="margin" @click="handlePause">pause</button>
  <button class="margin" @click="handleContinu">continue</button>
  <button class="margin" @click="handleReset">reset</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Timer from './Timer/index.vue'

defineProps<{ msg: string }>()

const timerRef = ref<any>(null)

const handleStart = () => {
  timerRef.value?.start?.()
}

const handlePause = () => {
  timerRef.value?.pause?.()
}

const handleContinu = () => {
  timerRef.value?.continu?.()
}

const handleReset = () => {
  timerRef.value?.reset?.()
}


</script>

<style scoped>
.read-the-docs {
  color: #888;
}

.margin {
  margin-right: 2px;
}
</style>
