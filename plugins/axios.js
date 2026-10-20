export default function ({ $axios }, inject) {
    const req_api = ({ url, method = 'post', headers, params, data, ...config }) => {
        const methods = {
            get: () => $axios.get(url, { ...config, headers, params }),
            post: () => $axios.post(url, data, { ...config, headers, params }),
            put: () => $axios.put(url, data, { ...config, headers, params }),
            patch: () => $axios.patch(url, data, { ...config, headers, params }),
            delete: () => $axios.delete(url, { ...config, headers, params, data }),
        }
        const request = methods[method]
        if (!request) {
            throw new Error(`Unsupported HTTP method: ${method}`)
        }
        return request()
    }
    inject('reqApi', req_api)
}