<template>
<HeaderComponent />
<router-view></router-view>
<FooterComponent />
</template>
<script>
import HeaderComponent from "./components/HeaderComponent.vue"
import FooterComponent from "./components/FooterComponent.vue"
export default {
  name: 'App',
  components: {
    HeaderComponent, FooterComponent
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
*{
	padding: 0;
	margin: 0;
	border: 0;
}
*, *:before, *:after{
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
:focus, :active{outline: none;}
a:focus, a:active{outline: none;}

nav,footer,header,aside{display: block;}

html, body{
	height: 100%;
	width: 100%;
	font-style: 100%;
	line-height: 1;
	font-size: 14px;
	-ms-text-size-adjust: 100%;
	-moz-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	font-family: "Jost", sans-serif;
}

input, button, textarea{font-family: inherit;}

input::-ms-clear{display:none;}
button{cursor: pointer;}
button::-moz-focus-inner{padding: 0;border: 0;}
a, a:visited{text-decoration: none;}
a:hover{text-decoration: none;}
ul li{list-style-type: none;}
img{vertical-align: top;}
html {
    scroll-behavior: smooth;
}
h1,h2, h3, h4, h5, h6{font-weight: 400;}
/*---------------------*/
.container {
  max-width: 1430px;
  padding: 0px 15px;
  margin: 0 auto;
}
</style>
