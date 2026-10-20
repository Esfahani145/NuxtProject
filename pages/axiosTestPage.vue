<template>
    <form @submit.prevent="sendForm">
        <input v-model="form.foo" type="text" name="foo" placeholder="Name" />
        <input v-model="form.age" type="number" name="age" placeholder="Age" />

        <button type="submit">POST - Create</button>
        <button type="button" @click="getData">GET - Read</button>
        <button type="button" @click="putData">PUT - Replace</button>
        <button type="button" @click="patchData">PATCH - Update</button>
        <button type="button" @click="deleteData">DELETE - Remove</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            userId: 1,
            form: {
                foo: '',
                age: ''
            }
        }
    },

    methods: {
        sendForm() {
            this.$reqApi('/users', {
                data: this.form
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                console.log('درخواست تمام شد')
            })
        },

        getData() {
            this.$reqApi('/users', 'get', {
                params: { ID: this.userId }
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                console.log('درخواست تمام شد')
            })
        },

        putData() {
            this.$reqApi(`/users/${this.userId}`, 'put', {
                data: this.form
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                console.log('درخواست تمام شد')
            })
        },

        patchData() {
            this.$reqApi(`/users/${this.userId}`, 'patch', {
                data: { foo: this.form.foo }
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                console.log('درخواست تمام شد')
            })
        },

        deleteData() {
            this.$reqApi(`/api/users/${this.userId}`, 'delete').then((response) => {
                console.log(response.status)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                console.log('درخواست تمام شد')
            })
        }
    }
}
</script>