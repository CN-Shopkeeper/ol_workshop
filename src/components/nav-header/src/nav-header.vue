<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="store.state.isMenuFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <sk-breadcrumb :breadcrumbs="breadcrumbs"></sk-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import SkBreadcrumb from "@/base-ui/breadcrumb";
import { routesMapBreadcrumbs } from "@/utils/map-routes";
import { useStore } from "@/store";

// 面包屑
const breadcrumbs = computed(() => {
  const route = useRoute();
  return routesMapBreadcrumbs(route.path);
});
// 折叠菜单
const store = useStore();
const handleFoldClick = () => {
  store.commit("changeIsMenuFold");
};
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
