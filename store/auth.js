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
    },

    DELETE_ACCOUNT(state) {
        state.token = null
        state.user = null
    }
}

export const actions = {
    initAuth({ commit }) {
        if (!process.client) return
        const token = localStorage.getItem('user_token')
        const user_info = localStorage.getItem('user_info')

        if (token && user_info) {
            const user = JSON.parse(user_info)

            commit('SET_TOKEN', token)
            commit('SET_USER', user)
        }
    },

    login({ commit }, credentials) {
        if (!process.client) return
        const saved_users = localStorage.getItem('users')
        const users = saved_users ? JSON.parse(saved_users) : []
        const input_phone = String(credentials.phone).trim()
        const input_password = String(credentials.password).trim()
        const user_info = users.find(user => user.phone === input_phone && user.password === input_password)

        if (!user_info) {
            throw new Error('شماره موبایل یا رمز عبور اشتباه است.')
        }

        const token = 'mock-token-123456'

        commit('SET_TOKEN', token)
        commit('SET_USER', user_info)

        localStorage.setItem('user_token', token)
        localStorage.setItem('user_info', JSON.stringify(user_info))
    },

    signup(_, credentials) {
        if (!process.client) return
        const saved_users = localStorage.getItem('users')
        const users = saved_users ? JSON.parse(saved_users) : []
        const input_phone = String(credentials.phone).trim()
        const input_email = String(credentials.email).trim().toLowerCase()
        const input_national_code = String(credentials.national_code).trim()
        const existing_user = users.find(user => user.national_code === input_national_code || user.phone === input_phone)

        if (existing_user) {
            if (existing_user.national_code === input_national_code) {
                throw new Error('کاربری با این کد ملی وجود دارد')
            }

            if (existing_user.phone === input_phone) {
                throw new Error('کاربری با این شماره تلفن وجود دارد')
            }
        }

        const user_info = {
            full_name: credentials.full_name,
            phone: input_phone,
            email: input_email,
            national_code: input_national_code,
            birth_date: credentials.birth_date,
            gender: credentials.gender,
            province: credentials.province,
            city: credentials.city,
            address: credentials.address,
            password: credentials.password,
            role: 'کاربر عادی'
        }
        users.push(user_info)
        localStorage.setItem('users', JSON.stringify(users))
    },

    logout({ commit }) {
        if (process.client) {
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_info')
        }
        commit('LOGOUT')
    },

    deleteAccount({ commit, state }) {
        if (process.client) {
            const saved_users = localStorage.getItem('users')
            const users = saved_users ? JSON.parse(saved_users) : []
            const current_user = state.user

            if (current_user) {
                const updated_users = users.filter(user => user.national_code !== current_user.national_code)
                localStorage.setItem('users', JSON.stringify(updated_users))
            }
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_info')
        }
        commit('DELETE_ACCOUNT')
    }
}

export const getters = {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
}