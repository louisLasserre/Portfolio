export function drawSvg(
  element: SVGGeometryElement & { length: number },
  percent: number
) {
  const length = element.length;

  const realPercent = percent / 100;

  var draw = length * realPercent;

  // Reverse the drawing (when scrolling upwards)
  element.style.strokeDashoffset = `${length - draw}`;
}
