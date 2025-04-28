export function disableScroll(lock: boolean) {
  if (typeof window === "undefined") return;

  if (lock) {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  } else {
    document.body.style.overflowY = "";
    document.body.style.paddingRight = "";
  }
}
