import { animateElementOnScroll, drawSvg } from "./animate-on-scroll";
import { animateScrollDown } from "./animations";

interface IAnimation {
  animationName: string;
  elementToAnimate: HTMLElement;
  start: number;
  end: number;
}

let animations: IAnimation[] = [];

const scrollDownSvg = document.querySelector("[data-animate]");
const drawings = document.querySelectorAll(
  "[data-animate-drawing]"
) as NodeListOf<SVGGeometryElement>;

drawings.forEach((drawing) => {
  const length = drawing.getTotalLength();

  // The start position of the drawing
  drawing.style.strokeDasharray = `${length}`;
  drawing.length = length;

  // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
  drawing.style.strokeDashoffset = `${length}`;
});

document.addEventListener("scroll", (event) => {
  animateElementOnScroll(scrollDownSvg, animateScrollDown);

  drawings.forEach((drawing) =>
    animateElementOnScroll(drawing, drawSvg, {
      endInset: 0.24,
      startInset: 0.08,
    })
  );

  // let actualScreenTopScroll = window.scrollY;
  // let actualScreenBottomScroll = window.scrollY + window.screen.availHeight;
  // console.log(actualScreenTopScroll, actualScreenBottomScroll);
  // let animate = animations.filter(
  //   (animation) =>
  //     animation.end > actualScreenTopScroll &&
  //     animation.start < actualScreenBottomScroll
  // );
  // console.log({ animate });
  // animate.forEach((animation) => {
  //   let test = animation.animationName;
  //   console.log(test);
  //   //test();
  // });
});
