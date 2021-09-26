<template>
  <div class="base-map">
    <div id="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, onMounted, watch } from "vue";
import { useStore } from "@/store";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import LayerGroup from "ol/layer/Group";
import BaseLayer from "ol/layer/Base";
import Collection from "ol/Collection.js";
import ViewType from "ol/View.js";
import ViewOptions from "ol/View.js";

const store = useStore();

const props = withDefaults(
  defineProps<{
    layers?: LayerGroup | BaseLayer[] | Collection<BaseLayer> | undefined;
    view?: ViewType | Promise<ViewOptions>;
  }>(),
  {
    layers: () => [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: () =>
      new View({
        center: fromLonLat([114.31667, 30.51667]),
        zoom: 4
      })
  }
);

onMounted(() => {
  const map = new Map({
    target: "map-container",
    layers: props.layers,
    view: props.view
  });
  window.addEventListener("resize", () => {
    map.updateSize();
  });

  watch(
    () => store.state.isMenuFold,
    () => {
      // 不知道如何监听el-menu的折叠动画结束
      setTimeout(() => {
        map.updateSize();
      }, 500);
    }
  );
});
</script>

<style scoped lang="less">
.base-map,
html,
body,
#map-container {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: sans-serif;
}
</style>
