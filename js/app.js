import {
  getHabits,
  getTodayState,
  toggleHabit,
  getTotalCompletions,
} from "./habits.js";

import { getTasks, addTask, deleteTask } from "./eisenhower.js";

import { getNotes, addNote, deleteNote } from "./notes.js";

import { renderHeatmap } from "./heatmap.js";

/* -----------------------------
   HELPERS
----------------------------- */

function createElement(tag, className, text = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

/* -----------------------------
   HABITS
----------------------------- */

function renderHabits() {
  const container = document.getElementById("habits");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  const habits = getHabits();
  const state = getTodayState();

  habits.forEach((habit) => {
    const row = createElement("div", "habit");

    if (state[habit.id]) {
      row.classList.add("done");
    }

    const check = createElement(
      "div",
      "habit-check",
      state[habit.id] ? "[✓]" : "[ ]",
    );

    const name = createElement("div", "habit-name", habit.name);

    const progress = createElement(
      "div",
      "habit-progress",
      state[habit.id] ? "DONE" : "TODO",
    );

    row.append(check, name, progress);

    row.addEventListener("click", () => {
      toggleHabit(habit.id);

      renderHabits();
      renderHeatmap(document.getElementById("heatmap"));
      updateStats();
    });

    container.appendChild(row);
  });
}

/* -----------------------------
   EISENHOWER
----------------------------- */

const QUADRANTS = [
  ["execute", "EXECUTE"],
  ["schedule", "SCHEDULE"],
  ["delegate", "DELEGATE"],
  ["delete", "DELETE"],
];

function renderEisenhower() {
  const container = document.getElementById("eisenhower");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  const tasks = getTasks();

  const matrix = createElement("div", "matrix");

  QUADRANTS.forEach(([id, title]) => {
    const cell = createElement("div", "matrix-cell");

    const heading = createElement("div", "matrix-title", title);

    cell.appendChild(heading);

    const taskList = createElement("div", "matrix-task-list");

    (tasks[id] || []).forEach((task, index) => {
      const row = createElement("div", "matrix-task-row");

      const item = createElement("div", "matrix-task", `> ${task}`);

      const deleteButton = createElement("button", "task-delete", "[x]");

      deleteButton.type = "button";
      deleteButton.title = "Delete task";

      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        deleteTask(id, index);
        renderEisenhower();
      });

      row.append(item, deleteButton);
      taskList.appendChild(row);
    });

    cell.appendChild(taskList);

    const form = createElement("form", "task-form");

    const input = createElement("input", "task-input");

    input.type = "text";
    input.placeholder = "new task...";
    input.autocomplete = "off";
    input.maxLength = 120;

    const button = createElement("button", "task-add", "[+]");

    button.type = "submit";

    form.append(input, button);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const value = input.value.trim();

      if (!value) {
        input.focus();
        return;
      }

      addTask(id, value);

      renderEisenhower();

      const newInput = container.querySelector(
        `.matrix-cell:nth-child(${
          QUADRANTS.findIndex(([quadrant]) => quadrant === id) + 1
        }) .task-input`,
      );

      if (newInput) {
        newInput.focus();
      }
    });

    cell.appendChild(form);
    matrix.appendChild(cell);
  });

  container.appendChild(matrix);
}

/* -----------------------------
   NOTES
----------------------------- */

function renderNotes() {
  const container = document.getElementById("notes");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  const notes = getNotes();

  const form = createElement("form", "note-form");

  const titleInput = createElement("input", "note-title-input");

  titleInput.type = "text";
  titleInput.placeholder = "TITLE...";
  titleInput.maxLength = 80;
  titleInput.autocomplete = "off";

  const contentInput = createElement("textarea", "note-content-input");

  contentInput.placeholder = "CONTENT...";
  contentInput.rows = 4;
  contentInput.maxLength = 1000;

  const saveButton = createElement("button", "note-save", "[SAVE NOTE]");

  saveButton.type = "submit";

  form.append(titleInput, contentInput, saveButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
      if (!title) {
        titleInput.focus();
      } else {
        contentInput.focus();
      }

      return;
    }

    addNote(title, content);

    renderNotes();

    const newTitleInput = container.querySelector(".note-title-input");

    if (newTitleInput) {
      newTitleInput.focus();
    }
  });

  container.appendChild(form);

  notes.forEach((note) => {
    const element = createElement("div", "note");

    const header = createElement("div", "note-header");

    const title = createElement("div", "note-title", `> ${note.title}`);

    const deleteButton = createElement("button", "note-delete", "[x]");

    deleteButton.type = "button";
    deleteButton.title = "Delete note";

    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
      renderNotes();
    });

    header.append(title, deleteButton);

    const content = createElement("div", "note-content", note.content);

    element.append(header, content);

    container.appendChild(element);
  });
}

/* -----------------------------
   STATS
----------------------------- */

function updateStats() {
  const total = document.getElementById("total-completions");

  if (total) {
    total.textContent = String(getTotalCompletions());
  }
}

/* -----------------------------
   CLOCK
----------------------------- */

function updateClock() {
  const element = document.getElementById("clock");

  if (!element) {
    return;
  }

  const now = new Date();

  element.textContent = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/* -----------------------------
   SERVICE WORKER
----------------------------- */

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("[CLI_HOME] Service Worker registered");
      })
      .catch((error) => {
        console.warn("[CLI_HOME] Service Worker registration failed:", error);
      });
  });
}

/* -----------------------------
   INIT
----------------------------- */

function init() {
  renderHabits();
  renderEisenhower();
  renderHeatmap(document.getElementById("heatmap"));
  renderNotes();
  updateStats();
  updateClock();

  setInterval(updateClock, 1000);

  // Re-render at midnight/day change.
  setInterval(() => {
    renderHabits();
    renderHeatmap(document.getElementById("heatmap"));
    updateStats();
  }, 60 * 1000);
}

registerServiceWorker();
init();
