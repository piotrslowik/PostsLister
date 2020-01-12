<template>
    <div class="Post">
        <div class="Post-header">
            <p class="Post-header__title">
                {{title}}
            </p>
            <p class="Post-header__id">
                Post ID: {{id}}
            </p>
        </div>
        <p class="Post__text">
            {{text}}
        </p>
    </div>
</template>

<script>

export default {
  name: 'Post',
  props: {
      title: String,
      id: Number,
      text: String,
  },
}

</script>

<style lang="scss">
.Post {
    display: flex;
    flex-direction: column;

    &-header {
        display: flex;
        justify-content: space-between;

        &__title {
            font-size: 1.5em;
            font-weight: 600;
            margin-left: 20px;
        }
    }

    &__text {
        font-size: 1.3em;
        text-align: justify;
        margin-top: 0;
    }
}
</style>
