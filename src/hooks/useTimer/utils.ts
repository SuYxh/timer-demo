export type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
}

export type Numeric = number | string;

export const inBrowser = typeof window !== 'undefined';

export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : -1;
}

export function cancelRaf(id: number) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  }
}

export function parseTime(time: number): CurrentTime {
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  }
}