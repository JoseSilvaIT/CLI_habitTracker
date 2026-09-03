import { getCompletion } from "./habits.js";

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getLevel(count) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;

  return 4;
}

export function renderHeatmap(container) {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  const grid = document.createElement("div");

  grid.className = "heatmap";

  const today = new Date();

  for (let i = 119; i >= 0; i--) {
    const date = new Date(today);

    date.setHours(12, 0, 0, 0);
    date.setDate(today.getDate() - i);

    const key = dateKey(date);
    const completions = getCompletion(key);
    const level = getLevel(completions);

    const cell = document.createElement("div");

    cell.className = `heat-cell heat-${level}`;
    cell.title = `${key}: ${completions} habits completed`;

    grid.appendChild(cell);
  }

  container.appendChild(grid);
}
