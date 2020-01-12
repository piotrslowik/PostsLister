<template>
    <div class="Paginator">
        <md-button class="md-raised" @click="handleClick({first})">First</md-button>
        <md-button class="md-raised" @click="handleClick(prev)">Prev</md-button>
        <md-button class="md-raised" @click="handleClick(next)">Next</md-button>
        <md-button class="md-raised" @click="handleClick(last)">Last</md-button>
    </div>
</template>

<script>

export default {
  name: 'Paginator',
  props: {
      first: String,
      prev: String,
      next: String,
      last: String,
      action: Function,
  },
  methods: {
    handleClick: function (link) {
        this.$emit('on-click', link);
    }
  }
}

</script>
