<template>
  <div class="MainPage">
    <div class="MainPage__subtitle">
      You can delete an account by clicking its ID
    </div>
    <div class="MainPage-list">
      <Card v-for="el in this.data" :key="el.id" 
        :name="el.name"
        :email="el.email"
        :posts="sortPostsArray(el.posts)"
        :id="el.id"
        @on-delete="handleDelete"
      />
    </div>
    <Paginator 
      :first="this.links.first"
      :prev="this.links.prev"
      :next="this.links.next"
      :last="this.links.last"
      @on-click="this.handleFetch"
    />
  </div>
</template>

<script>
import Axios from 'axios';
import { eventBus } from '../events';
import { goToLogin, getTokenConfig, setToken } from '../helpers';

import Card from '../components/Card';
import Paginator from '../components/Paginator';
  
export default {
  name: 'MainPage',
  components: {
    Card,
    Paginator,
  },
  data: () => ({
    data: [],
    links: {},
    activeLink: 'https://rekrutacja.multiplay.pl/api/interview',
  }),
  mounted: function () {
    this.fetchData(this.activeLink);
  },
  methods: {
    fetchData: async function (link) {
      const config = getTokenConfig(this);
      try {
        const result = await Axios.get(link, config);
        this.setData(result.data);
        const newToken = result.headers.authorization;
        setToken(this, newToken);
        eventBus.$emit('tokenSet', newToken);
      }
      catch (error) {
        alert('Reading posts requires logging in.');
        eventBus.$emit('tokenSet', null);
        goToLogin(this);
      }
    },
    setData: function (data) {
      this.data = data.data;
      this.links = data.links;
    },
    handleFetch: function (link) {
      this.activeLink = link;
      this.fetchData(link);
      this.scrollToTop();
    },
    handleDelete: function () {
      this.fetchData(this.activeLink);
    },
    scrollToTop() {
      window.scrollTo(0,0);
    },
    sortPostsArray: function (posts) {
      const newArray = posts.slice(0, posts.length);
      newArray.sort((post1, post2) => post2.id - post1.id);
      return newArray;
    },
  }
}

</script>

<style lang="scss">
.MainPage {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__subtitle {
    font-size: 2.0em;
    margin-bottom: 20px;
  }

  &-list {
    width: 100%;
    max-width: 1500px;
  }

  .Card {
    margin-bottom: 1px;
  }

  .Paginator {
    margin: 20px 0;

    .md-button-content {
      font-size: 1.2em;
    }
  }
}
</style>
