export default function ({ $axios }, inject) {
    const req_api = (url, data = {}, config = {}) => {
        return $axios({
            method: 'post',
            url,
            data,
            ...config
        })
    }

    inject(req_api, req_api)
}