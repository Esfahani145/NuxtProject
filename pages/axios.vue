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
import axios from 'axios'

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
            const response = await axios.post('/users',{
                data: this.form
            })
            console.log(response.data)
        },
  
        async getData() {
            const response = await axios.get('/users',{
              params: {
                  ID: this.userId
              }
            })
            console.log(response.data)
        },
        async putData() {
            const response = await axios.put(`/users/${this.userId}`, this.form)
            console.log(response.data)
        },

        async patchData() {
            const response = await axios({
                method: 'patch',
                url: `/api/users/${this.userId}`,
                data: { foo: this.form.foo }
              })
            console.log(response.data)
        },

        async deleteData() {
            const response = await axios({
                method: 'delete',
                url: `/api/users/${this.userId}`
            })
            console.log(response.status)
        }
    }
}
</script>