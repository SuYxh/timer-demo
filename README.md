# Timer 计时器

### 介绍

用于实时展示正向计时数值，支持毫秒精度。

### 引入

```js
import Timer  from '@/components/Timer/index.vue';
```

## 代码演示

### 基础用法

`time` 属性表示倒计时总时长，单位为毫秒。

```html
<Timer :time="time" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const time = ref(6 * 1000);
    return { time };
  },
};
```

### 自定义格式

通过 `format` 属性设置倒计时文本的内容。

```html
<Timer :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
```



### 手动控制

通过 ref 获取到组件实例后，可以调用 `start`、`pause`、`reset` 方法。

```html
<Timer
  ref="timerRef"
  :time="3000"
  :auto-start="false"
  format="ss:SSS"
  @finish="onFinish"
/>
<div>
  <button @click="start" >开始</button>
  <button @click="pause" >暂停</button>
  <button @click="reset" >重置</button>
</div>
```

```js
import { showToast } from 'vant';

export default {
  setup() {
    const timerRef = ref(null);

    const start = () => {
      timerRef.value.start();
    };
    const pause = () => {
      timerRef.value.pause();
    };
    const reset = () => {
      timerRef.value.reset();
    };
    const onFinish = () => showToast('倒计时结束');

    return {
      start,
      pause,
      reset,
      onFinish,
      timerRef,
    };
  },
};
```

## API

### Props

| 参数       | 说明                   | 类型               | 默认值     |
| ---------- | ---------------------- | ------------------ | ---------- |
| time       | 正向计时时长，单位毫秒 | _number \| string_ | `0`        |
| format     | 时间格式               | _string_           | `HH:mm:ss` |
| auto-start | 是否自动开始倒计时     | _boolean_          | `true`     |

### format 格式

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时         |
| mm   | 分钟         |
| ss   | 秒数         |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

### Events

| 事件名 | 说明             | 回调参数                   |
| ------ | ---------------- | -------------------------- |
| finish | 倒计时结束时触发 | -                          |
| change | 倒计时变化时触发 | _currentTime: CurrentTime_ |

### Slots

| 名称    | 说明       | 参数                       |
| ------- | ---------- | -------------------------- |
| default | 自定义内容 | _currentTime: CurrentTime_ |

### CurrentTime 格式

| 名称         | 说明                   | 类型     |
| ------------ | ---------------------- | -------- |
| total        | 剩余总时间（单位毫秒） | _number_ |
| days         | 剩余天数               | _number_ |
| hours        | 剩余小时               | _number_ |
| minutes      | 剩余分钟               | _number_ |
| seconds      | 剩余秒数               | _number_ |
| milliseconds | 剩余毫秒               | _number_ |

### 方法

通过 ref 可以获取到 Timer 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名  | 说明                                                         | 参数 | 返回值 |
| ------- | ------------------------------------------------------------ | ---- | ------ |
| start   | 开始正向计时                                                 | -    | -      |
| pause   | 暂停正向计时                                                 | -    | -      |
| continu | 继续正向计时                                                 | -    | -      |
| reset   | 重设正向计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时 | -    | -      |

