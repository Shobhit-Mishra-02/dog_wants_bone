import { HeadMotionStatusInterface } from "./interfaces.ts";

export const getRandomCoordinates = (width: number, height: number) => {
  let t = Math.random();
  let top: number = Math.floor(t * (height - 20));
  let left: number = Math.floor(t * (width - 20));

  return { top, left };
};

export const getDistanceBtwTwoPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.sqrt(
    Math.abs(x1 - x2) * Math.abs(x1 - x2) +
      Math.abs(y1 - y2) * Math.abs(y1 - y2)
  );
};

export const takeStep = (
  setHeadCoordinate: React.Dispatch<
    React.SetStateAction<{
      top: number;
      left: number;
    }>
  >,
  direction: "ArrowUp" | "ArrowDown" | "ArrowRight" | "ArrowLeft",
  bodySideLength: number
) => {
  switch (direction) {
    case "ArrowUp":
      setHeadCoordinate((pre: { top: number; left: number }) => ({
        top: pre.top - bodySideLength,
        left: pre.left,
      }));

      break;
    case "ArrowDown":
      setHeadCoordinate((pre: { top: number; left: number }) => ({
        top: pre.top + bodySideLength,
        left: pre.left,
      }));

      break;
    case "ArrowLeft":
      setHeadCoordinate((pre: { top: number; left: number }) => ({
        top: pre.top,
        left: pre.left - bodySideLength,
      }));

      break;
    case "ArrowRight":
      setHeadCoordinate((pre: { top: number; left: number }) => ({
        top: pre.top,
        left: pre.left + bodySideLength,
      }));

      break;
    default:
      break;
  }
};

export const putFood = (
  width: number,
  height: number,
  foodRef: React.RefObject<HTMLDivElement>
) => {
  let { top, left } = getRandomCoordinates(width, height);
  foodRef.current?.style.setProperty("top", `${top}px`);
  foodRef.current?.style.setProperty("left", `${left}px`);
};

export const checkFoodEat = (
  foodRef: React.RefObject<HTMLDivElement>,
  headCoordinate: {
    top: number;
    left: number;
  },
  bodySideLength: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  width: number,
  height: number
) => {
  let x1 = parseInt(foodRef.current?.style.top.slice(0, -2) as string);
  let y1 = parseInt(foodRef.current?.style.left.slice(0, -2) as string);

  let distance = getDistanceBtwTwoPoints(
    x1,
    y1,
    headCoordinate.top,
    headCoordinate.left
  );
  distance -= bodySideLength;

  if (distance <= 6) {
    setScore((prev) => prev + 100);
    putFood(width, height, foodRef);
  }
};

export const reStartGame = (
  width: number,
  height: number,
  foodRef: React.RefObject<HTMLDivElement>,
  headCoordinate: {
    top: number;
    left: number;
  },
  setScore: React.Dispatch<React.SetStateAction<number>>,
  headMotionStatus: React.MutableRefObject<HeadMotionStatusInterface>
) => {
  putFood(width, height, foodRef);
  headCoordinate.top = 160;
  headCoordinate.left = 160;

  headMotionStatus.current = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  setScore(0);
};
