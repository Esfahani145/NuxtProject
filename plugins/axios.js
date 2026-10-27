export default function ({ $axios }, inject) {
    const base_url = 'https://test-api.sehregoli.com/api/v1/'
    $axios.setBaseURL(base_url)

    $axios.onRequest((config) => {
        if (process.client) {
            const token = localStorage.getItem('user_token')

            if(token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
    })

    const req_api = (url, method = 'post', config = {}) => {
        if (typeof method === 'object' && method !== null) {
            config = method
            method = 'post'
        }
        
        if (typeof method !== 'string') {
            return Promise.reject(new Error('HTTP method must be a string'))
        }

        const { headers = {}, params = {}, data, ...options } = config
        const methods = {
            get: () => $axios.get(url, { ...options, headers, params }),
            post: () => $axios.post(url, data, { ...options, headers, params }),
            put: () => $axios.put(url, data, { ...options, headers, params }),
            patch: () => $axios.patch(url, data, { ...options, headers, params }),
            delete: () => $axios.delete(url, { ...options, headers, params, data })
        }
        const request = methods[method.toLowerCase()]

        if (!request) {
            return Promise.reject(new Error(`Unsupported HTTP method: ${method}`))
        }
        return request()
    }
    inject('reqAPI', req_api)
}
