import React from 'react';
import styles from './Filters.module.css';

interface FiltersProps {
  categories: string[];
  onSearch: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onSortChange: (val: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ categories, onSearch, onCategoryChange, onSortChange }) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Поиск товара</label>
        <input 
          type="text" 
          placeholder="Например: Laptop..." 
          className={styles.input} 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label className={styles.label}>Категория</label>
        <select className={styles.select} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">Все категории</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Сортировка</label>
        <select className={styles.select} onChange={(e) => onSortChange(e.target.value)}>
          <option value="none">По умолчанию</option>
          <option value="asc">Цена: по возрастанию</option>
          <option value="desc">Цена: по убыванию</option>
        </select>
      </div>
    </div>
  );
};