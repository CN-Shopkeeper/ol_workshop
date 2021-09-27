<template>
  <div class="basic">
    <div id="map-container"></div>
    <div class="options">
      <el-select
        v-model="value"
        filterable
        placeholder="选择国家"
        @change="handleCountryChanged"
      >
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";

import { resizeMap } from "../hooks/resize-map";
import {
  convertDataToOption,
  getCountryLocations
} from "../utils/convert-data";

const map: Map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([114.31667, 30.51667]),
    zoom: 4
  })
});

onMounted(() => {
  map.setTarget("map-container");
  resizeMap(map);
});

const selectOptions = convertDataToOption();
const value = ref("");
const handleCountryChanged = (item: string) => {
  map.getView().setCenter(fromLonLat(getCountryLocations(item)));
};
</script>

<style scoped>
.basic {
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
</style>
