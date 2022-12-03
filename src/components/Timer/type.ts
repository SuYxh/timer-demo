import { PropType } from 'vue'

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: false as const,
}

export const makeNumericProp = <T>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal,
})

export const makeStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal,
})
