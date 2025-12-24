/**
 * 日期格式化工具
 *
 * @param date 要格式化的日期
 * @param format 格式字符串，支持: YYYY, MM, DD, HH, mm, ss
 * @returns 格式化后的日期字符串
 *
 * @example
 * ```ts
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 * // => '2024-12-24 13:45:30'
 *
 * formatDate(new Date(), 'YYYY年MM月DD日')
 * // => '2024年12月24日'
 * ```
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 数字格式化工具
 *
 * @param num 要格式化的数字
 * @param options 格式化选项
 * @returns 格式化后的数字字符串
 *
 * @example
 * ```ts
 * formatNumber(1234567.89)
 * // => '1,234,567.89'
 *
 * formatNumber(1234567.89, { decimals: 0 })
 * // => '1,234,568'
 *
 * formatNumber(1234567.89, { prefix: '¥', decimals: 2 })
 * // => '¥1,234,567.89'
 * ```
 */
export function formatNumber(
  num: number,
  options: {
    decimals?: number
    prefix?: string
    suffix?: string
    separator?: string
  } = {}
): string {
  const { decimals = 2, prefix = '', suffix = '', separator = ',' } = options

  // 处理小数位数
  const fixed = num.toFixed(decimals)

  // 分离整数和小数部分
  const [integer, decimal] = fixed.split('.')

  // 添加千分位分隔符
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  // 组合结果
  const result = decimal ? `${formattedInteger}.${decimal}` : formattedInteger

  return `${prefix}${result}${suffix}`
}
