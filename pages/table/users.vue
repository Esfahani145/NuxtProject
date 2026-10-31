<template>
    <div class="light-admin-page">
        <v-container fluid class="py-8 px-4 px-md-8">
            <div class="d-flex align-center justify-space-between flex-wrap mb-6">
                <div class="d-flex align-center">
                    <div class="blue-accent-line ml-3"></div>
                    <div>
                        <h2 class="font-weight-bold grey--text text--darken-4">
                            مدیریت کاربران
                        </h2>
                        <p class="grey--text text--darken-1 mb-0 mt-1">
                            مشاهده و مدیریت اطلاعات کاربران ثبت‌شده
                        </p>
                    </div>
                </div>

                <!-- <span class="font-weight-bold grey--text text--darken-2 mt-2 mt-sm-0">
                    تعداد کاربران: {{ users.length }}
                </span> -->

            </div>

            <!-- <v-row dense class="mb-6">
                <v-col cols="12" sm="4">
                    <v-card outlined class="white-stat-card pa-4 rounded-lg" height="100%">
                        <div class="d-flex align-center">
                            <div class="section-icon ml-3">
                                <v-icon color="primary">mdi-account-multiple-outline</v-icon>
                            </div>
                            <div>
                                <div class="grey--text text--darken-1">
                                    کل کاربران
                                </div>
                                <div class="font-weight-bold slate-dark--text">
                                    {{ users.length }}
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-card outlined class="white-stat-card pa-4 rounded-lg" height="100%">
                        <div class="d-flex align-center">
                            <div class="section-icon ml-3">
                                <v-icon color="indigo">mdi-shield-account-outline</v-icon>
                            </div>
                            <div>
                                <div class="grey--text text--darken-1">
                                    کاربران دارای نقش
                                </div>
                                <div class="font-weight-bold slate-dark--text">
                                    {{ users.filter(user => user.role).length }}
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-card outlined class="white-stat-card pa-4 rounded-lg" height="100%">
                        <div class="d-flex align-center">
                            <div class="section-icon ml-3">
                                <v-icon color="teal">mdi-email-outline</v-icon>
                            </div>
                            <div>
                                <div class="grey--text text--darken-1">
                                    کاربران دارای ایمیل
                                </div>
                                <div class="font-weight-bold slate-dark--text">
                                    {{ users.filter(user => user.email).length }}
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row> -->

            <v-card outlined class="white-detail-card rounded-lg">
                <div class="d-flex align-center justify-space-between flex-wrap pa-4">
                    <div class="d-flex align-center">
                        <div class="section-icon ml-3">
                            <v-icon color="primary">mdi-account-group-outline</v-icon>
                        </div>
                        <div>
                            <h3 class="font-weight-bold slate-dark--text">
                                فهرست کاربران
                            </h3>
                            <p class="grey--text text--darken-1 mb-0">
                                برای یافتن اطلاعات از فیلترهای جدول استفاده کنید.
                            </p>
                        </div>
                    </div>
                    <v-chip small outlined color="secondary" class="mt-3 mt-sm-0">
                        {{ users.length }} کاربر
                    </v-chip>
                </div>

                <v-divider />

                <BaseDataTable
                    class="users-data-table"
                    :items.sync="users"
                    url="/user"
                    :columns="user_columns"
                    :loading="user_loading"
                    loading-text="...درحال بارگذاری کاربران"
                    :multi-sort="true"
                    :show-add-button="true"
                    add-button-text="افزودن کاربر"
                    add-button-icon="mdi-account-plus-outline"
                    add-button-route="/login/create-user"
                    :items-per-page="10"
                    :footer-props="{
                        'items-per-page-options': [5, 10, 25, 50],
                        'items-per-page-text': 'تعداد در صفحه',
                        'show-first-last-page': true
                    }"
                    @items-loaded= "users = $event"
                    @reload="loadUsers"
                />
            </v-card>
        </v-container>
    </div>
</template>

<script>
import locations from '~/static/data/data.json'

