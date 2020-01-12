<template>
  <div class="Card">
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
            <div class="Card-header">
                <div class="md-title">{{name}}</div>
                <div class="md-subhead" @click="this.deleteAccount">Account ID: {{id}}</div>
            </div>  
            <div class="md-subhead Card__email">{{email}}</div>
        </md-card-header>

        <md-card-content>
            <div class="md-title">Posts:</div>
            <Post v-for="post in posts" :key="post.id"
                :id="post.id"
                :title="post.title"
                :text="post.text"
            />
        </md-card-content>

      </md-ripple>
    </md-card>
  </div>
</template>

<script>
import Post from './Post';
import eventBus from '../events';

import Axios from 'axios';

export default {
  name: 'Card',
  props: {
      id: Number,
      name: String,
      email: String,
      posts: Array,
  },
  components: {
      Post,
  },
  methods: {
    deleteAccount: async function () {
      const token = this.$cookies.get('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
      try {
        const result = await Axios.delete(`https://rekrutacja.multiplay.pl/api/interview/${this.id}`, config);
        this.setToken(result.headers.authorization);
        this.$emit('on-delete');
      }
      catch (error) {
        alert("You can't delete it. Your session ended.");
        eventBus.$emit('tokenSet', null);
        this.goToLogin();
      }
    },
    setToken: function (string) {
      const token = string.split(' ')[1];
      this.$cookies.set('token', token, 60);
    },
    goToLogin: function () {
      this.$router.push({name: 'login'});
    },
  }
}

</script>

<style lang="scss">
.Card {
    &-header {
        display: flex;
        justify-content: space-between;
    }
    &__email {
        text-align: left;
    }
}
</style>
