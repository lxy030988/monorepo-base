import { useState, useCallback } from 'react'

/**
 * useToggle Hook
 * 用于管理布尔状态的切换
 *
 * @param initialValue 初始值，默认为 false
 * @returns [当前状态, 切换函数, 设置为true的函数, 设置为false的函数]
 *
 * @example
 * ```tsx
 * const [isOpen, toggle, setTrue, setFalse] = useToggle(false);
 *
 * return (
 *   <div>
 *     <p>状态: {isOpen ? '开' : '关'}</p>
 *     <button onClick={toggle}>切换</button>
 *     <button onClick={setTrue}>打开</button>
 *     <button onClick={setFalse}>关闭</button>
 *   </div>
 * );
 * ```
 */
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return [value, toggle, setTrue, setFalse] as const
}
