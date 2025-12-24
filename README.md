# Monorepo Base

一个基于 pnpm workspace 的现代化 Monorepo 项目模板,集成了 Tailwind CSS v4、Storybook、Changesets 版本管理和 Verdaccio 本地 npm registry。

## 📦 项目架构

```
monorepo-base/
├── apps/                      # 应用目录
│   └── play-ui/              # Storybook 预览应用
│       ├── .storybook/       # Storybook 配置
│       ├── src/              # 应用源码
│       ├── postcss.config.js # PostCSS 配置
│       ├── tailwind.config.js # Tailwind 配置
│       └── vite.config.ts    # Vite 配置
├── packages/                  # 包目录
│   ├── components/           # React 组件库
│   │   ├── src/             # 组件源码
│   │   ├── tailwind.config.js # 组件主题配置
│   │   └── package.json
│   ├── hooks/               # React Hooks 集合
│   │   ├── src/
│   │   └── package.json
│   └── utils/               # 工具函数集合
│       ├── src/
│       └── package.json
├── .changeset/              # Changesets 配置
├── tsconfig.json            # 根 TypeScript 配置
├── pnpm-workspace.yaml      # pnpm workspace 配置
└── package.json             # 根 package.json
```

## 🎨 技术栈

- **包管理器**: pnpm v10.23.0
- **构建工具**: tsup (基于 esbuild)
- **开发工具**: Vite, Storybook
- **样式方案**: Tailwind CSS v4
- **版本管理**: Changesets
- **本地 Registry**: Verdaccio
- **语言**: TypeScript

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

#### 启动 Storybook (组件预览)

```bash
cd apps/play-ui
pnpm run storybook
```

访问 http://localhost:6006

#### 启动 Vite 开发服务器

```bash
cd apps/play-ui
pnpm run dev
```

访问 http://localhost:5173

### 构建所有包

```bash
pnpm build
```

## 📚 包说明

### @monorepo-base/components

React 组件库,使用 Tailwind CSS v4 进行样式化。

**特性**:

- ✅ 5 种 Button 变体 (primary, secondary, outline, ghost, danger)
- ✅ 3 种尺寸 (sm, md, lg)
- ✅ Header 和 Page 组件
- ✅ 自定义主题色 (primary: #555ab9)
- ✅ 完整的 TypeScript 类型定义

**使用示例**:

```tsx
import { Button } from '@monorepo-base/components'

;<Button variant="primary" size="md" label="点击我" />
```

### @monorepo-base/hooks

React Hooks 集合。

**包含**:

- `useToggle` - 布尔值切换
- `useLocalStorage` - localStorage 持久化
- `useFormattedDate` - 日期格式化

### @monorepo-base/utils

通用工具函数集合。

**包含**:

- `formatDate` - 日期格式化
- `formatNumber` - 数字格式化
- `validation` - 验证工具

## 🎨 Tailwind CSS 集成

### 架构设计

采用 Tailwind CSS v4 推荐的 Monorepo 策略:

1. **Components 包**:

   - 不编译 CSS,只提供带 Tailwind 类的组件
   - 定义自定义主题 (`tailwind.config.js`)
   - 将 Tailwind 作为 peer dependency

2. **Play-UI 应用**:
   - 负责 Tailwind CSS 编译
   - 扫描自身和 components 包的源文件
   - 继承 components 包的主题配置

### 配置文件

**根目录 tsconfig.json** - 统一路径映射:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@monorepo-base/components": ["./packages/components/src"],
      "@monorepo-base/hooks": ["./packages/hooks/src"],
      "@monorepo-base/utils": ["./packages/utils/src"]
    }
  }
}
```

**play-ui/postcss.config.js**:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

**play-ui/tailwind.config.js**:

```js
import componentsConfig from '../../packages/components/tailwind.config.js'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/components/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...componentsConfig.theme?.extend
    }
  }
}
```

## 🔥 热模块替换 (HMR)

项目配置了源文件直接引用,无需手动编译即可开发:

### Vite 配置

```typescript
// apps/play-ui/vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@monorepo-base/components': path.resolve(__dirname, '../../packages/components/src'),
      '@monorepo-base/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@monorepo-base/utils': path.resolve(__dirname, '../../packages/utils/src')
    }
  }
})
```

### 效果

- ✅ 修改 packages 代码立即热更新
- ✅ 无需手动运行 build 命令
- ✅ 支持 TypeScript 类型检查
- ✅ packages 之间可以相互引用

## 📦 版本管理与发布

### 使用 Changesets

#### 1. 创建 Changeset

```bash
pnpm changeset
```

交互式选择:

1. 选择要更新的包
2. 选择版本类型 (major/minor/patch)
3. 输入变更描述

#### 2. 更新版本号

```bash
pnpm changeset version
```

这会:

- 更新 package.json 中的版本号
- 生成/更新 CHANGELOG.md
- 删除已应用的 changeset 文件

#### 3. 发布到 Verdaccio

```bash
pnpm release --registry http://localhost:4873
```

或发布到 npm:

```bash
pnpm release
```

### 版本规范

遵循 [Semantic Versioning](https://semver.org/):

- **Major (1.0.0)**: 破坏性变更
- **Minor (0.1.0)**: 新功能,向后兼容
- **Patch (0.0.1)**: Bug 修复,向后兼容

## 🛠️ 开发工作流

### 添加新组件

1. 在 `packages/components/src` 创建组件目录
2. 编写组件代码,使用 Tailwind 类
3. 在 `src/index.ts` 中导出
4. 在 `play-ui` 中测试

### 添加新 Hook

1. 在 `packages/hooks/src` 创建 hook 文件
2. 编写 hook 逻辑
3. 在 `src/index.ts` 中导出
4. 编写单元测试

### 包之间相互引用

直接使用包名引用,无需额外配置:

```typescript
// packages/hooks/src/useFormattedDate.ts
import { formatDate } from '@monorepo-base/utils'

