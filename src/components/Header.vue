<template>
    <div class="Header">
        <div class="Header__title">
            Posts Lister
        </div>
        <div class="Header__logout" v-if="token">
            <md-button class="md-accent" @click="this.logout">Logout</md-button>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import { eventBus } from '../events';
import { goToLogin, getTokenConfig } from '../helpers'

export default {
    name: 'Header',
    data: () => ({
        token: null,
    }),
    created() {
        eventBus.$on('tokenSet', (token) => this.token = token);
    },
    methods: {
        logout: async function () {
            const config = getTokenConfig(this);
            try {
                await Axios.post('https://rekrutacja.multiplay.pl/api/logout', {}, config);
                this.$cookies.remove('token');
                goToLogin(this)
                eventBus.$emit('tokenSet', null);
            }
            catch (error) {
                alert('Your session ended.');
                goToLogin(this);
                eventBus.$emit('tokenSet', null);
            }
        },
    }
}
</script>

<style lang="scss">
.Header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    box-shadow: 0px 5px 10px silver;
    height: 80px;

    &__title {
        grid-column: 2 / 3;
        font-size: 2em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__logout {
        grid-column: 3 / 4;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 40px;
    }
}
</style>
