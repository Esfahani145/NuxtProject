<template>
    <v-container fluid class="pa-4 pa-md-6 users-management-page">
        <div class="users-page-banner mb-6">
            <div class="d-flex align-center justify-space-between flex-wrap">
                <div class="d-flex align-center">
                    <v-avatar size="58" class="users-heading-avatar">
                        <v-icon color="white" size="30">mdi-account-group-outline</v-icon>
                    </v-avatar>
                    <div class="mr-4">
                        <h1 class="text-h5 font-weight-bold mb-1 users-page-title">
                            مدیریت کاربران
                        </h1>
                        <p class="text-body-2 mb-0 users-page-subtitle">
                            مشاهده، جست‌وجو و مدیریت اطلاعات کاربران
                        </p>
                    </div>
                </div>

                <v-chip color="white" text-color="primary" class="users-count-chip mt-3 mt-sm-0">
                    <v-icon left small color="primary">mdi-account-multiple</v-icon>
                    {{ users.length }} کاربر
                </v-chip>
            </div>

            <div class="users-banner-decoration"></div>
        </div>

        <v-row dense class="mb-5">
            <v-col cols="12" sm="6" md="4">
                <v-card outlined class="users-stat-card pa-4" height="100%">
                    <div class="d-flex align-center">
                        <v-avatar color="blue lighten-5" size="46">
                            <v-icon color="primary">mdi-account-multiple</v-icon>
                        </v-avatar>
                        <div class="mr-3">
                            <div class="users-stat-label">کل کاربران ثبت‌شده</div>
                            <div class="text-h5 font-weight-bold users-stat-value">
                                {{ users.length }}
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-card outlined class="users-stat-card pa-4" height="100%">
                    <div class="d-flex align-center">
                        <v-avatar color="purple lighten-5" size="46">
                            <v-icon color="deep-purple">mdi-shield-account-outline</v-icon>
                        </v-avatar>
                        <div class="mr-3">
                            <div class="users-stat-label">کاربران دارای نقش</div>
                            <div class="text-h5 font-weight-bold users-stat-value">
                                {{ users.filter(user => user.role).length }}
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-card outlined class="users-stat-card pa-4" height="100%">
                    <div class="d-flex align-center">
                        <v-avatar color="teal lighten-5" size="46">
                            <v-icon color="teal">mdi-email-check-outline</v-icon>
                        </v-avatar>
                        <div class="mr-3">
                            <div class="users-stat-label">کاربران دارای ایمیل</div>
                            <div class="text-h5 font-weight-bold users-stat-value">
                                {{ users.filter(user => user.email).length }}
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-card outlined class="users-table-card">
            <div class="users-table-heading pa-4 pa-md-5">
                <div class="d-flex align-center">
                    <div class="users-table-heading-icon ml-3">
                        <v-icon color="primary">mdi-view-list-outline</v-icon>
                    </div>
                    <div>
                        <h2 class="text-subtitle-1 font-weight-bold mb-1 users-table-title">
                            فهرست کاربران
                        </h2>
                        <p class="text-caption mb-0 users-table-caption">
                            برای یافتن کاربران از فیلترهای هر ستون استفاده کنید.
                        </p>
                    </div>
                </div>
            </div>

            <v-divider />

            <BaseDataTable
                class="users-data-table"
                :items.sync="users"
                :columns="user_columns"
                :loading="user_loading"
                item-key="national_code"
                :multi-sort="true"
                :show-add-button="true"
                add-button-text="افزودن کاربر"
                add-button-icon="mdi-account-plus-outline"
                add-button-route="/login/create-user"
                :items-per-page="10"
                :footer-props="{
                    'items-per-page-options': [5, 10, 25, 50],
                    'items-per-page-text': 'تعداد در صفحه'
                }"
                @reload="loadUsers"
            />
        </v-card>
    </v-container>
</template>

<script>
import locations from '~/static/data/data.json'

export default {
    name: 'UserssTablePage',

    data() {
        return {
            users: [],
            user_loading: false,
        }
    },

    computed: {
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
                    align: 'right',
                    width: '200px'
                },
                {
                    text: 'شماره همراه',
                    value: 'phone',
                    type: 'text',
                    filterType: 'text',
                    filterable: true,
                    disableSort: true,
                    align: 'center',
                    width: '170px'
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
                    align: 'center',
                    width: '100px'
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
                    align: 'center',
                    editRoute: item => ({
                        path: '/login/create-user',
                        query: {
                            id: String(item.national_code)
                        }
                    })
                }
            ]
        }
    },

    mounted() {
        this.loadUsers()
    },

    methods: {
        loadUsers() {
            try {
                const saved_users = localStorage.getItem('users')
                this.users = saved_users ? JSON.parse(saved_users) : []
            } catch (error) {
                this.$toast.error('خطا در بارگذاری کاربران:', error)
                this.users = []
            }
        }
    }
}
</script>