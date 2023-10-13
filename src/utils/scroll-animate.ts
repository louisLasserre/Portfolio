import {
  animateDrawing,
  animateElementonScroll,
  animateScrollDown,
} from "./animations";

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
  animateElementonScroll(scrollDownSvg, animateScrollDown);

  drawings.forEach((drawing) =>
    animateElementonScroll(drawing, animateDrawing, {
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

const test = (percent: number, offset: number) => {
  console.log({ percent, offset });
};

const setAnimations: () => void = () => {
  let elementsToAnimate: HTMLElement[] = Array.from(
    document.querySelectorAll("[data-animate]")
  );
  console.log(elementsToAnimate);

  elementsToAnimate.forEach((element) => {
    const animation = getAnimation(element);
    if (animation) {
      animations.push(animation);
    }
  });
  console.log(animations);
};

const getAnimation: (element: HTMLElement) => IAnimation | undefined = (
  element
) => {
  let animationName: string = element.attributes["data-animate"].value;
  if (!animationName) {
    showError(
      "every animation must have a name, your html attribute 'data-animate' must be like: data-animate='nameOfYourAnimation' "
    );
    return;
  }
  let start = getStart(animationName);
  let end = getEnd(animationName);

  if (!start || !end) {
    return;
  }

  return {
    animationName,
    elementToAnimate: element,
    start,
    end,
  };
};

const getStart = (animationName: IAnimation["animationName"]) => {
  let startElement: HTMLElement | null = document.querySelector(
    `[data-animate-${animationName}-start]`
  );

  if (!startElement) {
    showError(
      "you must specify a starting and ending position for each animation by using attributes data-animate-animationName-start and data-animate-animationName-end"
    );
    return;
  }

  startElement.style.background = "red";

  let startElementPos = startElement.getBoundingClientRect();
  console.log(startElementPos);

  return startElementPos.y;
};
const getEnd = (animationName: IAnimation["animationName"]) => {
  let endElement: HTMLElement | null = document.querySelector(
    `[data-animate-${animationName}-end]`
  );

  if (!endElement) {
    showError(
      "you must specify a starting and ending position for each animation by using attributes data-animate-animationName-start and data-animate-animationName-end"
    );
    return;
  }

  endElement.style.background = "green";

  let endElementPos = endElement.getBoundingClientRect();

  return endElementPos.y;
};

const showError = (err: string) => {
  console.error(err);
};
