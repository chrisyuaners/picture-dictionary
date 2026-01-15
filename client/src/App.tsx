import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header/Header';
import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import { PictureGrid } from './components/PictureGrid/PictureGrid';
import { fetchCategories, fetchItems } from './services/api';
import type { Category, DictionaryItem } from './types';
import './App.css';

const API_BASE = 'http://localhost:3001';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [items, setItems] = useState<DictionaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

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

  const handleSpeak = useCallback((word: string) => {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Play the audio file
    const audioUrl = `${API_BASE}/audio/${word.toLowerCase()}.mp3`;
    const audio = new Audio(audioUrl);

    audio.onerror = () => {
      console.warn(`Audio file not found: ${audioUrl}`);
    };

    audio.play().catch(console.error);
    setCurrentAudio(audio);
  }, [currentAudio]);

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
