<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/logo70.png" alt="logo" />
      <div class="title">
        <span v-if="!collapse">OpenLayers Workshop</span>
      </div>
    </div>
    <el-menu
      router
      :default-active="router.currentRoute.value.path"
      class="el-menu-vertical"
      background-color="#2f4f4f"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#fff"
    >
      <template v-for="item in menuItems" :key="item.id">
        <template v-if="item.children">
          <el-sub-menu :index="item.id">
            <template #title>
              {{ item.name }}
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id">
            {{ item.name }}
          </el-menu-item>
        </template>
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
  background-color: #2f4f4f;

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

  .el-menu-item {
    padding-left: 50px !important;
    background-color: #1f6b75 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    background-color: #5f9ea0 !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
