<template>
<main>
    <img class="main__bg" src="images/main-bg.webp" alt="background">
    <div class="main__contaner container"></div>
</main>
</template>
<script>

export default {
  name: 'MainComponent',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
main {
    position: relative;
    .main__bg {
        width: 100%;
        height: 100vh;
        object-fit: cover;
    }
    .main__container {
        padding: 50px 0px;
    }
}
</style>
        