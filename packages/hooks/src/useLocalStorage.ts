import { useState, useEffect, useCallback } from 'react'

/**
 * useLocalStorage Hook
 * 用于同步 localStorage 的状态管理
 *
 * @param key localStorage 的键名
 * @param initialValue 初始值
 * @returns [当前值, 设置值的函数, 删除值的函数]
 *
 * @example
 * ```tsx
 * const [user, setUser, removeUser] = useLocalStorage('user', { name: 'Guest' });
 *
 * return (
 *   <div>
 *     <p>用户: {user.name}</p>
 *     <button onClick={() => setUser({ name: 'Admin' })}>设置为管理员</button>
 *     <button onClick={removeUser}>清除用户</button>
 *   </div>
 * );
 * ```
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 从 localStorage 读取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 设置值到 state 和 localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // 删除值
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // 监听其他标签页的 localStorage 变化
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue, removeValue] as const
}
