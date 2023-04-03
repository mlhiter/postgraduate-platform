export const ACCESS_TOKEN_KEY = 'access-token'
export const REFRESH_TOKEN_KEY = 'refresh-token'

// 是否已登录
export const isLogin = () => {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY)
}

// 得到token
export const getToken = (tokenKey = ACCESS_TOKEN_KEY) => {
  return localStorage.getItem(tokenKey)
}

// 设置token
export const setToken = (token: string, tokenKey = ACCESS_TOKEN_KEY) => {
  localStorage.setItem(tokenKey, token)
}

// 清除两个token
export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
