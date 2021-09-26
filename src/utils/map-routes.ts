import { IBreadcrumb } from "@/base-ui/breadcrumb";

const mapBreadcrumbs = new Map<string, string>([
  ["overview", "概览"],
  ["maps", "地图"],
  ["basic", "basic"],
  ["vector-data", "vector-data"],
  ["mobile-maps-and-sensors", "mobile-maps-and-sensors"],
  ["geo-tiff-rendering", "geo-tiff-rendering"],
  ["vector-tiles-and-mapbox-styles", "vector-tiles-and-mapbox-styles"],
  ["webgl-point-rendering", "webgl-point-rendering"],
  ["data-tiles", "data-tiles"]
]);

export function routesMapBreadcrumbs(routePath: string): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = [];
  const paths: string[] = routePath.split("/");
  for (const p of paths) {
    if (p.length > 0) {
      breadcrumbs.push({ name: mapBreadcrumbs.get(p) ?? "" });
    }
  }
  return breadcrumbs;
}
