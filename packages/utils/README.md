# @monorepo-base/utils

通用工具函数库,提供格式化和验证等常用功能。

## 安装

```bash
npm install @monorepo-base/utils
# or
pnpm add @monorepo-base/utils
# or
yarn add @monorepo-base/utils
```

## API

### 格式化工具

#### formatDate

日期格式化工具。

**类型签名:**

```ts
function formatDate(date: Date, format?: string): string
```

**参数:**

- `date` - 要格式化的日期对象
- `format` - 格式字符串,默认 `'YYYY-MM-DD'`
  - `YYYY` - 四位年份
  - `MM` - 两位月份
  - `DD` - 两位日期
  - `HH` - 两位小时
  - `mm` - 两位分钟
  - `ss` - 两位秒数

**使用示例:**

```ts
import { formatDate } from '@monorepo-base/utils'

formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
// => '2024-12-24 14:18:30'

formatDate(new Date(), 'YYYY年MM月DD日')
// => '2024年12月24日'
```

---

#### formatNumber

数字格式化工具,支持千分位、小数位、前后缀等。

**类型签名:**

```ts
function formatNumber(
  num: number,
  options?: {
    decimals?: number
    prefix?: string
    suffix?: string
    separator?: string
  }
): string
```

**参数:**

- `num` - 要格式化的数字
- `options.decimals` - 小数位数,默认 2
- `options.prefix` - 前缀,默认 `''`
- `options.suffix` - 后缀,默认 `''`
- `options.separator` - 千分位分隔符,默认 `','`

**使用示例:**

```ts
import { formatNumber } from '@monorepo-base/utils'

formatNumber(1234567.89)
// => '1,234,567.89'

formatNumber(1234567.89, { decimals: 0 })
// => '1,234,568'

formatNumber(1234567.89, { prefix: '¥', decimals: 2 })
// => '¥1,234,567.89'

formatNumber(1234567.89, { suffix: ' 元' })
// => '1,234,567.89 元'
```

---

### 验证工具

#### isEmail

邮箱地址验证。

**类型签名:**

```ts
function isEmail(email: string): boolean
```

**使用示例:**

```ts
import { isEmail } from '@monorepo-base/utils'

isEmail('test@example.com') // => true
isEmail('invalid-email') // => false
```

---

#### isPhone

中国大陆手机号验证。

**类型签名:**

```ts
function isPhone(phone: string): boolean
```

**使用示例:**

```ts
import { isPhone } from '@monorepo-base/utils'

isPhone('13800138000') // => true
isPhone('12345678901') // => false
```

---

#### isUrl

URL 验证。

**类型签名:**

```ts
function isUrl(url: string): boolean
```

**使用示例:**

```ts
import { isUrl } from '@monorepo-base/utils'

isUrl('https://example.com') // => true
isUrl('not-a-url') // => false
```

---

#### isIdCard

中国大陆身份证号验证(格式验证)。

**类型签名:**

```ts
function isIdCard(idCard: string): boolean
```

**使用示例:**

```ts
import { isIdCard } from '@monorepo-base/utils'

isIdCard('110101199001011234') // => true (格式正确)
isIdCard('123456') // => false
```

---

## 完整示例

```ts
import { formatDate, formatNumber, isEmail, isPhone, isUrl, isIdCard } from '@monorepo-base/utils'

// 格式化
const now = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
const price = formatNumber(9999.99, { prefix: '¥' })

// 验证
const validEmail = isEmail('user@example.com')
const validPhone = isPhone('13800138000')
const validUrl = isUrl('https://example.com')
const validIdCard = isIdCard('110101199001011234')
```

## 依赖

无外部依赖。

## License

ISC
