import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import { PictureGrid } from './components/PictureGrid/PictureGrid';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { fetchCategories, fetchItems } from './services/api';
import type { Category, DictionaryItem } from './types';
import './App.css';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [items, setItems] = useState<DictionaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { speak } = useSpeechSynthesis();

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data.categories);
        if (data.categories.length > 0) {
          setSelectedCategory(data.categories[0].id);
        }
      })
      .catch((err) => {
        setError('Failed to load categories');
        console.error(err);
      });
  }, []);

  // Fetch items when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    setLoading(true);
    setError(null);

    fetchItems(selectedCategory)
      .then((data) => {
        setItems(data.items);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load items');
        setLoading(false);
        console.error(err);
      });
  }, [selectedCategory]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  return (
    <div className="app">
      <Header />

      {error && (
        <div className="app__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}

      {categories.length > 0 && (
        <CategoryTabs
          categories={categories}
          selectedId={selectedCategory}
          onSelect={handleCategorySelect}
        />
      )}

      <main className="app__main">
        <PictureGrid items={items} onSpeak={handleSpeak} loading={loading} />
      </main>
    </div>
  );
}

export default App;
