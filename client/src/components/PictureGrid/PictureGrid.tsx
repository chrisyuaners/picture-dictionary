import type { DictionaryItem } from '../../types';
import { PictureCard } from '../PictureCard/PictureCard';
import './PictureGrid.css';

interface PictureGridProps {
  items: DictionaryItem[];
  onSpeak: (text: string) => void;
  loading?: boolean;
}

export function PictureGrid({ items, onSpeak, loading }: PictureGridProps) {
  if (loading) {
    return (
      <div className="picture-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="picture-grid__skeleton-card">
            <div className="picture-grid__skeleton-image" />
            <div className="picture-grid__skeleton-label" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="picture-grid__empty">
        <p>No items found in this category.</p>
      </div>
    );
  }

  return (
    <div className="picture-grid">
      {items.map((item) => (
        <PictureCard key={item.id} item={item} onSpeak={onSpeak} />
      ))}
    </div>
  );
}
