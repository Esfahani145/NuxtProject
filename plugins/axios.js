import Vue from 'vue'

const error_message = 'پاسخی از سمت سرور دریافت نشد'

export default function ({ $axios, store, app }, inject) {
  const toast = app.$toast || Vue.prototype.$toast

//   const base_url = 'https://sehregoli-test-api.sifb.ir/'
  const base_url = 'https://sehregoli-test-api.sifb.ir/api/v1/'

  $axios.setBaseURL(base_url)

  $axios.onRequest((config) => {
    if (process.client) {
      const token = localStorage.getItem('user_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  })

  function dataFormat(response, getOnlyData) {
    return {
      status: true,
      data: getOnlyData ? response.data : response,
    }
  }

  function checkResponse(response, getOnlyData, config) {
    if (response && response.date && store._actions.setServerTime) {
      store.dispatch('setServerTime', response.date)
    }
    if (response && response.status) {
      if (response.status === 200) {
        return dataFormat(response, getOnlyData)
      }
      if (response.message && toast) {
        toast.error(response.message)
      }
      if (response.status === 401) {
        const noRedirect =
          config && typeof config.redirect !== 'undefined' && config.redirect === false
        if (!noRedirect) {
          store.dispatch('auth/error401')
        }
      }
    }
    return { status: false, data: [] }
  }

  function checkErrorResponse(error) {
    try {
      if ($axios.isCancel && $axios.isCancel(error)) return
      const message = error && error.response && error.response.data && error.response.data.message
      if (toast) toast.error(message || error_message)
    } catch (e) {}
  }

  inject('reqApi', (url, data = {}, config = {}, getOnlyData = true, type = 'post') => {
    return new Promise((resolve, reject) => {
        switch (type) {
          case "post":
            $axios
              .$post(url, data, config)
              .then((response) => {
                let check = checkResponse(response, getOnlyData, config);
                if (check.status) {
                  resolve(check.data);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                checkErrorResponse(error);
                reject(error);
              });
            break;
          case "delete":
            $axios
              .$delete(url, { data, config })
              .then((response) => {
                let check = checkResponse(response, getOnlyData, config);
                if (check.status) {
                  resolve(check.data);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                checkErrorResponse(error);
                reject();
              });
            break;
          case "put":
            $axios
              .$put(url, data, config)
              .then((response) => {
                let check = checkResponse(response, getOnlyData, config);
                if (check.status) {
                  resolve(check.data);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                checkErrorResponse(error);
                reject();
              });
            break;
          case "patch":
            $axios
              .$patch(url, { data, config })
              .then((response) => {
                let check = checkResponse(response, getOnlyData, config);
                if (check.status) {
                  resolve(check.data);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                checkErrorResponse(error);
                reject();
              });
            break;
          case "get":
            let i = 0;
            if (data != null) {
              for (const key in data) {
                if (i == 0) {
                  url += "?";
                } else {
                  url += "&";
                }
                url += `${key}=${data[key]}`;
                i++;
              }
            }
            $axios
              .$get(url)
              .then((response) => {
                let check = checkResponse(response, getOnlyData, config);
                if (check.status) {
                  resolve(check.data);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                checkErrorResponse(error);
                reject();
              });
            break;
        }
    })
  })
}