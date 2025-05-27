let scrollY = 0;

export function disableScroll(lock: boolean) {
  if (typeof window === "undefined") return;

  const body = document.body;

  if (lock) {
    scrollY = window.scrollY;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflowY = "hidden";
    body.style.paddingRight = `${scrollBarWidth}px`;
  } else {
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.overflowY = "";
    body.style.paddingRight = "";

    window.scrollTo(0, scrollY);
  }
}
