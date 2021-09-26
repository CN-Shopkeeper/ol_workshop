<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { IBreadcrumb } from "../types";

defineProps<{
  breadcrumbs: IBreadcrumb[];
}>();
</script>

<style scoped></style>
