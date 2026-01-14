export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  itemCount: number;
}

export interface DictionaryItem {
  id: string;
  word: string;
  imageUrl: string;
  pronunciation?: string;
  articlePrefix?: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface ItemsResponse {
  categoryId: string;
  items: DictionaryItem[];
}
