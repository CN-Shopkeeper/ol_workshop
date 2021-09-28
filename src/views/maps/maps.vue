<template>
  <div class="maps">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.maps {
  height: 100%;
}
</style>
