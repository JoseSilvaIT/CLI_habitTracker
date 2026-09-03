const PREFIX = "cli_home_";

export function load(key, fallback = null) {
  const data = localStorage.getItem(PREFIX + key);

  if (data === null) {
    return fallback;
  }

  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function remove(key) {
  localStorage.removeItem(PREFIX + key);
}
