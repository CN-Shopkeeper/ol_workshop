<template>
  <div class="vector-data">
    <div id="map-container"></div>
    <div class="options">
      <el-button type="primary" @click="getDefaultSource"
        >使用默认的数据源</el-button
      >
      <div class="sort-style">
        <el-radio v-model="radioValue" label="name">按首字母分类</el-radio>
        <el-radio v-model="radioValue" label="area">按领土面积分类</el-radio>
      </div>
    </div>
    <div class="tools">
      <el-link
        type="success"
        :href="downloadHref"
        download="features.json"
        icon="el-icon-download"
        >下载数据</el-link
      >

      <el-link type="danger" @click="clearSource" icon="el-icon-delete"
        >清空数据</el-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";

import DragAndDrop from "ol/interaction/DragAndDrop";
import Modify from "ol/interaction/Modify";
import Draw from "ol/interaction/Draw";

import { resizeMap } from "../hooks/resize-map";
import { styledByName } from "../utils/styled-by-name";
import { styleByArea } from "../utils/styled-by-area";
import { ElLink } from "element-plus";

const downloadHref = ref<string>("https://www.baidu.com");
const map: Map = new Map({
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const source = new VectorSource({
  format: new GeoJSON(),
  url: "../data/countries.json"
});
const layer = new VectorLayer({
  source
});

onMounted(() => {
  map.setTarget("map-container");
  map.addLayer(layer);
  resizeMap(map);

  map.addInteraction(
    new DragAndDrop({
      source: source,
      formatConstructors: [GeoJSON]
    })
  );
  map.addInteraction(
    new Modify({
      source: source
    })
  );
  map.addInteraction(
    new Draw({
      type: "Polygon",
      source: source
    })
  );

  const format = new GeoJSON({ featureProjection: "EPSG:3857" });
  source.on("change", function () {
    const features = source.getFeatures();
    const json = format.writeFeatures(features);
    downloadHref.value = "data:text/json;charset=utf-8," + json;
  });
});

// 使用默认数据源
const getDefaultSource = () => {
  source.setUrl("../data/countries.json");
  source.refresh();
};
// 清空当前数据
const clearSource = () => {
  source.clear();
};
// 样式选项
const radioValue = ref("name");
watch(
  radioValue,
  (newValue) => {
    if (newValue === "name") {
      layer.setStyle(styledByName);
    } else {
      layer.setStyle(styleByArea);
    }
  },
  {
    immediate: true
  }
);
</script>

<style scoped lang="less">
.vector-data {
  position: relative;
  height: 100%;
  .options {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
}
#map-container {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: sans-serif;
  background-color: #04041b;
}

.tools {
  position: absolute;
  top: 1rem;
  right: 1rem;

  .el-link {
    display: inline-block;
    padding: 0.5rem;
    background: white;
    cursor: pointer;
  }
}
</style>
