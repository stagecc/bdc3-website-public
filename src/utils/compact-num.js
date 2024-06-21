const formatter = Intl.NumberFormat("en", {
  notation: "compact",
});
export const compactNum = (n) => formatter.format(n);