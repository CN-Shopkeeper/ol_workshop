import WebGLPointsLayer from "ol/layer/WebGLPoints";
import { Vector as VectorSource } from "ol/source";
import Geometry from "ol/geom/Geometry";
import { Map } from "ol";

import { loadMeteoritesData } from "./data-loader";

const source = new VectorSource();
loadMeteoritesData(source);

const minYear = 1850;
const maxYear = 2015;
const span = maxYear - minYear;
const rate = 10; // years per second

const start = Date.now();

const styleVariables = {
  currentYear: minYear
};

const period = 10;
const periodStart = ["-", ["var", "currentYear"], period];
const decay = [
  "interpolate",
  ["linear"],
  ["get", "year"],
  periodStart,
  0,
  ["var", "currentYear"],
  1
];

const dynamicLayer = new WebGLPointsLayer({
  source,
  style: {
    symbol: {
      symbolType: "circle",
      // equivalent to: 18 * clamp('mass' / 200000, 0, 1) + 8
      size: [
        "+",
        ["*", ["clamp", ["*", ["get", "mass"], 1 / 20000], 0, 1], 18],
        8
      ],
      color: "rgba(255,0,0,0.5)"
    }
  }
});

const animatedLayer = new WebGLPointsLayer({
  source,
  style: {
    variables: styleVariables,
    filter: ["between", ["get", "year"], periodStart, ["var", "currentYear"]],
    symbol: {
      symbolType: "circle",
      size: [
        "*",
        decay,
        ["+", ["*", ["clamp", ["*", ["get", "mass"], 1 / 20000], 0, 1], 18], 8]
      ],
      color: "rgb(255, 0, 0)",
      opacity: ["*", 0.5, decay]
    }
  }
});

let flag = true;

export function doAnimation(map: Map, yearElement: HTMLDivElement): void {
  map.removeLayer(dynamicLayer);
  map.addLayer(animatedLayer);
  flag = true;
  function render() {
    const elapsed = (rate * (Date.now() - start)) / 1000;
    styleVariables.currentYear = Math.round(minYear + (elapsed % span));
    yearElement.innerText = styleVariables.currentYear + "";

    map.render();
    if (flag) {
      requestAnimationFrame(render);
    }
  }

  render();
}

export function cancelAnimation(map: Map): void {
  flag = false;
  map.removeLayer(animatedLayer);
  map.addLayer(dynamicLayer);
}

export function clearWebGl(map: Map): void {
  flag = false;
  map.removeLayer(animatedLayer);
  map.removeLayer(dynamicLayer);
}
