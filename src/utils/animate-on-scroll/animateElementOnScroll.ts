export function animateElementOnScroll(
  element: HTMLElement | Element,
  callback: (
    element: HTMLElement | Element,
    percentOfAnimation: number
  ) => void,
  options?: {
    endInset: number;
    startInset: number;
  }
) {
  const { top, bottom } = element.getBoundingClientRect();

  const { endInset, startInset } = options ?? {};

  const realTimeEnd = endInset
    ? bottom - window.innerHeight * endInset
    : bottom;
  const realTimeStart = startInset
    ? top - window.innerHeight + startInset * window.innerHeight
    : top - window.innerHeight;

  const offset = 1 - ((endInset || 0) + (startInset || 0));

  if (realTimeStart < 0 && realTimeEnd > 0) {
    const elementH = bottom - top;
    const totalDistance = window.innerHeight * offset + elementH;

    const endingPoint = endInset
      ? window.innerHeight * endInset - elementH
      : 0 - elementH;
    const startingPoint = startInset
      ? window.innerHeight - window.innerHeight * startInset
      : window.innerHeight;
    console.log(startingPoint, realTimeStart);

    const percentOfAnimation = ((startingPoint - top) * 100) / totalDistance;

    callback(element, percentOfAnimation);
  }
}
