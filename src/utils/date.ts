// 处理时间字符串
// 2023-03-26T01:36:43.000+0000 => 2023-03-26 01:36:43
export function dateSolve(dateString: string) {
  const date = new Date(dateString)
  // 获取年月日时分秒
  const year = date.getFullYear() // 2023
  const month = date.getMonth() + 1 // 3 (月份是从 0 开始计数的，所以要加 1)
  const day = date.getDate() // 26
  const hour = date.getHours() // 1
  const minute = date.getMinutes() // 36
  const second = date.getSeconds() // 43

  // 格式化为字符串
  const formattedDateString = `${year}-${month
    .toString()
    .padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour
    .toString()
    .padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second
    .toString()
    .padStart(2, '0')}`
  return formattedDateString
}