// packages/components/src/DateDisplay.tsx
import { useFormattedDate } from '@monorepo-base/hooks'
```

## 🔧 常用命令

### 根目录

```bash
# 安装所有依赖
pnpm install

# 构建所有包
pnpm build

# 清理所有 dist 目录
pnpm clean

# 创建 changeset
pnpm changeset

# 更新版本号
pnpm changeset version

# 发布到 Verdaccio
pnpm release --registry http://localhost:4873
```

### 单个包

```bash
# 构建单个包
pnpm --filter @monorepo-base/components build

# 监听模式构建
pnpm --filter @monorepo-base/components dev

# 清理单个包
pnpm --filter @monorepo-base/components clean
```

### Play-UI

```bash
cd apps/play-ui

# 启动 Storybook
pnpm run storybook

# 启动 Vite 开发服务器
pnpm run dev

# 构建 Storybook
pnpm run build-storybook
```

## 🌐 Verdaccio 本地 Registry

### 启动 Verdaccio

```bash
verdaccio
```

访问 http://localhost:4873

### 配置 npm registry

临时使用:

```bash
pnpm publish --registry http://localhost:4873
```

永久配置 (在 .npmrc):

```
registry=http://localhost:4873/
```

### 安装已发布的包

```bash
pnpm add @monorepo-base/components --registry http://localhost:4873
```

## 📖 最佳实践

### 1. 组件开发

- ✅ 使用 Tailwind 实用类而非自定义 CSS
- ✅ 提供完整的 TypeScript 类型
- ✅ 编写 Storybook stories
- ✅ 保持组件单一职责

### 2. 版本管理

- ✅ 每次变更都创建 changeset
- ✅ 遵循语义化版本规范
- ✅ 编写清晰的 changelog
- ✅ 发布前测试所有包

### 3. 代码组织

- ✅ 按功能组织代码,不按类型
- ✅ 使用 barrel exports (index.ts)
- ✅ 保持包之间的依赖关系清晰
- ✅ 避免循环依赖

### 4. 样式管理

- ✅ 在 components 包定义主题
- ✅ 使用 Tailwind 配置共享颜色
- ✅ 避免内联样式
- ✅ 保持样式一致性

## 🐛 故障排除

### TypeScript 找不到模块

确保根目录 `tsconfig.json` 中配置了正确的 paths:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@monorepo-base/*": ["./packages/*/src"]
    }
  }
}
```

### Tailwind 样式不生效

1. 检查 `postcss.config.js` 是否正确配置
2. 确认 `tailwind.config.js` 的 content 路径包含所有源文件
3. 重启开发服务器

### 包引用错误

1. 运行 `pnpm install` 重新链接
2. 检查 package.json 中的依赖版本
3. 清理并重新构建: `pnpm clean && pnpm build`

## 📝 相关文档

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Changesets](https://github.com/changesets/changesets)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Storybook](https://storybook.js.org/)
- [tsup](https://tsup.egoist.dev/)

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!
