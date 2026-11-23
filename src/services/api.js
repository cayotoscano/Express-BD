import { categories as localCategories } from "../data/courses.js";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`A API respondeu com status ${response.status}.`);
  }

  return response.json();
}

export async function fetchCategories() {
  try {
    return await request("/courses");
  } catch (error) {
    console.warn("Não foi possível carregar a API; usando o catálogo local.", error);
    return localCategories;
  }
}

export async function fetchFavorites(userId) {
  return request(`/courses/favorites/${encodeURIComponent(userId)}`);
}

export async function syncFavorites(userId, courseIds) {
  return request(`/courses/favorites/${encodeURIComponent(userId)}`, {
    method: "PUT",
    body: JSON.stringify({ courseIds }),
  });
}
