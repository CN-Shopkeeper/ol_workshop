import { Style, Fill, Stroke } from "ol/style";
import RenderFeature from "ol/render/Feature.js";
import Feature from "ol/Feature.js";
import Geometry from "ol/geom/Geometry.js";

const style1 = new Style({
  fill: new Fill({
    color: "red"
  }),
  stroke: new Stroke({
    color: "white"
  })
});
const style2 = new Style({
  fill: new Fill({
    color: "blue"
  }),
  stroke: new Stroke({
    color: "white"
  })
});
const styleDefault = new Style({
  fill: new Fill({
    color: "green"
  }),
  stroke: new Stroke({
    color: "white"
  })
});
function styledByName(feature: RenderFeature | Feature<Geometry>): Style {
  let name = feature.get("name");
  if (!name) {
    return styleDefault;
  } else {
    name = name.toUpperCase();
  }
  return name < "N" ? style1 : style2;
}

export { styledByName };
