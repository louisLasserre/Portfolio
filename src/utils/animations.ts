export function animateScrollDown(element: HTMLElement, percent: number) {
  element.style.transform = `translate(-50%, -50%) rotate(${percent * 1.2}deg)`;
}
