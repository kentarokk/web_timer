"use client";

import useSound from "use-sound";
import { useState, useEffect } from "react";
import alarmSound from "./alarm.mp3";

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isActive, setIsActive] = useState(false);

  const [play] = useSound(alarmSound);

  const changeMinute = (operator: string) => {
    if (operator === "add") {
      setMinutes((prevMinute) => (prevMinute += 1));
    } else if (operator === "sub") {
      if (minutes > 0) {
        setMinutes((prevMinute) => (prevMinute -= 1));
      }
    }
  };
  const changeSecond = (operator: string) => {
    if (operator === "add") {
      setSeconds((prevSeconds) => (prevSeconds += 1));
    } else if (operator === "sub") {
      if (seconds > 0) {
        setSeconds((prevSeconds) => (prevSeconds -= 1));
      }
    }
  };

  useEffect(() => {
    let id: NodeJS.Timeout | null = null;
    if (isActive && totalSeconds > 0) {
      id = setInterval(() => {
        setTotalSeconds((seconds) => seconds - 1);
        if (seconds > 0) {
          changeSecond("sub");
        } else if (minutes > 0) {
          changeMinute("sub");
          setSeconds(59);
        }
      }, 1000);
      setIntervalId(id);
    } else if (totalSeconds === 0 && isActive) {
      changeMinute("sub");
      clearInterval(intervalId as NodeJS.Timeout);
      play();
      // alert("Time Up");
      setIsActive(false);
    }
    return () => {
      if (id) clearInterval(id);
    };
  }, [isActive, totalSeconds]);

  const handleStart = () => {
    const totalSec = minutes * 60 + seconds;
    console.log(totalSec);

    if (!isNaN(totalSec) || totalSec >= 0) {
      setTotalSeconds(totalSec);
      setIsActive(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <div>
        <h1 className="font-bold items-center">Timer</h1>
        <div className="flex gap-4 mt-3">
          <button
            type="button"
            onClick={() => {
              changeMinute("add");
            }}
          >
            +
          </button>
          <div className="">
            {minutes} <span>min</span>
          </div>
          <button
            type="button"
            onClick={() => {
              changeMinute("sub");
            }}
          >
            -
          </button>
          <button
            type="button"
            onClick={() => {
              changeSecond("add");
            }}
          >
            +
          </button>
          <div className="">
            {seconds} <span>sec</span>
          </div>
          <button
            type="button"
            onClick={() => {
              changeSecond("sub");
            }}
          >
            -
          </button>
        </div>
        <div className="mt-3">
          <button type="button" onClick={handleStart}>
            Start
          </button>
        </div>
      </div>
    </main>
  );
}
