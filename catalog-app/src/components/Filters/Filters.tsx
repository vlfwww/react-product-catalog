import React from 'react';
import styles from './Filters.module.css';

interface FiltersProps {
  categories: string[];
  search: string;
  selectedCategory: string;
  sortBy: string;
  onSearch: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onSortChange: (val: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ 
  categories, search, selectedCategory, sortBy, 
  onSearch, onCategoryChange, onSortChange 
}) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.inputGroup}>
        <input 
          type="text" 
          placeholder="Поиск товара..." 
          className={styles.input} 
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <select 
          className={styles.select} 
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Все категории</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <select 
          className={styles.select} 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="none">Без сортировки</option>
          <option value="asc">Цена: по возрастанию</option>
          <option value="desc">Цена: по убыванию</option>
          <option value="name">По названию (А-Я)</option>
        </select>
      </div>
    </div>
  );
};