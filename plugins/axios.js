export default function ({ $axios }, inject) {
    const req_api = ({url, headers = {}, params = {}, data = {}, config = {}, method = 'post'} = {}) => {
        const methods = {
            get: () => $axios.get(url, { headers, params, ...config }),
            post: () => $axios.post(url, data, { headers, params, ...config }),
            put: () => $axios.put(url, data, { headers, params, ...config }),
            patch: () => $axios.patch(url, data, { headers, params, ...config }),
            delete: () => $axios.delete(url, { headers, params, data, ...config }),
        }
        const request = methods[method.toLowerCase()]
        if (!request) {
            throw new Error(`Unsupported HTTP method: ${method}`)
        }
        return request()
    }

    inject('reqAPI', req_api)
}