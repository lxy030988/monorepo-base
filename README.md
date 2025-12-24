# Monorepo Base

基于 pnpm + tsup + changesets 的 Monorepo 项目模板。

## 📦 项目结构

```
monorepo-base/
├── packages/
│   ├── hooks/          # React Hooks 库
│   │   ├── src/
│   │   │   ├── useToggle.ts        # 布尔状态切换 hook
│   │   │   ├── useLocalStorage.ts  # localStorage 同步 hook
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   └── utils/          # 工具函数库
│       ├── src/
│       │   ├── format.ts    # 格式化工具(日期、数字)
│       │   ├── validate.ts  # 验证工具(邮箱、手机号等)
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── tsup.config.ts
├── .changeset/         # Changesets 配置
├── pnpm-workspace.yaml # pnpm 工作区配置
├── tsconfig.json       # TypeScript 根配置
├── .npmrc              # npm 配置
└── package.json        # 根 package.json
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 构建所有包

```bash
pnpm build
```

### 开发模式(监听文件变化)

```bash
pnpm dev
```

### 清理构建产物

```bash
pnpm clean
```

## 📚 包说明

### @monorepo-base/hooks

React Hooks 工具库,包含常用的自定义 hooks。

**包含的 Hooks:**

- `useToggle` - 布尔状态切换管理
- `useLocalStorage` - localStorage 状态同步(支持 SSR、跨标签页同步)

**使用示例:**

```tsx
import { useToggle, useLocalStorage } from '@monorepo-base/hooks'

function App() {
  const [isOpen, toggle] = useToggle(false)
  const [user, setUser] = useLocalStorage('user', { name: 'Guest' })

  return (
    <div>
      <button onClick={toggle}>切换: {isOpen ? '开' : '关'}</button>
      <p>用户: {user.name}</p>
    </div>
  )
}
```

### @monorepo-base/utils

通用工具函数库,提供格式化和验证等常用功能。

**包含的工具函数:**

**格式化:**

- `formatDate(date, format)` - 日期格式化
- `formatNumber(num, options)` - 数字格式化(千分位、货币等)

**验证:**

- `isEmail(email)` - 邮箱验证
- `isPhone(phone)` - 手机号验证
- `isUrl(url)` - URL 验证
- `isIdCard(idCard)` - 身份证号验证

**使用示例:**

```ts
import { formatDate, formatNumber, isEmail } from '@monorepo-base/utils'

formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
// => '2024-12-24 13:45:30'

formatNumber(1234567.89, { prefix: '¥', decimals: 2 })
// => '¥1,234,567.89'

isEmail('test@example.com')
// => true
```

## 🔄 版本管理与发布

本项目使用 [Changesets](https://github.com/changesets/changesets) 进行版本管理。

### 1. 添加变更记录

当你修改了某个包后,运行:

```bash
pnpm changeset
```

按照提示选择:

- 要发布的包
- 版本类型(major/minor/patch)
- 变更描述

这会在 `.changeset` 目录下创建一个变更文件。

### 2. 更新版本号

```bash
pnpm version
```

这会:

- 更新包的版本号
- 生成 CHANGELOG.md
- 删除已应用的 changeset 文件

### 3. 发布到 Verdaccio(本地 npm registry)

#### 前置条件

确保你的 Verdaccio 服务已启动(默认端口 4873):

```bash
# 如果还没启动,可以运行:
verdaccio
```

#### 发布步骤

**方式一: 使用项目脚本(推荐)**

```bash
# 这会先构建所有包,然后发布
pnpm release --registry http://localhost:4873
```

**方式二: 手动发布单个包**

```bash
# 进入要发布的包目录
cd packages/hooks

# 发布到本地 verdaccio
pnpm publish --registry http://localhost:4873 --no-git-checks
```

#### 首次发布需要登录

```bash
npm adduser --registry http://localhost:4873
```

按提示输入用户名、密码和邮箱(可以随意填写)。

### 4. 从 Verdaccio 安装包

在其他项目中使用:

```bash
# 临时从 verdaccio 安装
npm install @monorepo-base/hooks --registry http://localhost:4873

# 或者配置 .npmrc
echo "registry=http://localhost:4873/" > .npmrc
npm install @monorepo-base/hooks
```

### 5. 查看已发布的包

访问 http://localhost:4873 可以看到 Verdaccio 的 Web 界面,查看所有已发布的包。

## 🛠️ 技术栈

- **pnpm** - 快速、节省磁盘空间的包管理器
- **TypeScript** - 类型安全
- **tsup** - 基于 esbuild 的快速构建工具
- **Changesets** - 版本管理和变更日志生成
- **Verdaccio** - 本地 npm registry

## 📝 开发工作流

1. **开发新功能**

   ```bash
   # 在 packages/hooks 或 packages/utils 中开发
   pnpm dev  # 启动监听模式
   ```

2. **添加变更记录**

   ```bash
   pnpm changeset
   ```

3. **构建**

   ```bash
   pnpm build
   ```

4. **发布到本地 registry**
   ```bash
   pnpm release --registry http://localhost:4873
   ```

## 🔍 常见问题

### Q: 如何添加新的包?

1. 在 `packages/` 下创建新目录
2. 添加 `package.json`、`tsconfig.json`、`tsup.config.ts`
3. 参考现有包的配置
4. 运行 `pnpm install` 安装依赖

### Q: 如何在包之间建立依赖?

在 package.json 中添加依赖:

```json
{
  "dependencies": {
    "@monorepo-base/utils": "workspace:*"
  }
}
```

### Q: 构建失败怎么办?

```bash
# 清理所有构建产物
pnpm clean

# 重新安装依赖
rm -rf node_modules packages/*/node_modules
pnpm install

# 重新构建
pnpm build
```

## 📄 License

ISC
