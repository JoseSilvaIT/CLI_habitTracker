import { load, save } from "./storage.js";

const DEFAULT_HABITS = [
  {
    id: "read",
    name: "READ",
  },
  {
    id: "code",
    name: "CODE",
  },
  {
    id: "exercise",
    name: "EXERCISE",
  },
  {
    id: "journal",
    name: "JOURNAL",
  },
];

function today() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getData() {
  return load("habits", {});
}

function setData(data) {
  save("habits", data);
}

export function getHabits() {
  return DEFAULT_HABITS;
}

export function getTodayState() {
  const data = getData();
  const date = today();

  if (!data[date]) {
    data[date] = {};

    DEFAULT_HABITS.forEach((habit) => {
      data[date][habit.id] = false;
    });

    setData(data);
  }

  return data[date];
}

export function toggleHabit(id) {
  const data = getData();
  const date = today();

  if (!data[date]) {
    data[date] = {};

    DEFAULT_HABITS.forEach((habit) => {
      data[date][habit.id] = false;
    });
  }

  data[date][id] = !Boolean(data[date][id]);

  setData(data);
}

export function getCompletion(date) {
  const data = getData();
  const day = data[date];

  if (!day) {
    return 0;
  }

  return Object.values(day).filter(Boolean).length;
}

export function getTotalCompletions() {
  const data = getData();

  let total = 0;

  Object.values(data).forEach((day) => {
    total += Object.values(day).filter(Boolean).length;
  });

  return total;
}
