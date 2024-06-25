<template>
<footer>
    <div class="footer__container container">
        <a class="footer__mail" href="mailto:vadymfoteniuk.w@gmail.com">vadymfoteniuk.w@gmail.com</a>
    </div>
</footer>
</template>
<script>

export default {
  name: 'FooterComponent',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
footer {
    border-top: 2px solid rgb(196, 132, 255);
    .footer__container {
        padding: 30px 0px;
        .footer__mail {
            color: rgb(156, 50, 255);
            font-size: 18px;
            font-weight: 600;
            display: block;
            text-align: center;
        }
    }
}
</style>
        