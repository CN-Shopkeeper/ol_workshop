import { Map } from "ol";
import { useStore } from "@/store";
import { watch } from "vue";

export function resizeMap(map: Map): void {
  window.addEventListener("resize", () => {
    map.updateSize();
  });

  const store = useStore();
  watch(
    () => store.state.isMenuFold,
    () => {
      // 不知道如何监听el-menu的折叠动画结束
      setTimeout(() => {
        map.updateSize();
      }, 500);
    }
  );
}
