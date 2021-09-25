<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/logo70.png" alt="logo" />
      <div class="title">
        <span v-if="!collapse">OpenLayers Workshop</span>
      </div>
    </div>
    <el-menu router :default-active="router.currentRoute.value.path">
      <template v-for="item in menuItems" :key="item.id">
        <el-menu-item :index="item.id" :popper-class="item.popperClass">{{
          item.name
        }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { menuItems } from "../config/menu-item.config";

const router = useRouter();
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #1f6b75;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
