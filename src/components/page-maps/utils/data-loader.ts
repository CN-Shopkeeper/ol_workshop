import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorSource } from "ol/source";
import Geometry from "ol/geom/Geometry";

export function loadMeteoritesData(source: VectorSource<Geometry>): void {
  const client = new XMLHttpRequest();
  client.open("GET", "../data/meteorites.csv");
  client.onload = function () {
    const csv = client.responseText;
    const features = [];

    let prevIndex = csv.indexOf("\n") + 1; // scan past the header line

    let curIndex;
    while ((curIndex = csv.indexOf("\n", prevIndex)) != -1) {
      const line = csv.substr(prevIndex, curIndex - prevIndex).split(",");
      prevIndex = curIndex + 1;

      const coords = fromLonLat([parseFloat(line[4]), parseFloat(line[3])]);
      if (isNaN(coords[0]) || isNaN(coords[1])) {
        // guard against bad data
        continue;
      }

      features.push(
        new Feature({
          mass: parseFloat(line[1]) || 0,
          year: parseInt(line[2]) || 0,
          geometry: new Point(coords)
        })
      );
    }
    source.addFeatures(features);
  };
  client.send();
}
