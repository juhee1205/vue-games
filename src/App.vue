<script setup lang="ts">
import LayoutHeader from "./components/Header.vue";
</script>
<template>
  <div id="wrap">
    <LayoutHeader />

    <div id="contents">
      <router-view />
    </div>

  </div>
</template>

<style lang="scss">
</style>
