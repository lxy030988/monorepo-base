/**
 * 邮箱验证
 *
 * @param email 要验证的邮箱地址
 * @returns 是否为有效的邮箱地址
 *
 * @example
 * ```ts
 * isEmail('test@example.com')  // => true
 * isEmail('invalid-email')     // => false
 * ```
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 中国大陆手机号验证
 *
 * @param phone 要验证的手机号
 * @returns 是否为有效的手机号
 *
 * @example
 * ```ts
 * isPhone('13800138000')  // => true
 * isPhone('12345678901')  // => false
 * ```
 */
export function isPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * URL 验证
 *
 * @param url 要验证的 URL
 * @returns 是否为有效的 URL
 *
 * @example
 * ```ts
 * isUrl('https://example.com')  // => true
 * isUrl('not-a-url')            // => false
 * ```
 */
export function isUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 身份证号验证(简单版本)
 *
 * @param idCard 要验证的身份证号
 * @returns 是否为有效的身份证号格式
 *
 * @example
 * ```ts
 * isIdCard('110101199001011234')  // => true (格式正确)
 * isIdCard('123456')              // => false
 * ```
 */
export function isIdCard(idCard: string): boolean {
  // 18位身份证号码正则
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
  return idCardRegex.test(idCard)
}
