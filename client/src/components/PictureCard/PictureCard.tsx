import { useState } from 'react';
import type { DictionaryItem } from '../../types';
import './PictureCard.css';

interface PictureCardProps {
  item: DictionaryItem;
  onSpeak: (text: string) => void;
}

export function PictureCard({ item, onSpeak }: PictureCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onSpeak(item.word);
  };

  return (
    <button
      className={`picture-card ${isClicked ? 'picture-card--clicked' : ''}`}
      onClick={handleClick}
      aria-label={`Hear pronunciation of ${item.word}`}
    >
      <div className="picture-card__image-container">
        {!imageLoaded && !imageError && (
          <div className="picture-card__skeleton" />
        )}
        {imageError ? (
          <div className="picture-card__fallback">
            {item.word.charAt(0)}
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.word}
            className={`picture-card__image ${imageLoaded ? 'picture-card__image--loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>
      <div className="picture-card__label">
        <span className="picture-card__word">{item.word}</span>
        <span className="picture-card__speaker" aria-hidden="true">
          🔊
        </span>
      </div>
    </button>
  );
}
