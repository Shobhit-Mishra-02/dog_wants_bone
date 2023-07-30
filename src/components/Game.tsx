import "../Game.css";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { putFood, checkFoodEat, takeStep, reStartGame } from "../../utils";
import { HeadMotionStatusInterface } from "../../interfaces";

const validKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

const Game = () => {
  const width: number = 496;
  const height: number = 592;
  const bodySideLength: number = 16;
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setGameOver] = useState(false);
  const [headCoordinate, setHeadCoordinate] = useState<{
    top: number;
    left: number;
  }>({ top: 160, left: 160 });

  const foodRef = useRef<HTMLDivElement>(null);
  const headMotionStatus = useRef<HeadMotionStatusInterface>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });
  const motionId = useRef<null | number>(null);

  document.addEventListener("keydown", (_e) => {
    if (validKeys.includes(_e.key)) {
      if (_e.key === "ArrowUp" && !headMotionStatus.current.ArrowUp) {
        if (motionId.current !== null) {
          clearInterval(motionId.current);
          motionId.current = null;
        }

        motionId.current = setInterval(() => {
          takeStep(setHeadCoordinate, "ArrowUp", bodySideLength);
        }, 100);

        headMotionStatus.current = {
          ArrowUp: true,
          ArrowDown: false,
          ArrowLeft: false,
          ArrowRight: false,
        };
      }

      if (_e.key === "ArrowDown" && !headMotionStatus.current.ArrowDown) {
        if (motionId.current !== null) {
          clearInterval(motionId.current);
          motionId.current = null;
        }

        motionId.current = setInterval(() => {
          takeStep(setHeadCoordinate, "ArrowDown", bodySideLength);
        }, 100);

        headMotionStatus.current = {
          ArrowUp: false,
          ArrowDown: true,
          ArrowLeft: false,
          ArrowRight: false,
        };
      }

      if (_e.key === "ArrowRight" && !headMotionStatus.current.ArrowRight) {
        if (motionId.current !== null) {
          clearInterval(motionId.current);
          motionId.current = null;
        }

        motionId.current = setInterval(() => {
          takeStep(setHeadCoordinate, "ArrowRight", bodySideLength);
        }, 100);

        headMotionStatus.current = {
          ArrowUp: false,
          ArrowDown: false,
          ArrowLeft: false,
          ArrowRight: true,
        };
      }

      if (_e.key === "ArrowLeft" && !headMotionStatus.current.ArrowLeft) {
        if (motionId.current !== null) {
          clearInterval(motionId.current);
          motionId.current = null;
        }

        motionId.current = setInterval(() => {
          takeStep(setHeadCoordinate, "ArrowLeft", bodySideLength);
        }, 100);

        headMotionStatus.current = {
          ArrowUp: false,
          ArrowDown: false,
          ArrowLeft: true,
          ArrowRight: false,
        };
      }
    }
  });

  useEffect(() => {
    checkFoodEat(
      foodRef,
      headCoordinate,
      bodySideLength,
      setScore,
      width,
      height
    );

    if (headMotionStatus.current.ArrowUp) {
      if (headCoordinate.top <= 0) {
        if (motionId.current !== null) {
          clearInterval(motionId.current);
          motionId.current = null;
        }
        headMotionStatus.current = {
          ArrowUp: true,
          ArrowDown: true,
          ArrowLeft: true,
          ArrowRight: true,
        };
        setGameOver(true);
      }
    }
    if (headMotionStatus.current.ArrowLeft) {
      if (headCoordinate.left <= 0) {
        if (motionId.current !== null) {
          clearInterval(motionId.current);
          motionId.current = null;
        }
        headMotionStatus.current = {
          ArrowUp: true,
          ArrowDown: true,
          ArrowLeft: true,
          ArrowRight: true,
        };
        setGameOver(true);
      }
    }

    if (headMotionStatus.current.ArrowDown) {
      if (headCoordinate.top + bodySideLength >= height) {
        if (motionId.current !== null) {
          clearInterval(motionId.current);
          motionId.current = null;
        }
        headMotionStatus.current = {
          ArrowUp: true,
          ArrowDown: true,
          ArrowLeft: true,
          ArrowRight: true,
        };
        setGameOver(true);
      }
    }

    if (headMotionStatus.current.ArrowRight) {
      if (headCoordinate.left + bodySideLength >= width) {
        if (motionId.current !== null) {
          clearInterval(motionId.current);
          motionId.current = null;
        }
        headMotionStatus.current = {
          ArrowUp: true,
          ArrowDown: true,
          ArrowLeft: true,
          ArrowRight: true,
        };
        setGameOver(true);
      }
    }
  }, [headCoordinate]);

  useLayoutEffect(() => {
    putFood(width, height, foodRef);
  }, []);

  return (
    <div className="container">
      <div className="title">Help my dog...</div>
      <div>
        <div className="score">Score: {score}</div>
        <span className="instruction">Use arrow keys to help the dogs</span>
        {isGameOver && (
          <div className="message">
            <div className="message_content">
              <h2>Game Over !!</h2>
              <p>You have score {score}</p>
              <div className="btn_container">
                <button
                  onClick={() => {
                    setGameOver(false);
                    reStartGame(
                      width,
                      height,
                      foodRef,
                      headCoordinate,
                      setScore,
                      headMotionStatus
                    );
                  }}
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="field">
        <div
          style={{
            top: `${headCoordinate.top}px`,
            left: `${headCoordinate.left}px`,
          }}
          className="dog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-dog"
          >
            <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
            <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
            <path d="M8 14v.5" />
            <path d="M16 14v.5" />
            <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
            <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
          </svg>
        </div>

        <div ref={foodRef} className="food">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-bone"
          >
            <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Game;
