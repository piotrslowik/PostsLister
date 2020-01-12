<template>
  <div class="LoginPage">
    <md-card class="LoginPage-inputs">
        <md-card-header>
            <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
            <md-field>
                <label>E-Mail</label>
                <md-input v-model="email" type="email"></md-input>
            </md-field>
            <md-field>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
            </md-field>
            <md-button class="md-raised md-primary" @click="this.login">Login</md-button>
        </md-card-content>
    </md-card>
  </div>
</template>

<script>

import Axios from 'axios';

export default {
    name: 'Login',
    data: () => ({
        email: 'interview@multiplay.pl',
        password: 'secret',
        }),
    mounted: async function () {
        const token = this.$cookies.get('token');
        if (token) this.goToPosts();
    },
    methods: {
        login: async function () {
            try {
                const result = await Axios.post('https://rekrutacja.multiplay.pl/api/login', {
                    email: this.email,
                    password: this.password,
                });
                const token = result.data.data.access_token;
                this.$cookies.set('token', token, 60);
                this.$router.push({name: 'posts'});
            }
            catch (error) {
                throw error;
            }
        },
        goToPosts: function () {
            this.$router.push({name: 'posts'});
        }
    }
}
</script>

<style>
.LoginPage {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.LoginPage-inputs {
    width: 500px;
}
</style>
