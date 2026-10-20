export default function ({ $axios }, inject) {
    const req_api = (url, method = 'post', config = {}) => {
        if( typeof method === 'object' && method !==null){
            config = method
            method = 'post'
        }
        const { headers = {}, params = {}, data, ...options} = config

        const methods = {
            get: () => $axios.get(url, { ...options, headers, params }),
            post: () => $axios.post(url, data, { ...options, headers, params }),
            put: () => $axios.put(url, data, { ...options, headers, params }),
            patch: () => $axios.patch(url, data, { ...options, headers, params }),
            delete: () => $axios.delete(url, { ...options, headers, params, data})
        }

        const request = methods[method.toLowerCase()]
        if (!request) {
            return Promise.reject(new Error(`Unsupported HTTP method: ${method}`))
        }
        return request()
    }
    inject('reqApi', req_api)
}
