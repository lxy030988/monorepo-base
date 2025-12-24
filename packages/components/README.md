# @monorepo-base/components

React UI 组件库,包含可复用的 UI 组件。

## 安装

```bash
npm install @monorepo-base/components
# or
pnpm add @monorepo-base/components
# or
yarn add @monorepo-base/components
```

## 使用

```tsx
import { Button, Header, Page } from '@monorepo-base/components'
import '@monorepo-base/components/styles.css'

function App() {
  return (
    <div>
      <Button primary label="Click me" />
      <Header user={{ name: 'John' }} />
      <Page />
    </div>
  )
}
```

## 组件

### Button

按钮组件,支持多种样式和尺寸。

**Props:**

- `primary` - 是否为主要按钮
- `size` - 尺寸: `'small' | 'medium' | 'large'`
- `label` - 按钮文本
- `backgroundColor` - 自定义背景色
- `onClick` - 点击事件处理函数

**示例:**

```tsx
<Button primary size="large" label="提交" onClick={() => console.log('clicked')} />
```

### Header

页头组件,包含 logo 和用户信息。

**Props:**

- `user` - 用户信息 `{ name: string }`
- `onLogin` - 登录回调
- `onLogout` - 登出回调
- `onCreateAccount` - 创建账户回调

**示例:**

```tsx
<Header user={{ name: 'Jane Doe' }} onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}} />
```

### Page

示例页面组件,展示组件驱动开发的最佳实践。

**示例:**

```tsx
<Page />
```

## 依赖

- React >= 16.8.0

## 在 Monorepo 中使用

如果你在同一个 monorepo 中,可以使用 workspace 协议:

```json
{
  "dependencies": {
    "@monorepo-base/components": "workspace:*"
  }
}
```

## License

ISC
