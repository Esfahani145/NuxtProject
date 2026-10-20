export default function ({ $axios }, inject) {
    const request = (method, { url, headers, params, data, ...config } = {}) => {
        const options = { ...config, headers, params }
        const methods = {
            get: () => $axios.get(url, options),
            post: () => $axios.post(url, data, options),
            put: () => $axios.put(url, data, options),
            patch: () => $axios.patch(url, data, options),
            delete: () => $axios.delete(url, { ...options, data }),
        }
        const send_request = methods[method]
        if (!send_request) {
            throw new Error(`Unsupported HTTP method: ${method}`)
        }
        return send_request()
    }

    const req_api = (config) => request('post', config)
    req_api.get = (config) => request('get', config)
    req_api.post = (config) => request('post', config)
    req_api.put = (config) => request('put', config)
    req_api.patch = (config) => request('patch', config)
    req_api.delete = (config) => request('delete', config)

    inject('reqApi', req_api)
}
