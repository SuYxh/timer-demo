import { ref, computed, ComputedRef } from 'vue'
import { raf, cancelRaf, CurrentTime, parseTime } from './utils'

type Timer = {
  start: () => void
  pause: () => void
  continu: () => void
  reset: () => void
  current: ComputedRef<CurrentTime>
}

export type UseCountDownOptions = {
  time?: number;
  onChange?: (current: CurrentTime) => void;
  onFinish?: () => void;
};

function useTimerPro(options: UseCountDownOptions): Timer {
  let rafId = 0,
    startTime = 0,
    stopAt = 0,
    counting = false

  const curentTime = ref(0)

  const current = computed(() => parseTime(curentTime.value))

  function tick() {
    rafId = raf((time) => {
      curentTime.value = time - startTime
      options.onChange?.(current.value);

      if (options.time) {
        if (Math.floor(curentTime.value) < options.time) {
          tick()
        } else {
          pause()
          options.onFinish?.()
        }
      } else {
        tick()
      }
    })
  }

  function start() {
    if (counting) {
      return
    }
    if (curentTime.value) {
      console.log('要重新开始请执行 reset() 或者 执行 continu()')
      return
    }
    counting = true
    startTime = window.performance.now()
    tick()
  }

  function pause() {
    if (!counting) {
      return
    }
    counting = false
    if (rafId) {
      cancelRaf(rafId)
      stopAt = window.performance.now()
    }
  }

  function continu() {
    if (counting) {
      return
    }
    counting = true
    startTime += window.performance.now() - stopAt
    tick()
  }

  function reset() {
    pause()
    curentTime.value = 0
    startTime = 0
    stopAt = 0
  }

  return {
    current,
    start,
    pause,
    continu,
    reset,
  }
}

export default useTimerPro
