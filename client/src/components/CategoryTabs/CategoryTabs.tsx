import type { Category } from '../../types';
import './CategoryTabs.css';

interface CategoryTabsProps {
  categories: Category[];
  selectedId: string;
  onSelect: (categoryId: string) => void;
}

export function CategoryTabs({ categories, selectedId, onSelect }: CategoryTabsProps) {
  return (
    <nav className="category-tabs">
      <div className="category-tabs__container">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tabs__tab ${selectedId === category.id ? 'category-tabs__tab--active' : ''}`}
            onClick={() => onSelect(category.id)}
            aria-pressed={selectedId === category.id}
          >
            <span className="category-tabs__icon">{category.icon}</span>
            <span className="category-tabs__name">{category.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
