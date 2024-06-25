<template>
    <header>
      <div class="header__container container">
        <router-link class="header__logo" to="/main">
          <img src="images/logo.png" alt="Logo">
        </router-link>
        <nav class="header__menu">
          <ul>
            <li><router-link to="/cardGame">CardGame</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
<script>

export default {
  name: 'HeaderComponent',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
header {
    border-bottom: 2px solid rgb(196, 132, 255);
    .header__container {
        padding: 30px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header__logo {
            img {
                width: 50px;
            }
        }
        .header__menu {
            ul {
                display: flex;
                align-items: center;
                gap: 50px;
                li {
                    font-size: 16px;
                    font-weight: 500;
                    color: rgb(156, 50, 255);
                }

            }
        }
    }
}
</style>
    