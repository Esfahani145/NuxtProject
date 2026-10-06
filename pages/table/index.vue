<template>
    <v-container fluid class="pa-6 pt-8">
        <v-card class="mb-8" outlined>
            <v-card-title>
                جدول محصولات
            </v-card-title>

            <BaseDataTable
                :items.sync="products"
                :columns="product_columns"
                :items-per-page="5"
                :loading="product_loading"
                item-key="id"
                no-data-text="محصولی یافت نشد"
                no-results-text="محصولی با این مشخصات یافت نشد"
                :footer-props="{ itemsPerPageOptions: [2, 5, -1] }"
            >
                <template #view="{ item, close }">
                    <v-card-title class="font-weight-bold">
                        {{ item.name }}
                    </v-card-title>

                    <v-card-text>
                        <div class="mb-4">
                            {{ item.description }}
                        </div>

                        <div class="font-weight-bold mb-2">
                            قیمت
                        </div>

                        <div>
                            {{ $helper.formatPrice(item.price) }}
                            تومان
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />

                        <BaseButton
                            :block="false"
                            color="primary"
                            @click="close"
                        >
                            بستن
                        </BaseButton>
                    </v-card-actions>
                </template>
            </BaseDataTable>
        </v-card>
        
        <v-card outlined>
            <v-card-title>
                جدول کاربران
            </v-card-title>

            <BaseDataTable
                :items.sync="users"
                :columns="user_columns"
                :items-per-page="5"
                :loading="user_loading"
                item-key="national_code"
                :multi-sort="true"
                no-data-text="کاربری یافت نشد"
                no-results-text="کاربری با این مشخصات یافت نشد"
                :footer-props="{ itemsPerPageOptions: [2, 5, -1] }"
            >
                <template #edit="{ item, close }">
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
                            v-if="item"
                            ref="signupForm"
                            :user="item"
                            mode="edit"
                            @submit="handleUpdateUser($event, item, close)"
                        />
                    </v-card-text>

                    <v-divider />

                    <v-card-actions class="pa-4">
                        <v-spacer />

                        <BaseButton
                            text
                            color="grey darken-1"
                            :block="false"
                            @click="close"
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
                </template>
            </BaseDataTable>
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
            product_loading: false,
            users: [],
            user_loading: false,
        }
    },

    mounted() {
        this.loadUsers()
        this.loadProduct()
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
                    align: 'center',
                    icon: 'mdi-shopping'
                },
                {
                    text: 'محصول',
                    value: 'name',
                    type: 'product',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'right',
                    icon: 'mdi-shopping'
                },
                {
                    text: 'دسته‌بندی',
                    value: 'category',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'right',
                    icon: 'mdi-shape'
                },
                {
                    text: 'تاریخ ثبت',
                    key: 'created_date',
                    value: (body) => {
                        return this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD')
                    },
                    filterValue: (body) => {
                        return this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD')
                    },
                    sortValue: (body) => {
                        return body.created_at
                    },
                    filterType: 'date-range',
                    filterable: true
                },
                {
                    text: 'قیمت',
                    value: 'price',
                    type: 'price',
                    filterable: false,
                    filterType: 'number',
                    sortable: true,
                    align: 'right',
                    icon: 'mdi-credit-card'
                },
                {
                    text: 'وضعیت',
                    value: 'active',
                    type: 'boolean',
                    filterable: false,
                    disableSort: true,
                    align: 'center',

                },
                {
                    text: 'برچسب',
                    value: 'badge',
                    type: 'chip',
                    filterable: false,
                    disableSort: true,
                    align: 'center',
                    icon: 'mdi-tag'
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
                    text: 'نام و نام خانوادگی',
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
                    align: 'center'
                },
                {
                    text: 'ایمیل',
                    value: 'email',
                    type: 'text',
                    filterType: 'text',
                    filterable: false,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'کد ملی',
                    value: 'national_code',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'center'
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
                        return body.gender === 'male' ? 'مرد'
                            : body.gender === 'female' ? 'زن'
                            : ''
                    },
                    type: 'text',
                    filterType: 'text',
                    filterable: false,
                    disableSort: true,
                    align: 'center'
                },
                {
                    text: 'استان',
                    value: (body) => {
                        const province = locations.locations.provinces.find(item => item.id === body.province)
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
                        const city = locations.locations.cities.find(item => item.id === body.city)
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
                    filterable: false,
                    disableSort: true,
                    align: 'center',
                    width: '95px'
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

        async loadProduct() {
            const data = await import('~/static/data/data.json')
            this.products = data.default ? data.default.products || [] : data.products || []
        },

        handleUpdateUser(credentials, selected_user, close) {
            const user_index = this.users.findIndex(user => { return user.national_code === selected_user.national_code })
            if (user_index === -1) { return }

            const updated_user = {
                ...this.users[user_index],
                ...credentials,
            }

            this.$set(this.users, user_index, updated_user)
            localStorage.setItem('users', JSON.stringify(this.users))
            close()
            this.$toast.success('اطلاعات کاربر با موفقیت به‌روزرسانی شد')
        }
    }
}
</script>