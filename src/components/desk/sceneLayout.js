// Object bounds in the source photographs. The stage scales them uniformly.
const rectangle = "0 0,100% 0,100% 100%,0 100%";
const ellipse = "30% 1%,70% 1%,97% 23%,100% 57%,79% 75%,84% 98%,19% 98%,20% 74%,1% 56%,2% 25%";
const laptop = "24% 0,99% 1%,96% 79%,81% 100%,0 92%,0 88%,20% 73%";
const notebook = "14% 1%,99% 1%,92% 98%,0 98%,0 73%";
const folder = "0 0,80% 0,100% 86%,99% 98%,9% 98%";

function composition(width, height, objects) {
  return Object.fromEntries(Object.entries(objects).map(([key, [x,y,w,h,cut = rectangle]]) =>
    [key, [100*x/width, 100*y/height, 100*w/width, 100*h/height, cut]]
  ));
}

export const landscape = composition(1672, 941, {
  monitor: [606,296,456,213], laptop: [1063,429,225,147,laptop],
  chip: [482,479,112,87], notebook: [372,581,216,49,notebook],
  folder: [1027,583,281,48,folder], idcard: [481,394,54,55],
  trophy: [1163,244,77,79,ellipse], envelope: [733,595,182,37],
  lamp: [345,450,100,111,ellipse], keyboard: [679,564,306,22],
  clock: [777,89,117,42],
});

export const portrait = composition(941, 1672, {
  monitor: [236,730,432,190], laptop: [654,841,169,124,laptop],
  chip: [216,928,89,74], notebook: [164,1016,164,46,notebook],
  folder: [600,1017,203,43,folder], idcard: [164,757,45,47],
  trophy: [652,599,71,77,ellipse], envelope: [401,1030,137,32],
  lamp: [106,897,88,102,ellipse], keyboard: [367,998,200,23],
  clock: [412,434,119,40],
});

export function bounds([x, y, width, height]) {
  return { left: x + "%", top: y + "%", width: width + "%", height: height + "%" };
}
