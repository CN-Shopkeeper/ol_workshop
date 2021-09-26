import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/overview"
  },
  {
    path: "/overview",
    name: "overview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "overview" */ "@/views/overview/overview.vue")
  },
  {
    path: "/maps",
    name: "maps",
    component: () =>
      import(/* webpackChunkName: "maps" */ "@/views/maps/maps.vue"),
    children: [
      {
        path: "/maps/basic",
        name: "basic",
        component: () =>
          import(/* webpackChunkName: "basic" */ "@/views/maps/basic/basic.vue")
      },
      {
        path: "/maps/vector-data",
        name: "vectorData",
        component: () =>
          import(
            /* webpackChunkName: "vectorData" */ "@/views/maps/vector-data/vector-data.vue"
          )
      },
      {
        path: "/maps/mobile-maps-and-sensors",
        name: "mobileMapsAndSensors",
        component: () =>
          import(
            /* webpackChunkName: "mobileMapsAndSensors" */ "@/views/maps/mobile-maps-and-sensors/mobile-maps-and-sensors.vue"
          )
      },
      {
        path: "/maps/geo-tiff-rendering",
        name: "geoTIFFRendering",
        component: () =>
          import(
            /* webpackChunkName: "geoTIFFRendering" */ "@/views/maps/geo-tiff-rendering/geo-tiff-rendering.vue"
          )
      },
      {
        path: "/maps/vector-tiles-and-mapbox-styles",
        name: "vectorTilesAndMapboxStyles",
        component: () =>
          import(
            /* webpackChunkName: "vectorTilesAndMapboxStyles" */ "@/views/maps/vector-tiles-and-mapbox-styles/vector-tiles-and-mapbox-styles.vue"
          )
      },
      {
        path: "/maps/webgl-point-rendering",
        name: "webGLPointRendering",
        component: () =>
          import(
            /* webpackChunkName: "webGLPointRendering" */ "@/views/maps/webgl-point-rendering/webgl-point-rendering.vue"
          )
      },
      {
        path: "/maps/data-tiles",
        name: "dataTiles",
        component: () =>
          import(
            /* webpackChunkName: "dataTiles" */ "@/views/maps/data-tiles/data-tiles.vue"
          )
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  if (to.path === "/maps" || to.path === "/maps/") {
    return "/maps/basic";
  }
});

export default router;
