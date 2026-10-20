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
        async sendForm() {
            const response = await this.$reqAPI({
                url: '/users',
                data: this.form,
            })
            console.log(response.data)
        },
  
        async getData() {
            const response = await this.$reqAPI({
                url: '/users',
                params: { ID: this.userId },
                method: 'get'
            })
            console.log(response.data)
        },

        async putData() {
            const response = await this.$reqAPI({
                url: `/users/${this.userId}`, 
                data: this.form,
                method: 'put'
            })
            console.log(response.data)
        },

        async patchData() {
            const response = await this.$reqAPI({
                url: `/api/users/${this.userId}`,
                data: { foo: this.form.foo },
                method: 'patch'
              })
            console.log(response.data)
        },

        async deleteData() {
            const response = await this.$reqAPI({
                url: `/api/users/${this.userId}`,
                method: 'delete'
            })
            console.log(response.status)
        }
    }
}
</script>