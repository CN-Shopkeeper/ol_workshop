import { getArea } from "ol/sphere";
import colormap from "colormap";
import { Style, Fill, Stroke } from "ol/style";
import RenderFeature from "ol/render/Feature.js";
import Feature from "ol/Feature.js";
import Geometry from "ol/geom/Geometry.js";

import { clamp } from "../utils/clamp-area";

const min = 1e8; // the smallest area
const max = 2e13; // the biggest area
const steps = 50;
// 一个颜色区间，共有50种颜色
const ramp = colormap({
  colormap: "blackbody",
  nshades: steps
});

// 根据面积找到其颜色下标
function getColor(feature: RenderFeature | Feature<Geometry>) {
  const area = getArea(feature.getGeometry() as Geometry);
  const f = Math.pow(clamp((area - min) / (max - min), 0, 1), 1 / 2);
  const index = Math.round(f * (steps - 1));
  return ramp[index];
}

function styleByArea(feature: RenderFeature | Feature<Geometry>): Style {
  return new Style({
    fill: new Fill({
      color: getColor(feature)
    }),
    stroke: new Stroke({
      color: "rgba(255,255,255,0.8)"
    })
  });
}

export { styleByArea };
