<template>
  <div class="mapbox-style">
    <div id="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import MapboxVectorLayer from "ol/layer/MapboxVector";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Stroke, Style } from "ol/style";
import { fromExtent } from "ol/geom/Polygon";

const map = new Map({
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2
  })
});
onMounted(() => {
  map.setTarget("map-container");
  const key = "r1dWrQS0QQRvEoAzkHzz";
  const layer = new MapboxVectorLayer({
    styleUrl: `https://api.maptiler.com/maps/bright/style.json?key=${key}`
  });
  map.addLayer(layer);

  const source = new VectorSource();
  new VectorLayer({
    map: map,
    source: source,
    style: new Style({
      stroke: new Stroke({
        color: "red",
        width: 4
      })
    })
  });
  map.on("pointermove", function (event) {
    source.clear();
    map.forEachFeatureAtPixel(
      event.pixel,
      function (feature) {
        const geometry = feature.getGeometry();
        if (geometry) {
          source.addFeature(new Feature(fromExtent(geometry.getExtent())));
        }
      },
      {
        hitTolerance: 10
      }
    );
  });
});
</script>

<style scoped>
.mapbox-style {
  height: 100%;
  position: relative;
}
#map-container {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: sans-serif;
}
</style>
