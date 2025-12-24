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

## 🔄 版本管理与发布 (Changesets)

本项目使用 [Changesets](https://github.com/changesets/changesets) 进行版本管理和变更日志生成。

### 📖 什么是 Changesets?

Changesets 是一个用于管理 monorepo 版本和变更日志的工具。它通过创建"变更集"文件来记录你的修改,然后自动更新版本号和生成 CHANGELOG。

### 🎯 语义化版本 (Semantic Versioning)

版本号格式: `MAJOR.MINOR.PATCH` (例如: `1.2.3`)

- **PATCH** (补丁版本 0.0.x) - 向后兼容的 bug 修复

  - 示例: 修复函数中的 bug、优化性能、更新文档
  - 命令: 选择 `patch`

- **MINOR** (次版本 0.x.0) - 向后兼容的新功能

  - 示例: 添加新的 hook、新的工具函数、新的可选参数
  - 命令: 选择 `minor`

- **MAJOR** (主版本 x.0.0) - 不兼容的 API 修改
  - 示例: 删除函数、修改函数签名、重命名导出
  - 命令: 选择 `major`

### 📝 完整工作流程

#### 1️⃣ 开发新功能或修复 Bug

```bash
# 在 packages/hooks 或 packages/utils 中开发
pnpm dev  # 启动监听模式
```

修改代码后,确保功能正常工作。

#### 2️⃣ 添加 Changeset (记录变更)

```bash
pnpm changeset
```

**交互式流程:**

```
🦋  Which packages would you like to include?
> ◉ @monorepo-base/hooks
  ◯ @monorepo-base/utils
```

使用空格选择包,回车确认。

```
🦋  Which packages should have a major bump?
  ◯ @monorepo-base/hooks

🦋  Which packages should have a minor bump?
  ◉ @monorepo-base/hooks

🦋  Which packages should have a patch bump?
  ◯ @monorepo-base/hooks
```

选择版本类型(major/minor/patch)。

```
🦋  Please enter a summary for this change (this will be in the changelogs).
Summary › Added useDebounce hook
```

输入变更描述(会出现在 CHANGELOG 中)。

**生成的文件:** `.changeset/random-name.md`

```markdown
---
'@monorepo-base/hooks': minor
---

Added useDebounce hook for debouncing values
```

#### 3️⃣ 提交 Changeset 到 Git

```bash
git add .changeset/
git commit -m "chore: add changeset for useDebounce hook"
```

**重要:** 将 changeset 文件提交到版本控制,这样团队成员都能看到即将发布的变更。

#### 4️⃣ 更新版本号 (发布前)

```bash
pnpm changeset version
```

**这个命令会:**

- ✅ 读取所有 `.changeset/*.md` 文件
- ✅ 更新 `package.json` 中的版本号
- ✅ 生成或更新 `CHANGELOG.md`
- ✅ 删除已应用的 changeset 文件

**示例输出:**

```
🦋  All files have been updated. Review them and commit at your leisure
```

**生成的 CHANGELOG.md:**

```markdown
# @monorepo-base/hooks

## 0.2.0

### Minor Changes

- Added useDebounce hook for debouncing values

## 0.1.1

### Patch Changes

- Add README documentation to packages
```

#### 5️⃣ 提交版本更新

```bash
git add .
git commit -m "chore: release packages"
git push
```

#### 6️⃣ 发布到 npm/Verdaccio

**发布到本地 Verdaccio:**

```bash
# 构建并发布
pnpm release --registry http://localhost:4873
```

**发布到 npm 官方源:**

```bash
# 确保已登录 npm
npm login

# 发布
pnpm release
```

### 🔧 常用场景示例

#### 场景 1: 修复 Bug (Patch)

```bash
# 1. 修复代码
# 2. 添加 changeset
pnpm changeset
# 选择: patch
# 描述: Fixed useToggle initial value bug

# 3. 提交
git add .
git commit -m "fix: useToggle initial value bug"

# 4. 更新版本 (0.1.1 -> 0.1.2)
pnpm changeset version

# 5. 发布
pnpm release --registry http://localhost:4873
```

#### 场景 2: 添加新功能 (Minor)

```bash
# 1. 开发新 hook
# 2. 添加 changeset
pnpm changeset
# 选择: minor
# 描述: Added useDebounce hook

# 3. 提交
git add .
git commit -m "feat: add useDebounce hook"

# 4. 更新版本 (0.1.2 -> 0.2.0)
pnpm changeset version

# 5. 发布
pnpm release --registry http://localhost:4873
```

#### 场景 3: 破坏性更新 (Major)

```bash
# 1. 修改 API
# 2. 添加 changeset
pnpm changeset
# 选择: major
# 描述: BREAKING CHANGE: Renamed useToggle to useBoolean

# 3. 提交
git add .
git commit -m "feat!: rename useToggle to useBoolean"

# 4. 更新版本 (0.2.0 -> 1.0.0)
pnpm changeset version

# 5. 发布
pnpm release --registry http://localhost:4873
```

#### 场景 4: 同时更新多个包

```bash
pnpm changeset
# 选择多个包:
# ◉ @monorepo-base/hooks (minor)
# ◉ @monorepo-base/utils (patch)
```

### 📋 Changeset 最佳实践

1. **及时创建 Changeset**

   - 每次有意义的修改都应该创建 changeset
   - 不要等到发布前才批量创建

2. **清晰的变更描述**

   - 使用用户视角描述变更
   - 说明"做了什么"而不是"怎么做的"
   - 好的示例: "Added useDebounce hook for debouncing values"
   - 不好的示例: "Updated code in hooks folder"

3. **合理选择版本类型**

   - 有疑问时选择更保守的版本(minor 而不是 patch)
   - 破坏性更新一定要选择 major

4. **定期发布**

   - 不要积累太多 changeset
   - 建议每周或每两周发布一次

5. **团队协作**
   - 将 changeset 文件提交到 Git
   - 在 PR 中包含 changeset
   - Code Review 时检查 changeset 的准确性

### 🎨 手动创建 Changeset (高级)

如果你不想使用交互式命令,可以手动创建 changeset 文件:

```bash
# 创建文件 .changeset/my-feature.md
```

```markdown
---
'@monorepo-base/hooks': minor
'@monorepo-base/utils': patch
---

Added new features:

- useDebounce hook in hooks package
- Fixed formatDate timezone issue in utils package
```

### 🔍 查看待发布的变更

```bash
# 查看 changeset 状态
pnpm changeset status

# 输出示例:
# Changes to be released:
# @monorepo-base/hooks: minor
# @monorepo-base/utils: patch
```

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
