import { useState, useEffect } from 'react'
import { formatDate } from '@monorepo-base/utils'

/**
 * useFormattedDate Hook
 * 用于格式化日期并自动更新的 hook
 *
 * @param date 要格式化的日期
 * @param format 格式字符串,默认 'YYYY-MM-DD HH:mm:ss'
 * @param autoUpdate 是否自动更新(每秒),默认 false
 * @returns 格式化后的日期字符串
 *
 * @example
 * ```tsx
 * // 静态日期格式化
 * const formatted = useFormattedDate(new Date(), 'YYYY-MM-DD');
 *
 * // 实时时钟(每秒更新)
 * const clock = useFormattedDate(new Date(), 'HH:mm:ss', true);
 *
 * return (
 *   <div>
 *     <p>日期: {formatted}</p>
 *     <p>时钟: {clock}</p>
 *   </div>
 * );
 * ```
 */
export function useFormattedDate(
  date: Date,
  format: string = 'YYYY-MM-DD HH:mm:ss',
  autoUpdate: boolean = false
): string {
  const [formattedDate, setFormattedDate] = useState(() => formatDate(date, format))

  useEffect(() => {
    if (!autoUpdate) {
      setFormattedDate(formatDate(date, format))
      return
    }

    // 自动更新模式:每秒更新一次
    const updateDate = () => {
      setFormattedDate(formatDate(new Date(), format))
    }

    // 立即更新一次
    updateDate()

    // 设置定时器
    const timer = setInterval(updateDate, 1000)

    return () => clearInterval(timer)
  }, [date, format, autoUpdate])

  return formattedDate
}
