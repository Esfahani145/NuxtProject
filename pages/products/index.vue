<template>
    <div class="light-admin-page">
        <v-container fluid class="py-8 px-4 px-md-8">
            <BaseHero
                v-model="search_query"
                type="products"
                variant="animated"
                @search="handleSearch"
            />

            <ProductStats :stats="stats" />

            <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center">
                    <div class="blue-accent-line ml-3"></div>
                    <h2 class="font-weight-bold grey--text text--darken-4">لیست خدمات و محصولات</h2>
                </div>
                <span class="font-weight-bold grey--text text--darken-2">
                    تعداد موارد: {{ product_list.length }}
                </span>
            </div>

            <v-row align="stretch" class="mx-0">
                <v-col
                    v-for="(product, index) in product_list"
                    :key="product.id || index"
                    cols="12"
                    sm="6"
                    md="4"
                    class="pa-2 pa-md-3 d-flex"
                >
                    <ProductCard :product="product" @product_click="$goTo(`/products/${$event}`)"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import BaseHero from '~/components/Hero/BaseHero.vue'
import ProductStats from '~/components/Products/ProductStats.vue'
import ProductCard from '~/components/Products/ProductCard.vue'

export default {
    name: 'ProductsIndexPage',

    components: {
        ProductStats,
        ProductCard,
        BaseHero
    },

    mounted() {
        this.$reqAPI('/product', 'post').then((res) => {
            console.log('POST:', JSON.stringify(res.data))
        })
    },

    asyncData({ $reqAPI }) {
        let json_products = []
        let stats = []

        try {
            const json_data = require('~/static/data/data.json')
            json_products = json_data.products || []
            stats = json_data.stats || []
        } catch (err) {
            console.error('Error loading data.json:', err)
        }

        return $reqAPI('/product', 'post').then((response) => {
            const result = response.data

            if (result.status !== 200) {
                this.$toast.error(result.message || 'دریافت محصول ناموفق بود')
            }

            return result.data?.model?.data || []
        }).catch((err) => {
            console.error(err)
            return []
        }).then((api_products) => {
            const products = [...json_products, ...api_products]

            return {
                all_products: products,
                product_list: products,
                stats
            }
        })
    },

    data() {
        return {
            search_query: '',
            all_products: [],
            product_list: [],
            stats: []
        }
    },

    methods: {
        handleSearch() {
            const query = (this.search_query || '').trim().toLowerCase()
            
            if (!query) {
                this.product_list = this.all_products
                return
            }
            
            this.product_list = this.all_products.filter(p => {
                const name = (p.name).toLowerCase()                
                return name.includes(query)
            })
        }
    }
}
</script>
