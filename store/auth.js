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

            const is_valid_phone = input_phone === '09111111111'

            const is_valid_password = input_password === '12345678'

            if (is_valid_phone && is_valid_password) {
                const token = 'mock-token-123456'
                const user_info = { full_name: 'مدیر سیستم', phone: input_phone, role: 'کاربر آنلاین'}

                commit('SET_TOKEN', token)
                commit('SET_USER', user_info)

                if (process.client) {
                    localStorage.setItem( 'user_token', token)
                    localStorage.setItem( 'user_info', JSON.stringify(user_info))
                }
                resolve({ success: true })
            } else {
                reject(
                    new Error('شماره موبایل یا رمز عبور اشتباه است.')
                )
            }
        })
    },

    signup({ commit }, credentials) {
        return new Promise((resolve) => {
            const user_info = {
                full_name: credentials.fullName,
                phone: credentials.phone,
                email: credentials.email,
                national_code: credentials.nationalCode,
                birth_date: credentials.birthDate,
                gender: credentials.gender,
                province: credentials.province,
                city: credentials.city,
                address: credentials.address,
                role: 'کاربر عادی'
            }

            commit('SET_USER', user_info)

            if (process.client) {
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