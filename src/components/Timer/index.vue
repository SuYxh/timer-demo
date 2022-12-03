<template>
  <div class="timer-wrap">
    <slot>
      {{ formatTime }}
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { makeNumericProp, makeStringProp, truthProp } from './type'
import { parseFormat } from './utils'
import useTimer from '../../hooks/useTimer/index'
import useExpose from '../../hooks/useExpose/index'

export default defineComponent({
  props: {
    time: makeNumericProp(0),
    format: makeStringProp('HH:mm:ss:SSS'),
    autoStart: truthProp,
  },
  setup(props, { emit }) {
    const { current, start, pause, continu, reset } = useTimer({
      time: +props.time,
      onChange: current => emit('change', current),
      onFinish: () => emit('finish'),
    })

    const formatTime = computed(() => parseFormat(props.format, current.value))

    const resetTime = () => {
      reset()
      if (props.autoStart) {
        start()
      }
    }

    watch(() => props.time, resetTime, { immediate: true })

    useExpose({
      start,
      pause,
      continu,
      reset: resetTime,
    });

    return {
      formatTime,
    }
  },
})
</script>

<style scoped></style>
