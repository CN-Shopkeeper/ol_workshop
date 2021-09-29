<template>
  <div class="web-gl">
    <div id="map-container"></div>
    <div class="options">
      <div id="year" ref="yearRef" v-show="isShowA"></div>
      <div>
        <el-checkbox-button v-model="isShowA" v-show="renderType === 'web-gl'">
          {{ isShowA ? "关闭动画" : "展示动画" }}
        </el-checkbox-button>
      </div>
      <el-radio-group v-model="renderType">
        <el-radio-button label="canvas-2D"></el-radio-button>
        <el-radio-button label="web-gl"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { Map, View } from "ol";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import OSM from "ol/source/OSM";

import { loadMeteoritesData } from "../utils/data-loader";
import {
  doAnimation,
  cancelAnimation,
  clearWebGl
} from "../utils/web-gl-points-layer";

const yearRef = ref<InstanceType<typeof HTMLDivElement>>();
const isShowA = ref(false);
const renderType = ref("canvas-2D");

const source = new VectorSource();
loadMeteoritesData(source);
const canvas2DLayer = new VectorLayer({
  source: source
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

onMounted(() => {
  map.setTarget("map-container");

  watch(
    renderType,
    (newValue) => {
      if (newValue === "canvas-2D") {
        isShowA.value = false;
        clearWebGl(map);
        map.addLayer(canvas2DLayer);
      } else {
        map.removeLayer(canvas2DLayer);
        cancelAnimation(map);
      }
    },
    { immediate: true }
  );
  watch(isShowA, (newValue) => {
    if (renderType.value === "web-gl") {
      if (newValue) {
        if (yearRef.value) {
          doAnimation(map, yearRef.value);
        }
      } else {
        cancelAnimation(map);
      }
    }
  });
});
</script>

<style scoped>
.web-gl {
  height: 100%;
  position: relative;
}
#map-container {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: sans-serif;
}
.options {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

#year {
  color: white;
  -webkit-text-stroke: 1px black;
  font-size: 2em;
  font-weight: bold;
}
</style>
