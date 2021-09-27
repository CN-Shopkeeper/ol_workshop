// 将面积收缩在low和high之间
export function clamp(value: number, low: number, high: number): number {
  return Math.max(low, Math.min(value, high));
}
