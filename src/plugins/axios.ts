// 请求拦截器
// 所有的请求都会到这里来,会去执行第一个参数，同时自动传入config
axios.interceptors.request.use(
  function (config) {
    if (config.method === 'POST') {
      config.headers['Content-Type'] = 'multipart/form-data'
      // config.data = queryString.stringify(config.data)
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
//响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data //这里因为axios会自动给我们套一层data，所以
      // 这样做避免后期出现response.data.data.xxx的情况
    } else {
      return Promise.reject(new Error(response.data.message))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default axios
