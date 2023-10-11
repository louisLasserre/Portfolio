export function animateElementonScroll(
  element: any,
  callback: (element: any, percentOfAnimation: number) => void,
  options?: {
    endInset: number;
    startInset: number;
  }
) {
  const { top, bottom } = element?.getBoundingClientRect();

  const { endInset, startInset } = options ?? {};

  const end = endInset ? bottom - window.innerHeight * endInset : bottom;
  const start = startInset
    ? top - window.innerHeight + startInset * window.innerHeight
    : top - window.innerHeight;

  //console.log(bottom, end, window.innerHeight * endInset);
  //const getPercenta = (!endInset && !startInset) ? 1 : ()

  const offset = 1 - ((endInset || 0) + (startInset || 0));

  if (start < 0 && end > 0) {
    const elementH = bottom - top;
    const totalDistance = window.innerHeight * offset + elementH;

    const endingPoint = endInset
      ? window.innerHeight * endInset - elementH
      : 0 - elementH;
    const startingPoint = startInset
      ? window.innerHeight - window.innerHeight * startInset
      : window.innerHeight;

    const percentOfAnimation = ((startingPoint - top) * 100) / totalDistance;

    callback(element, percentOfAnimation);
  }
}

export function animateScrollDown(element: HTMLElement, percent: number) {
  element.style.transform = `translate(-50%, -50%) rotate(${percent * 1.2}deg)`;
}

export function animateDrawing(
  element: SVGGeometryElement & { length: number },
  percent: number
) {
  const length = element.length;

  const realPercent = percent / 100;

  var draw = length * realPercent;

  // Reverse the drawing (when scrolling upwards)
  element.style.strokeDashoffset = `${length - draw}`;
}