export default {
    name: 'UsersTablePage',

    data() {
        return {
            users: [],
            user_loading: false
        }
    },

    computed: {
        user_columns() {
            return [
                {
                    text: 'تاریخ ایجاد',
                    key: 'created_date',
                    filterKey: 'created_at',
                    value: (body => this.$toJalali(body.created_at, '', 'jYYYY/jMM/jDD') || '_'),
                    sortValue: body => body.created_at,
                    filterType: 'date-range',
                    filterable: true,
                    sortable: false,
                    align: 'center',
                    width: '220px'
                },
                {
                    text: 'نام و نام خانوادگی',
                    value: body => {
                        const name = body.first_name
                        return name ? body.first_name : '_'
                    },
                    //  'first_name'
                    type: 'text',
                    filterType: 'text',
                    filterKey: 'first_name',
                    filterable: true,
                    sortable: false,
                    disableSort: false,
                    align: 'right',
                    width: '200px',
                    filterPlaceholder: 'جست‌وجوی نام'
                },
                {
                    text: 'شماره همراه',
                    value: body => {
                        const phone = body.phone
                        return phone ? body.phone : '_'
                    },
                    //  'phone'
                    type: 'text',
                    filterType: 'text',
                    filterKey: 'phone',
                    filterable: true,
                    disableSort: true,
                    sortable: false,
                    align: 'center',
                    width: '185px',
                    filterPlaceholder: 'شماره همراه',
                },
                {
                    text: 'ایمیل',
                    value: body => {
                        const email = body.email
                        return email ? body.email : '_'
                    },
                    //  'email'
                    type: 'text',
                    filterType: 'text',
                    filterable: false,
                    disableSort: true,
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'کد ملی',
                    value: body => {
                        const national_code = body.national_code
                        return national_code ? body.national_code : '_'
                    },
                    //  'national_code'
                    type: 'text',
                    filterType: 'text',
                    filterKey: 'national_code',
                    filterable: true,
                    disableSort: true,
                    sortable: false,
                    align: 'center',
                    filterPlaceholder: 'کد ملی',
                    width: '190px'
                },
                {
                    text: 'جنسیت',
                    value: body => body.gender === 'male' ? 'مرد'
                        : body.gender === 'female' ? 'زن' : '_',
                    type: 'text',
                    filterType: 'text',
                    filterable: false,
                    disableSort: true,
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'استان',
                    value: body => {
                        const province = locations.locations.provinces.find(item => item.id === body.province)
                        return province ? province.name : '_'
                    },
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    sortable: false,
                    align: 'center',
                    filterPlaceholder: 'جست‌وجوی استان',
                    width: '200px'
                },
                {
                    text: 'شهر',
                    value: body => {
                        const city = locations.locations.cities.find(item => item.id === body.city)
                        return city ? city.name : '_'
                    },
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    sortable: false,
                    align: 'center',
                    filterPlaceholder: 'جست‌وجوی شهر',
                    width: '200px'
                },
                {
                    text: 'آدرس',
                    value: body => {
                        const address = body.address
                        return address ? body.address : '_'
                    },
                    //  'address',
                    type: 'text',
                    filterType: 'text',
                    filterable: false,
                    disableSort: true,
                    sortable: false,
                    align: 'center',
                    filterPlaceholder: 'کد ملی',
                    width: '190px'
                },
                {
                    text: 'نقش',
                    value: body => {
                        const role = body.role
                        return role ? body.role : '_'
                    },
                    //  'role'
                    type: 'text',
                    filterType: 'text',
                    filterable: false,
                    disableSort: true,
                    sortable: false,
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
                    align: 'center',
                    editRoute: item => ({path: '/login/create-user', query: { id: String(item.national_code) }})
                }
            ]
        }
    },

    mounted() {
        this.loadUsers()
    },

    methods: {
        loadUsers() {
            this.user_loading = true
            try {
                const saved_users = localStorage.getItem('users')
                this.users = saved_users ? JSON.parse(saved_users) : []
            } catch (error) {
                this.$toast.error('خطا در بارگذاری کاربران')
                console.error(error)
                this.users = []
            } finally {
                this.user_loading = false
            }
        }
    }
}
</script>