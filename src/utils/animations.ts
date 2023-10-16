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
