<template>
    <v-container fluid class="pa-6 pt-8">
        <div class="d-flex align-center justify-space-between mb-4">
            <v-card-title class="pa-0">
                جدول کاربران
            </v-card-title>
        </div>
        <v-card outlined>
            <BaseDataTable
                :items.sync="users"
                :columns="user_columns"
                :loading="user_loading"
                item-key="national_code"
                :multi-sort="true"
                :show-add-button="true"
                add-button-text="افزودن کاربر"
                add-button-icon="mdi-account-plus-outline"
                add-button-route="/login/create-user"
                @reload="loadUsers"
            >
            </BaseDataTable>
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