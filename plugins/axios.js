export default function ({ $axios }, inject) {
    const req_api = (url, method = 'post', headers, params, data, config = {}) => {
        const methods = {
            get: () => $axios.get(url, { headers, params, ...config }),
            post: () => $axios.post(url, data, { headers, params, ...config }),
            put: () => $axios.put(url, data, { headers, params, ...config }),
            patch: () => $axios.patch(url, data, { headers, params, ...config }),
            delete: () => $axios.delete(url, { headers, params, data, ...config }),
        }
        const request = methods[method]
        if (!request) {
            throw new Error(`Unsupported HTTP method: ${method}`)
        }
        return request()
    }

    inject('req_api', req_api)
}