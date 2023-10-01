import { Time, TimeString } from "@/shared/types/time.interface";

export const secondsToTime = (rawSecs: number): Time => {
  const seconds = rawSecs % 60;
  const rawMins = Math.floor(rawSecs / 60);
  const minutes = rawMins % 60;
  const hours = Math.floor(rawMins / 60);
  return { seconds, minutes, hours };
};

export const timeToSeconds = (time: Time) => {
  const totalMinutes = time.hours * 60 + time.minutes;
  const totalSeconds = totalMinutes * 60 + time.seconds;
  return totalSeconds;
};

export const timeToTimeString = (time: Time): TimeString => {
  return {
    seconds: time.seconds.toString().padStart(2, "0"),
    minutes: time.minutes.toString().padStart(2, "0"),
    hours: time.hours.toString(),
  };
};
