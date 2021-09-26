import { IMenuItem } from "./type";

export const menuItems: IMenuItem[] = [
  {
    id: "/overview",
    name: "overview",
    icon: "el-icon-data-board",
    children: [
      {
        id: "/overview",
        name: "overview"
      }
    ]
  },
  {
    id: "/maps",
    name: "maps",
    icon: "el-icon-location-information",
    children: [
      {
        id: "/maps/basic",
        name: "basic"
      },
      {
        id: "/maps/vector-data",
        name: "vectorData"
      },
      {
        id: "/maps/mobile-maps-and-sensors",
        name: "mobileMapsAndSensors"
      },
      {
        id: "/maps/geo-tiff-rendering",
        name: "geoTIFFRendering"
      },
      {
        id: "/maps/vector-tiles-and-mapbox-styles",
        name: "vectorTilesAndMapboxStyles"
      },
      {
        id: "/maps/webgl-point-rendering",
        name: "webGLPointRendering"
      },
      {
        id: "/maps/data-tiles",
        name: "dataTiles"
      }
    ]
  }
];
