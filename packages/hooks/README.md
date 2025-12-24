# @monorepo-base/hooks

React Hooks 工具库,提供常用的自定义 hooks。

## 安装

```bash
npm install @monorepo-base/hooks
# or
pnpm add @monorepo-base/hooks
# or
yarn add @monorepo-base/hooks
```

## Hooks

### useToggle

用于管理布尔状态的切换。

**类型签名:**

```ts
function useToggle(initialValue?: boolean): readonly [boolean, () => void, () => void, () => void]
```

**使用示例:**

```tsx
import { useToggle } from '@monorepo-base/hooks'

function Modal() {
  const [isOpen, toggle, setTrue, setFalse] = useToggle(false)

  return (
    <div>
      <button onClick={toggle}>切换</button>
      <button onClick={setTrue}>打开</button>
      <button onClick={setFalse}>关闭</button>
      {isOpen && <div>模态框内容</div>}
    </div>
  )
}
```

**返回值:**

- `[0]` - 当前状态值
- `[1]` - 切换函数
- `[2]` - 设置为 true 的函数
- `[3]` - 设置为 false 的函数

---

### useLocalStorage

用于同步 localStorage 的状态管理,支持 SSR 和跨标签页同步。

**类型签名:**

```ts
function useLocalStorage<T>(
  key: string,
  initialValue: T
): readonly [T, (value: T | ((val: T) => T)) => void, () => void]
```

**使用示例:**

```tsx
import { useLocalStorage } from '@monorepo-base/hooks'

function UserProfile() {
  const [user, setUser, removeUser] = useLocalStorage('user', {
    name: 'Guest',
    theme: 'light'
  })

  return (
    <div>
      <p>用户: {user.name}</p>
      <button onClick={() => setUser({ ...user, name: 'Admin' })}>设置为管理员</button>
      <button onClick={removeUser}>清除用户</button>
    </div>
  )
}
```

**特性:**

- ✅ TypeScript 类型安全
- ✅ SSR 支持(服务端渲染安全)
- ✅ 跨标签页同步
- ✅ 错误处理
- ✅ 支持函数式更新

**返回值:**

- `[0]` - 当前存储的值
- `[1]` - 设置值的函数
- `[2]` - 删除值的函数

---

### useFormattedDate

用于格式化日期并自动更新的 hook。内部使用 `@monorepo-base/utils` 的 `formatDate` 函数。

**类型签名:**

```ts
function useFormattedDate(date: Date, format?: string, autoUpdate?: boolean): string
```

**使用示例:**

```tsx
import { useFormattedDate } from '@monorepo-base/hooks'

function Clock() {
  // 静态日期格式化
  const staticDate = useFormattedDate(new Date(), 'YYYY-MM-DD')

  // 实时时钟(每秒自动更新)
  const clock = useFormattedDate(new Date(), 'HH:mm:ss', true)

  return (
    <div>
      <p>日期: {staticDate}</p>
      <p>时钟: {clock}</p>
    </div>
  )
}
```

**参数:**

- `date` - 要格式化的日期对象
- `format` - 格式字符串,默认 `'YYYY-MM-DD HH:mm:ss'`
  - `YYYY` - 四位年份
  - `MM` - 两位月份
  - `DD` - 两位日期
  - `HH` - 两位小时
  - `mm` - 两位分钟
  - `ss` - 两位秒数
- `autoUpdate` - 是否自动更新(每秒),默认 `false`

**特性:**

- ✅ 支持自定义格式
- ✅ 可选的自动更新(实时时钟)
- ✅ 使用 monorepo 内部的 utils 包
- ✅ 自动清理定时器

**返回值:**

格式化后的日期字符串

## 依赖

- React >= 16.8.0
- @monorepo-base/utils (内部依赖)

## License

ISC
