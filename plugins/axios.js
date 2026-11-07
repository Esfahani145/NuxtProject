export default function ({ $axios }, inject) {
  const base_url = "https://test-api.sehregoli.com/api/v1/"
  $axios.setBaseURL(base_url)

  $axios.onRequest((config) => {
    if (process.client) {
      const token = localStorage.getItem('user_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  })

  const req_api = (url, data = {}, config = {}, getOnlyData = true, type = 'post') => {
    const method = String(type).toLowerCase()

    const methods = {
      get: () => $axios.$get(url, { ...config, params: data }),
      post: () => $axios.$post(url, data, config),
      put: () => $axios.$put(url, data, config),
      patch: () => $axios.$patch(url, data, config),
      delete: () => $axios.$delete(url, { ...config, data }),
    }

    const request = methods[method]

    if (!request) {
      return Promise.reject(new Error(`Unsupported HTTP method: ${method}`))
    }

    return request()
  }

  inject('reqApi', req_api)
}