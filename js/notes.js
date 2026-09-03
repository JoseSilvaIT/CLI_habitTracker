import { load, save } from "./storage.js";

const DEFAULT_NOTES = [
  {
    id: "default-project",
    title: "PROJECT",
    content: "build kwgt terminal UI",
  },
  {
    id: "default-idea",
    title: "IDEA",
    content: "add boot sequence",
  },
  {
    id: "default-todo",
    title: "TODO",
    content: "document formulas",
  },
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getNotes() {
  return load("notes", DEFAULT_NOTES);
}

export function addNote(title, content) {
  const cleanTitle = String(title).trim();
  const cleanContent = String(content).trim();

  if (!cleanTitle || !cleanContent) {
    return false;
  }

  const notes = getNotes();

  notes.unshift({
    id: createId(),
    title: cleanTitle,
    content: cleanContent,
  });

  save("notes", notes);

  return true;
}

export function deleteNote(id) {
  const notes = getNotes();

  const filtered = notes.filter((note) => note.id !== id);

  if (filtered.length === notes.length) {
    return false;
  }

  save("notes", filtered);

  return true;
}
