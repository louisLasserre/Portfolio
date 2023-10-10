interface IAnimation {
  animationName: string;
  elementToAnimate: HTMLElement;
  start: number;
  end: number;
}

let animations: IAnimation[] = [];

window.addEventListener("DOMContentLoaded", (event) => {
  //setAnimations();
});

function animateScrollDown(element: HTMLElement, percent: number) {
  element.style.transform = `translate(-50%, -50%) rotate(${percent * 1.2}deg)`;
}

const animateElement = document.querySelector("[data-animate]");
document.addEventListener("scroll", (event) => {
  const { top, bottom } = animateElement?.getBoundingClientRect();

  //console.log(top - window.innerHeight, bottom);

  if (top - window.innerHeight < 0 && bottom > 0) {
    const topAtBot = top - window.innerHeight;
    const totalDistance = window.innerHeight + (bottom - top);
    const positiveTopDistance = Math.abs(topAtBot);

    const percentOfAnimation =
      ((totalDistance + positiveTopDistance) * 100) / totalDistance - 100;
    animateScrollDown(animateElement, percentOfAnimation);
  }

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
