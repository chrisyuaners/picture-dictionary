import type { CategoriesResponse, ItemsResponse } from '../types';

const API_BASE = '/api';

export async function fetchCategories(): Promise<CategoriesResponse> {
  const response = await fetch(`${API_BASE}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function fetchItems(categoryId: string): Promise<ItemsResponse> {
  const response = await fetch(`${API_BASE}/items/${categoryId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch items for category: ${categoryId}`);
  }
  return response.json();
}
