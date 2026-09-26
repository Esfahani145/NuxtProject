function parseNumericPrice(value) {
    if (value === null || value === undefined) return 0
    const str_value = String(value)
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        .replace(/[0-9]/g, (d) => '0123456789'.indexOf(d))
        .replace(/[^0-9]/g, '')
    return parseInt(str_value, 10) || 0
}

function saveCartToLocalStorage(state, rootState) {
    if (process.client) {
        const user_phone = rootState.auth?.user?.phone || 'guest_user'
        localStorage.setItem(`cart_${user_phone}`, JSON.stringify(state.cart))
    }
}

function saveFavoritesToLocalStorage(state, rootState) {
    if (process.client) {
        const user_phone = rootState.auth?.user?.phone || 'guest_user'
        localStorage.setItem(`favorites_${user_phone}`, JSON.stringify(state.favorites))
    }
}

export const state = () => ({
    cart: [],
    favorites: []
})

export const getters = {
    cartItems: (state) => state.cart,
    cartTotalCount: (state) => state.cart.reduce((total, item) => total + (item.quantity || 1), 0),
    cartTotalPrice: (state) => {
        return state.cart.reduce((total, item) => {
            const raw_price = item.price ?? 0
            const numeric_price = parseNumericPrice(raw_price)
            return total + numeric_price * (item.quantity || 1)
        }, 0)
    },

    favoriteItems: (state) => state.favorites,
    favoritesCount: (state) => state.favorites.length,
    isFavorite: (state) => (product_id) => {
        return state.favorites.some((item) => (item.id || item.productId || item._id) === product_id)
    }
}

export const mutations = {
    ADD_TO_CART(state, product) {
        const item_key = product.id || product.productId || product.product_id || product._id
        const existing_item = state.cart.find((item) => (item.id || item.productId || item.product_id || item._id) === item_key)
        if (existing_item) {
            existing_item.quantity = (existing_item.quantity || 1) + 1
        } else {
            state.cart.push({ ...product, quantity: product.quantity || 1 })
        }
    },

    REMOVE_FROM_CART(state, product_id) {
        state.cart = state.cart.filter((item) => (item.id || item.productId || item.product_id || item._id) !== product_id)
    },

    UPDATE_QUANTITY(state, { product_id, quantity }) {
        const item = state.cart.find((i) => (i.id || i.productId || i.product_id || i._id) === product_id)
        if (item && quantity > 0) {
            item.quantity = quantity
        }
    },

    SET_CART(state, cart_data) {
        state.cart = cart_data || []
    },

    TOGGLE_FAVORITE(state, product) {
        const prod_id = product.id || product.productId || product._id
        const index = state.favorites.findIndex((item) => (item.id || item.productId || item._id) === prod_id)
        if (index > -1) {
            state.favorites.splice(index, 1)
        } else {
            state.favorites.push(product)
        }
    },

    REMOVE_FROM_FAVORITES(state, product_id) {
        state.favorites = state.favorites.filter((item) => (item.id || item.productId || item._id) !== product_id)
    },

    SET_FAVORITES(state, favorites_data) {
        state.favorites = favorites_data || []
    }
}

export const actions = {
    addToCart({ commit, state, rootState }, product) {
        if (!rootState.auth.token) {
            throw new Error('برای افزودن محصول به سبد خرید ابتدا وارد حساب کاربری شوید')
        }

        commit('ADD_TO_CART', product)
        saveCartToLocalStorage(state, rootState)

        return true
    },

    toggleFavorite({ commit, state, rootState }, product) {
        if (!rootState.auth.token) {
            throw new Error('برای افزودن محصول به علاقه‌مندی‌ها ابتدا وارد حساب کاربری شوید')
        }

        commit('TOGGLE_FAVORITE', product)
        saveFavoritesToLocalStorage(state, rootState)
    },

    removeFromCart({ commit, state, rootState }, product_id) {
        commit('REMOVE_FROM_CART', product_id)
        saveCartToLocalStorage(state, rootState)
    },

    updateQuantity({ commit, state, rootState }, payload) {
        commit('UPDATE_QUANTITY', payload)
        saveCartToLocalStorage(state, rootState)
    },

    loadUserCart({ commit, rootState }) {
        if (process.client) {
            const user_phone = rootState.auth?.user?.phone || 'guest_user'
            const saved_cart = localStorage.getItem(`cart_${user_phone}`)
            if (saved_cart) {
                try {
                    commit('SET_CART', JSON.parse(saved_cart))
                } catch (e) {
                    console.error('Error loading cart from localStorage', e)
                    commit('SET_CART', [])
                }
            } else {
                commit('SET_CART', [])
            }
        }
    },

    removeFromFavorites({ commit, state, rootState }, product_id) {
        commit('REMOVE_FROM_FAVORITES', product_id)
        saveFavoritesToLocalStorage(state, rootState)
    },

    loadUserFavorites({ commit, rootState }) {
        if (process.client) {
            const user_phone = rootState.auth?.user?.phone || 'guest_user'
            const saved_favorites = localStorage.getItem(`favorites_${user_phone}`)
            if (saved_favorites) {
                try {
                    commit('SET_FAVORITES', JSON.parse(saved_favorites))
                } catch (e) {
                    console.error('Error loading favorites from localStorage', e)
                    commit('SET_FAVORITES', [])
                }
            } else {
                commit('SET_FAVORITES', [])
            }
        }
    }
}