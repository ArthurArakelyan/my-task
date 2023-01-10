<template>
  <div class="app">
    <the-header></the-header>

    <div class="aside">
      <side-menu></side-menu>
      <side-menu-extension></side-menu-extension>
    </div>

    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue';
import SideMenu from '@/components/layout/SideMenu.vue';
import SideMenuExtension from '@/components/layout/SideMenuExtension.vue';

export default {
  components: {
    TheHeader,
    SideMenu,
    SideMenuExtension,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');

html, body, div, span, iframe,
h1, h2, h3, h4, h5, h6, p,
a, img, strong, ol, ul, li, form, label,
aside, footer, header, menu, nav, section {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}

html, body {
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-wrap: wrap;
  background-color: #F6F7F8;
}

.aside {
  display: flex;
}

.main {
  width: 1%;
  flex: 1 1;
  padding: 2rem;
  margin-top: 100px;
}
</style>
