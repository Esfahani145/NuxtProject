<template>
    <v-container fluid class="pa-6 pt-8">
        <v-card class="mb-8" outlined>
            <v-card-title>
                جدول محصولات
            </v-card-title>

            <BaseDataTable
                v-model="selected_products"
                :items="products"
                :columns="product_columns"
                :items-per-page="5"
                :loading="product_loading"
                item-key="id"
                :show-select="true"
                :multi-sort="true"
                no-data-text="محصولی یافت نشد"
                no-results-text="محصولی با این مشخصات یافت نشد"
                :footer-props="{
                    itemsPerPageOptions: [2, 5, -1]
                }"
                @view="viewProduct"
                @delete="deleteProduct"
            />
        </v-card>

        <v-dialog v-model="product_dialog" max-width="700">
            <v-card v-if="selected_product">
                <v-card-title class="font-weight-bold">
                    {{ selected_product.name }}
                </v-card-title>

                <v-card-text>
                    <div class="mb-4">
                        {{ selected_product.description }}
                    </div>

                    <div class="font-weight-bold mb-2">
                        قیمت
                    </div>

                    <div>
                        {{ $helper.formatPrice(selected_product.price) }}
                        تومان
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />

                    <BaseButton
                        :block="false"
                        color="primary"
                        @click="product_dialog = false"
                    >
                        بستن
                    </BaseButton>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="user_dialog" max-width="900" scrollable>
            <v-card class="rounded-xl">
                <v-card-title class="d-flex align-center">
                    <v-icon color="blue-grey darken-4" class="ml-2">
                        mdi-account-edit-outline
                    </v-icon>

                    <span class="font-weight-bold">
                        ویرایش اطلاعات کاربر
                    </span>

                    <v-spacer />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-6">
                    <SignupForm
                        v-if="selected_user"
                        ref="signupForm"
                        :user="selected_user"
                        mode="edit"
                        @submit="handleUpdateUser"
                    />
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-4">
                    <v-spacer />

                    <BaseButton
                        text
                        color="grey darken-1"
                        :block="false"
                        @click="user_dialog = false"
                    >
                        انصراف
                    </BaseButton>

                    <BaseButton
                        color="primary"
                        :block="false"
                        c-class="rounded-lg font-weight-bold"
                        @click="$refs.signupForm.submitForm()"
                    >
                        ذخیره
                    </BaseButton>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-card outlined>
            <v-card-title>
                جدول کاربران
            </v-card-title>

            <BaseDataTable
                v-model="selected_users"
                :items="users"
                :columns="user_columns"
                :items-per-page="5"
                :loading="user_loading"
                item-key="national_code"
                :show-select="true"
                :multi-sort="true"
                no-data-text="کاربری یافت نشد"
                no-results-text="کاربری با این مشخصات یافت نشد"
                :footer-props="{ itemsPerPageOptions: [2, 5, -1] }"
                @edit="editUser"
            />
        </v-card>
    </v-container>
</template>

<script>
import locations from '~/static/data/data.json'
import SignupForm from '~/components/Form/SignupForm.vue'

export default {
    name: 'ProductsTablePage',

    components: {
        SignupForm
    },

    data() {
        return {
            products: [],
            selected_products: [],
            selected_product: null,
            product_dialog: false,
            product_loading: false,
            users: [],
            selected_users: [],
            user_loading: false,
            user_dialog: false,
            selected_user: null
        }
    },

    mounted() {
        this.loadUsers()
    },

    async fetch() {
        const data = await import('~/static/data/data.json')
        this.products = data.default ? data.default.products || [] : data.products || []
    },

    computed: {
        product_columns() {
            return [
                {
                    text: 'تصویر',
                    value: 'image',
                    type: 'image',
                    filterable: false,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'محصول',
                    value: 'name',
                    type: 'product',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'right'
                },
                {
                    text: 'دسته‌بندی',
                    value: 'category',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'right'
                },
                {
                    text: 'تاریخ ثبت',
                    key: 'created_date',
                    value: (body) => {
                        return this.$toJalali(
                            body.created_at,
                            '',
                            'jYYYY/jMM/jDD'
                        )
                    },
                    sortValue: (body) => {
                        return body.created_at
                    },
                    filterType: 'date',
                    filterable: false
                },
                {
                    text: 'قیمت',
                    value: 'price',
                    type: 'price',
                    filterable: false,
                    filterType: 'number',
                    sortable: true,
                    align: 'right'
                },
                {
                    text: 'وضعیت',
                    value: 'active',
                    type: 'boolean',
                    filterable: false,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'برچسب',
                    value: 'badge',
                    type: 'chip',
                    filterable: false,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'عملیات',
                    value: 'actions',
                    type: 'actions',
                    sortable: false,
                    showView: true,
                    showDelete: true,
                    filterable: false,
                    align: 'center'
                }
            ]
        },

        user_columns() {
            return [
                {
                    text: 'نام',
                    value: 'full_name',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: false,
                    sortable: false,
                    align: 'right'
                },
                {
                    text: 'شماره همراه',
                    value: 'phone',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'right'
                },
                {
                    text: 'ایمیل',
                    value: 'email',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'right'
                },
                {
                    text: 'کد ملی',
                    value: 'national_code',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'right'
                },
                {
                    text: 'تاریخ تولد',
                    value: (body) => {
                        return this.$toJalali(
                            body.birth_date,
                            '',
                            'jYYYY/jMM/jDD'
                        )
                    },
                    type: 'text',
                    filterType: 'date',
                    filterable: false,
                    disableSort: false,
                    align: 'center'
                },
                {
                    text: 'جنسیت',
                    value: (body) => {
                        return body.gender === 'male'
                            ? 'مرد'
                            : body.gender === 'female'
                                ? 'زن'
                                : ''
                    },
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'استان',
                    value: (body) => {
                        const province = locations.locations.provinces.find(
                            item => item.id === body.province
                        )

                        return province ? province.name : ''
                    },
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'شهر',
                    value: (body) => {
                        const city = locations.locations.cities.find(
                            item => item.id === body.city
                        )

                        return city ? city.name : ''
                    },
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'نقش',
                    value: 'role',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'عملیات',
                    value: 'actions',
                    type: 'actions',
                    sortable: false,
                    showView: false,
                    showEdit: true,
                    showDelete: false,
                    filterable: false,
                    align: 'center'
                }
            ]
        }
    },

    methods: {
        loadUsers() {
            const saved_users = localStorage.getItem('users')
            this.users = saved_users ? JSON.parse(saved_users) : []
        },

        editUser(user) {
            this.selected_user = user
            this.user_dialog = true
        },

        handleUpdateUser(credentials) {
            const user_index = this.users.findIndex(user => user.national_code === this.selected_user.national_code)

            if (user_index === -1) { return }

            const updated_user = {
                ...this.users[user_index],
                ...credentials,
            }

            this.$set(this.users, user_index, updated_user)
            localStorage.setItem('users', JSON.stringify(this.users))
            this.user_dialog = false
            this.$toast.success('اطلاعات کاربر با موفقیت به‌روزرسانی شد')
        },

        viewProduct(product) {
            this.selected_product = product
            this.product_dialog = true
        },

        deleteProduct(product) {
            const productId = this.$helper.getProductId(product)
            this.products = this.products.filter(item => { return this.$helper.getProductId(item) !== productId})
            this.selected_products = this.selected_products.filter(item => { return this.$helper.getProductId(item) !== productId})
        }
    }
}
</script>