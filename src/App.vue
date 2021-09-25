<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="210px">
        <nav-menu />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header />
        </el-header>
        <el-main class="page-content">
          <div class="page-view">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";
</script>

<style scoped></style>
