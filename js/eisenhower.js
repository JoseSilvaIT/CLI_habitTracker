import { load, save } from "./storage.js";

const DEFAULT_TASKS = {
  execute: ["FIX API BUG", "SEND REPORT"],
  schedule: ["STUDY", "WORKOUT"],
  delegate: ["CALL CLIENT"],
  delete: ["DELETE SPAM"],
};

export function getTasks() {
  return load("tasks", DEFAULT_TASKS);
}

export function addTask(quadrant, task) {
  const cleanTask = String(task).trim();

  if (!cleanTask) {
    return false;
  }

  const tasks = getTasks();

  if (!tasks[quadrant]) {
    tasks[quadrant] = [];
  }

  tasks[quadrant].push(cleanTask);

  save("tasks", tasks);

  return true;
}

export function deleteTask(quadrant, index) {
  const tasks = getTasks();

  if (!tasks[quadrant]) {
    return false;
  }

  if (index < 0 || index >= tasks[quadrant].length) {
    return false;
  }

  tasks[quadrant].splice(index, 1);

  save("tasks", tasks);

  return true;
}
