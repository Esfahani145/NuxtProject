export const state = () => ({
    token: null,
    user: null
})

export const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },

    SET_USER(state, user) {
        state.user = user
    },

    LOGOUT(state) {
        state.token = null
        state.user = null
    }
}

export const actions = {
    initAuth({ commit }) {
        if (process.client) {
            const token = localStorage.getItem('user_token')
            const user_info = localStorage.getItem('user_info')

            if (token && user_info) {
                const user = JSON.parse(user_info)

                commit('SET_TOKEN', token)
                commit('SET_USER', user)
            }
        }
    },

    login({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            const input_phone = credentials.phone.trim()
            const input_password = String(credentials.password).trim()

            if (process.client) {
                const saved_user = localStorage.getItem('user_info')

                if (!saved_user) {
                    reject(
                        new Error('حساب کاربری پیدا نشد. ابتدا ثبت‌نام کنید.')
                    )
                    return
                }

                const user_info = JSON.parse(saved_user)

                const is_valid_phone = user_info.phone === input_phone
                const is_valid_password = user_info.password === input_password

                if (is_valid_phone && is_valid_password) {
                    const token = 'mock-token-123456'

                    commit('SET_TOKEN', token)
                    commit('SET_USER', user_info)

                    localStorage.setItem('user_token', token)

                    resolve({ success: true })
                    return
                }
            }

            reject(
                new Error('شماره موبایل یا رمز عبور اشتباه است.')
            )
        })
    },

    signup({ commit }, credentials) {
        return new Promise((resolve) => {
            const token = 'mock-token-123456'

            const user_info = {
                full_name: credentials.full_name,
                phone: credentials.phone,
                email: credentials.email,
                national_code: credentials.national_code,
                birth_date: credentials.birth_date,
                gender: credentials.gender,
                province: credentials.province,
                city: credentials.city,
                address: credentials.address,
                password: credentials.password,
                role: 'کاربر عادی'
            }

            commit('SET_TOKEN', token)
            commit('SET_USER', user_info)

            if (process.client) {
                localStorage.setItem('user_token', token)
                localStorage.setItem(
                    'user_info',
                    JSON.stringify(user_info)
                )
            }

            resolve({ success: true })
        })
    },

    logout({ commit }) {
        commit('LOGOUT')

        if (process.client) {
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_info')
        }
    }
}

export const getters = {
    isAuthenticated: (state) => !!state.token || !!state.user,

    currentUser: (state) => state.user
}